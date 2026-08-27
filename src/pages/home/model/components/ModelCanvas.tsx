import { Canvas } from '@react-three/fiber';
import { OrbitControls, CameraControls, Grid } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import B737Model from '@/models/b737/B737Model';
import { useStatusStore } from '@/store/statusStore';

type ModelCanvasProps = {
  selectedAirplaneId: number | null;
};

const ModelCanvas = ({ selectedAirplaneId }: ModelCanvasProps) => {

  const initialDistance = 2;
  const cameraControlsRef = useRef<CameraControls>(null);

  const { zoomAction, clearZoomAction, setZoom } = useStatusStore();

  useEffect(() => {
    if (zoomAction === 'in') {
      cameraControlsRef.current?.dolly(2, true);
      clearZoomAction();
    } else if (zoomAction === 'out') {
      cameraControlsRef.current?.dolly(-2, true);
      clearZoomAction();
    }

  }, [zoomAction]);

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
      <CameraControls
        ref={cameraControlsRef}
        smoothTime={0.2}
        minDistance={2}
        maxDistance={30}
        onChange={() => {
          const controls = cameraControlsRef.current;
          if (!controls) return;
          const distance = controls.distance;
          setZoom(Math.round((initialDistance / distance) * 100));
        }}
      />
      <OrbitControls
        enablePan={false}
      />
    </Canvas>
  );
};

export default ModelCanvas;