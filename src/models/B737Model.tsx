import { useGLTF } from '@react-three/drei';
import { useState } from 'react';
import { Html } from '@react-three/drei';
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
                    <group position={[marker.x, marker.y, marker.z]}>
                        {/* 중심 마커 */}
                        <mesh>
                            <sphereGeometry args={[0.025, 24, 24]} />
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

                        {/* 연결선 */}
                        <line geometry={lineGeometry}>
                            <lineBasicMaterial color="#22d3ee" />
                        </line>

                        {/* 정보 패널 */}
                        <Html
                            position={[0, 0.15, 0]}
                            distanceFactor={8}
                            center
                        >
                            <div className="min-w-[140px] border border-cyan-500/40 bg-zinc-950/90 p-2 backdrop-blur">
                                <div className="text-[10px] font-semibold text-cyan-300">
                                    CRACK #{String(index + 1).padStart(3, '0')}
                                </div>

                                <div className="mt-1 text-[9px] text-amber-400">
                                    OPEN
                                </div>
                            </div>
                        </Html>
                    </group>
                )
            })}
        </>

    );
}

export default B737Model;
