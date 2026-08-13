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
            console.log(mesh.material);
            mesh.material = mesh.material.clone();
            mesh.material.emissive = new THREE.Color("red");
            mesh.material.emissiveIntensity = 0.8;
        }
    };

    const handleDisplay = () => {
        let meshNames: string[] = [];
        const points: [number, number, number][] = [];

        const locations = repairDetail?.locationItems ?? [];
        const fuselageLocations = locations.filter(
            (location) => location.chapterName === "fuselage"
        );

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

            // start
            if (stationStart && stringerStart) {
                const z = convertStationToZ(
                    Number(stationStart.value)
                );

                const xy = convertStringerToXY(
                    stringerStart.value
                );

                if (z !== null && xy) {
                    points.push([
                        xy.x,
                        xy.y,
                        z,
                    ]);
                }
            }

            // end
            if (stationEnd && stringerEnd) {
                const z = convertStationToZ(
                    Number(stationEnd.value)
                );

                const xy = convertStringerToXY(
                    stringerEnd.value
                );

                if (z !== null && xy) {
                    points.push([
                        xy.x,
                        xy.y,
                        z,
                    ]);
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
            <primitive
                object={scene}
                scale={1}
                position={[0, 0, 0]}
                onClick={(e: any) => handleClick(e)}
            />
            {markers.map((point, index) => (
                <group key={index} position={point}>
                    <Html center>
                        <div className="h-4 w-4 rounded-full bg-red-500 border border-white shadow-lg" />
                    </Html>
                </group>
            ))}
        </>

    );
}

export default B737Model;
