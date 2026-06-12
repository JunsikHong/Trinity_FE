import { useGLTF } from '@react-three/drei';
import { useState } from 'react';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';
const B737Model = () => {
    const { scene } = useGLTF('/models/b737-800.glb');
    const [markers, setMarkers] = useState([]);

    const handleClick = (e) => {
        e.stopPropagation();
        setMarkers((prev) => [...prev, {
            x: e.point.x,
            y: e.point.y,
            z: e.point.z
        }]);
    }

    return (
        <>
            <primitive
                object={scene}
                scale={1}
                position={[0, 0, 0]}
                onClick={handleClick}
            />
            {markers.map((marker, index) => {
                const linePoints = [
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(0, 0.15, 0)
                ];
                const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
                return (
                    <group 
                        key={index}
                        position={[marker.x, marker.y, marker.z]}>
                        {/* 중심 마커 */}
                        <mesh>
                            <sphereGeometry args={[0.08, 24, 24]} />
                            <meshStandardMaterial
                                color="#22d3ee"
                                emissive="#22d3ee"
                                emissiveIntensity={3}
                            />
                        </mesh>

                        {/* 바닥 링 */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]}>
                            <ringGeometry args={[0.04, 0.06, 32]} />
                            <meshBasicMaterial
                                color="#22d3ee"
                                transparent
                                opacity={0.8}
                            />
                        </mesh>

                        <Line
                            points={[
                                [0, 0, 0],
                                [0, 0.3, 0],
                            ]}
                            color="#22d3ee"
                            lineWidth={2}
                        />

                        {/* 정보 패널 */}
                        <Html
                            position={[0, 0.15, 0]}
                            distanceFactor={8}
                            center
                        >
                            <div className="min-w-[70px] border border-cyan-500/40 bg-zinc-950/90 p-2 backdrop-blur">
                                <div className="text-[10px] font-semibold text-cyan-300">
                                    #{String(index + 1)}
                                </div>
                                <span className="text-[10px] rounded bg-zinc-800 px-2 text-zinc-400 py-0.5">
                                    CHA 51
                                </span>
                            </div>
                        </Html>
                    </group>
                )
            })}
        </>

    );
}

export default B737Model;
