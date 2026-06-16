import { useGLTF } from '@react-three/drei';
const B737Model = () => {
    const { scene } = useGLTF('/models/b737-800.glb');
    
    return (
        <>
            <primitive
                object={scene}
                scale={1}
                position={[0, 0, 0]}
            />
        </>

    );
}

export default B737Model;
