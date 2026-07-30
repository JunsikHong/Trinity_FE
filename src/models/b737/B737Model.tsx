import { useModelStore } from '@/store/modelStore';
import { useGLTF } from '@react-three/drei';
import { convertZToStation, convertXYToStringer } from '@/models/b737/mapper';
import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import { EdgesGeometry, LineBasicMaterial, LineSegments } from "three";

const B737Model = () => {
    const { scene } = useGLTF('/models/b737-800.glb');

    const [marker, setMarker] = useState<[number, number, number] | null>(null);

    const { setStation, setStringer } = useModelStore();
    const handlePositionClick = (x: number, y: number, z: number) => {
        const station = convertZToStation(z);
        const stringer = convertXYToStringer(x, y);
        setStation(station);
        setStringer(stringer);
    }

    useEffect(() => {
        scene.traverse((child: any) => {
            if (!child.isMesh) return;
            child.material = child.material.clone();
            child.material.transparent = true;
            child.material.opacity = 0.75;
            const edges = new EdgesGeometry(child.geometry, 5);
            const line = new LineSegments(
                edges,
                new LineBasicMaterial({
                    color: 0x333333,
                })
            );
            child.add(line);
        });
    }, [scene]);

    return (
        <>
            <primitive
                object={scene}
                scale={1}
                position={[0, 0, 0]}
                onClick={(e: any) => {
                    e.stopPropagation();
                    const point: [number, number, number] = [
                        Number(e.point.x.toFixed(2)),
                        Number(e.point.y.toFixed(2)),
                        Number(e.point.z.toFixed(2)),
                    ];
                    setMarker(point);
                    handlePositionClick(...point);
                }}
            />
            {marker && (
                <group position={marker}>
                    <Html center >
                        <div className="h-6 w-6 rounded-full bg-red-500 border border-white shadow-lg" />
                        <div className='w-40 h-20 absolute -top-20 p-3 text-primary text-sm left-10 bg-surface rounded-md'>
                            내용
                        </div>
                    </Html>
                </group>
            )}
        </>

    );
}

export default B737Model;
