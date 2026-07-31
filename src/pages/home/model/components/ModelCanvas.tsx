import { Canvas } from '@react-three/fiber';
import { OrbitControls, CameraControls, Grid } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import B737Model from '@/models/b737/B737Model';

type ModelCanvasProps = {
  selectedAirplaneId: number | null;
};

const ModelCanvas = ({ selectedAirplaneId }: ModelCanvasProps) => {

  const cameraControlsRef = useRef<CameraControls>(null);
  return (
    <Canvas
      camera={{
        position: [10, 5, 10],
        fov: 45,
      }}
    >
      <Grid
        infiniteGrid
        cellSize={1}
        sectionSize={5}
      />
      <ambientLight intensity={0.9} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={2}
      />
      <Suspense fallback={null}>
        {selectedAirplaneId && (
          <B737Model
            cameraControlsRef={cameraControlsRef}
          />
        )}
      </Suspense>
      <CameraControls ref={cameraControlsRef} />
      <OrbitControls
        enablePan={false}
      />
    </Canvas>
  );
};

export default ModelCanvas;