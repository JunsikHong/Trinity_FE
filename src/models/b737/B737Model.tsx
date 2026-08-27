import { useGLTF } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import { useEffect, useState } from "react";
import { EdgesGeometry, LineBasicMaterial, LineSegments } from "three";
import * as THREE from "three";
import type { CameraControls } from "@react-three/drei";
import { getAirplaneLocation, setAirplaneLocation } from '@/models/b737/interactions';

// store
import { useRepairStore } from "@/store/repairStore";
import { useLocationStore } from "@/store/locationStore";
import { useStatusStore } from "@/store/statusStore";

// hooks
import { useRepairDetail } from "@/hooks/repair/useRepair";

interface Props {
    cameraControlsRef:
    React.RefObject<CameraControls | null>;
}

const B737Model = ({ cameraControlsRef }: Props) => {

    // glb 파일 Read
    const { scene } = useGLTF('/models/b737-800.glb');

    // storage
    const { status, setStatus } = useStatusStore();
    const { selectedRepairId, clearSelectedRepair } = useRepairStore();
    const { data: repairDetail } = useRepairDetail(selectedRepairId);
    const { chapter, setChapter, location, setLocation } = useLocationStore();

    // state
    const [markers, setMarkers] = useState<[number, number, number][]>([]);

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (!cameraControlsRef.current) return;
        const mesh = e.object;
        
        if (status === 'view' || status === 'edit') {
            clearSelectedRepair();
            setMarkers([]);
        }

        setStatus('edit');
        setAirplaneLocation(e, chapter, setChapter, setLocation);

        const point: [
            number,
            number,
            number
        ] = [
                Number(e.point.x.toFixed(2)),
                Number(e.point.y.toFixed(2)),
                Number(e.point.z.toFixed(2)),
            ];

        highlightMesh(mesh);
        focusObject(mesh);
        setMarkers((prev) => [...prev, point]);
    }

    useEffect(() => {
        if (!repairDetail || !status) return;
        const airplaneLocation = getAirplaneLocation(scene, repairDetail);
        airplaneLocation.mesh.forEach((materialName) => {
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

        setMarkers(airplaneLocation.points);

    }, [repairDetail]);

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
