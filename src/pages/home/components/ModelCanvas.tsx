import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import B737Model from '@/models//B737Model';
import { Suspense } from 'react';

const ModelCanvas = () => {
  return (
    <div className='w-full h-full'>
      <Canvas camera={{ position: [10, 5, 10] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <B737Model />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default ModelCanvas;