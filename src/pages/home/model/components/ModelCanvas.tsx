import { Canvas } from '@react-three/fiber';
import { CameraControls, Grid } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import B737Model from '@/models/b737/B737Model';
import { useStatusStore } from '@/store/statusStore';

type ModelCanvasProps = {
  selectedAirplaneId: number | null;
};

const ModelCanvas = ({ selectedAirplaneId }: ModelCanvasProps) => {

  const cameraControlsRef = useRef<CameraControls>(null);
  const lastZoomRef = useRef<number | null>(null);

  const { zoomAction, clearZoomAction, setZoom } = useStatusStore();

  const MIN_DISTANCE = 10;
  const MAX_DISTANCE = 50;

  useEffect(() => {
    const controls = cameraControlsRef.current;
    if (!controls || !zoomAction) return;

    if (zoomAction === 'in') {
      controls.dolly(5, true);
    }

    if (zoomAction === 'out') {
      controls.dolly(-5, true);
    }

    clearZoomAction();
  }, [zoomAction, clearZoomAction]);

  return (
    <div
      className="w-full h-full"
      
    >
      <Canvas
        camera={{
          position: [35, 17.5, 35],
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
          smoothTime={0.5}
          minDistance={MIN_DISTANCE}
          maxDistance={MAX_DISTANCE}
          dollySpeed={0.7}
          onChange={() => {
            const controls = cameraControlsRef.current;

            if (!controls) return;

            const distance = controls.distance;

            const zoom = Math.round(
              Math.max(
                0,
                Math.min(
                  100,
                  ((MAX_DISTANCE - distance) /
                    (MAX_DISTANCE - MIN_DISTANCE)) * 100
                )
              )
            );

            if (lastZoomRef.current === zoom) return;

            lastZoomRef.current = zoom;

            setZoom(zoom);
          }}

        />

      </Canvas>
    </div>
  );
};

export default ModelCanvas;