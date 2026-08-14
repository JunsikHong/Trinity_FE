import { useGLTF } from '@react-three/drei';
import { convertZToStation, convertXYToStringer } from '@/models/b737/mapper';
import { Html, Outlines } from "@react-three/drei";
import { useEffect, useState } from "react";
import { EdgesGeometry, LineBasicMaterial, LineSegments } from "three";
import * as THREE from "three";
import type { CameraControls } from "@react-three/drei";
import { convertStationToZ, convertStringerToXY } from '@/models/b737/mapper';

// store
import { useRepairStore } from "@/store/repairStore";
import { useStatusStore } from "@/store/statusStore";

// hooks
import { useRepairDetail } from "@/hooks/repair/useRepair";

interface Props {
    cameraControlsRef:
    React.RefObject<CameraControls | null>;
}

const B737Model = ({ cameraControlsRef }: Props) => {
    const { scene } = useGLTF('/models/b737-800.glb');

    const { status, setStatus } = useStatusStore();
    const { selectedRepairId } = useRepairStore();
    const { data: repairDetail } = useRepairDetail(selectedRepairId);

    const [markers, setMarkers] = useState<[number, number, number][]>([]);

    const highlightMesh = (mesh: any) => {
        scene.traverse((child: any) => {
            if (!child.isMesh) return;
            if (child.userData.originalMaterial) {
                child.material = child.userData.originalMaterial.clone();
            }
        });
        if (mesh) {
            mesh.material = mesh.material.clone();
            mesh.material.emissive = new THREE.Color("red");
            mesh.material.emissiveIntensity = 0.8;
        }
    };

    // 특정 material 이름을 가진 mesh들만 모으기
    const getMeshesByMaterialNames = (
        scene: THREE.Object3D,
        materialNames: string[]
    ): THREE.Mesh[] => {
        const meshes: THREE.Mesh[] = [];
        scene.traverse((child: any) => {
            if (!child.isMesh) return;
            const materials = Array.isArray(child.material)
                ? child.material
                : [child.material];
            const matched = materials.some((m: THREE.Material) =>
                materialNames.includes(m.name)
            );
            if (matched) meshes.push(child);
        });
        return meshes;
    };

    // meshes의 bounding box 중심을 기준축(대략 x, y 중심)으로 사용
    const getAxisCenter = (meshes: THREE.Mesh[]): THREE.Vector2 => {
        const box = new THREE.Box3();
        meshes.forEach((mesh) => box.expandByObject(mesh));
        const center = box.getCenter(new THREE.Vector3());
        return new THREE.Vector2(center.x, center.y);
    };

    // 계산된 point를 실제 mesh 표면으로 스냅
    const snapPointToSurface = (
        point: [number, number, number],
        meshes: THREE.Mesh[],
        axisCenter: THREE.Vector2
    ): [number, number, number] => {
        const [px, py, pz] = point;

        const dir2D = new THREE.Vector2(px - axisCenter.x, py - axisCenter.y);

        // point가 중심축과 거의 같은 위치면(방향 계산 불가) 원래 좌표 그대로 반환
        if (dir2D.lengthSq() < 1e-6) return point;

        dir2D.normalize();

        const FAR_DISTANCE = 20; // 모델 크기보다 충분히 큰 값으로 조정
        const origin = new THREE.Vector3(
            axisCenter.x + dir2D.x * FAR_DISTANCE,
            axisCenter.y + dir2D.y * FAR_DISTANCE,
            pz
        );
        const direction = new THREE.Vector3(-dir2D.x, -dir2D.y, 0).normalize();

        const raycaster = new THREE.Raycaster();
        raycaster.set(origin, direction);

        const intersects = raycaster.intersectObjects(meshes, false);

        if (intersects.length > 0) {
            const hit = intersects[0].point;
            return [
                Number(hit.x.toFixed(2)),
                Number(hit.y.toFixed(2)),
                Number(hit.z.toFixed(2)),
            ];
        }

        // 못 찾으면 원래 계산값 fallback
        return point;
    };

    const handleDisplay = () => {
        let meshNames: string[] = [];
        const points: [number, number, number][] = [];

        const locations = repairDetail?.locationItems ?? [];
        const fuselageLocations = locations.filter(
            (location) => location.chapterName === "fuselage"
        );

        // fuselage mesh 미리 구해두고 축 중심 계산 (재사용)
        const fuselageMeshes = getMeshesByMaterialNames(scene, ["Material.005"]);
        const axisCenter = getAxisCenter(fuselageMeshes);

        if (fuselageLocations.length > 0) {
            const stationStart = fuselageLocations.find(
                (location) =>
                    location.locationCode === "STA" &&
                    location.locationName === "station_start"
            );
            const stationEnd = fuselageLocations.find(
                (location) =>
                    location.locationCode === "STA" &&
                    location.locationName === "station_end"
            );
            const stringerStart = fuselageLocations.find(
                (location) =>
                    location.locationCode === "STR" &&
                    location.locationName === "stringer_start"
            );
            const stringerEnd = fuselageLocations.find(
                (location) =>
                    location.locationCode === "STR" &&
                    location.locationName === "stringer_end"
            );

            if (stationStart && stringerStart) {
                const z = convertStationToZ(Number(stationStart.value));
                const xy = convertStringerToXY(stringerStart.value);

                if (z !== null && xy) {
                    const rawPoint: [number, number, number] = [xy.x, xy.y, z];
                    const snapped = fuselageMeshes.length
                        ? snapPointToSurface(rawPoint, fuselageMeshes, axisCenter)
                        : rawPoint;
                    points.push(snapped);
                }
            }

            if (stationEnd && stringerEnd) {
                const z = convertStationToZ(Number(stationEnd.value));
                const xy = convertStringerToXY(stringerEnd.value);

                if (z !== null && xy) {
                    const rawPoint: [number, number, number] = [xy.x, xy.y, z];
                    const snapped = fuselageMeshes.length
                        ? snapPointToSurface(rawPoint, fuselageMeshes, axisCenter)
                        : rawPoint;
                    points.push(snapped);
                }
            }
        }
        repairDetail?.locationItems.forEach((location) => {
            switch (location.chapterName) {
                case "door":
                    meshNames = ["Material.027"];
                    break;

                case "fuselage":
                    meshNames = ["Material.005"];
                    break;

                case "wing":
                    meshNames = ["Material.030"];
                    break;

                case "stabilizer":
                    meshNames = ["Cylinder.013__0"];
                    break;

                case "naccel":
                    meshNames = [
                        "Material.010",
                        "Material.011",
                        "Material.012",
                        "Material.014",
                        "Material.023",
                    ];
                    break;
            }

        });

        meshNames.forEach((materialName) => {
            scene.traverse((child: any) => {
                if (!child.isMesh) return;
                const materials = Array.isArray(child.material)
                    ? child.material
                    : [child.material];
                const matched = materials.some(
                    (material: THREE.Material) =>
                        material.name === materialName
                );
                if (matched) {
                    highlightMesh(child);
                }
            });
        });

        setMarkers(points);

    }

    const handleClick = (e) => {
        e.stopPropagation();
        const mesh = e.object;
        if (!mesh.isMesh) return;
        highlightMesh(mesh);
        if (!cameraControlsRef.current)
            return;
        const point: [
            number,
            number,
            number
        ] = [
                Number(e.point.x.toFixed(2)),
                Number(e.point.y.toFixed(2)),
                Number(e.point.z.toFixed(2)),
            ];
        focusObject(e.object);
        setMarkers((prev) => [...prev, point]);

        let chapterName = "";
        switch (mesh.material.name) {
            case "Material.027":
                chapterName = "door";
                break;

            case "Material.005":
                chapterName = "fuselage";
                break;

            case "Material.030":
                chapterName = "wing";
                break;

            case "Cylinder.013__0":
                chapterName = "stabilizer";
                break;

            case "Material.010":
                chapterName = "naccel";
                break;
            
            case "Material.011":
                chapterName = "naccel";
                break;

            case "Material.012":
                chapterName = "naccel";
                break;

            case "Material.013":
                chapterName = "naccel";
                break;

            case "Material.014":
                chapterName = "naccel";
                break;
            
            case "Material.015":
                chapterName = "naccel";
                break;
        }

        if ((status == '' || status == 'view') && !repairDetail) {
            setStatus('edit');
        } else if (status == 'edit' && repairDetail) {

        }
        // status - view 또는 없을 때 & !repairDetail => status - edit & chapter, location value 값 입력
        // status - edit & repairDetail => confirm => chapter, location value 값 수정
    }

    useEffect(() => {
        if (!repairDetail) return;
        handleDisplay();
    }, [repairDetail]);



    // mesh


    // 카메라
    const focusObject = (
        object: THREE.Object3D
    ) => {

        if (!cameraControlsRef.current)
            return;

        const box =
            new THREE.Box3()
                .setFromObject(object);

        const center =
            box.getCenter(
                new THREE.Vector3()
            );

        const size =
            box.getSize(
                new THREE.Vector3()
            );

        const distance =
            Math.max(
                size.x,
                size.y,
                size.z
            ) * 2;

        cameraControlsRef.current.setLookAt(
            center.x + distance,
            center.y + distance,
            center.z + distance,
            center.x,
            center.y,
            center.z,
            true
        );
    };

    // 라인
    useEffect(() => {
        scene.traverse((child: any) => {
            if (!child.isMesh) return;
            child.material = child.material.clone();
            child.material.transparent = true;
            child.material.opacity = 0.75;
            child.userData.originalMaterial = child.material;
            const edges = new EdgesGeometry(child.geometry, 5);
            const line = new LineSegments(
                edges,
                new LineBasicMaterial({
                    color: 0x333333,
                })
            );
            line.raycast = () => { };
            child.add(line);
        });
    }, [scene]);

    return (
        <>
            <group>
                <primitive
                    object={scene}
                    scale={1}
                    position={[0, 0, 0]}
                    onClick={(e: any) => handleClick(e)}
                />
                {markers.map((point, index) => (
                    <group key={index} position={point}>
                        <mesh>
                            <sphereGeometry args={[0.1, 16, 16]} />
                            <meshBasicMaterial color="red" />
                        </mesh>
                    </group>
                ))}
            </group>
        </>

    );
}

export default B737Model;
