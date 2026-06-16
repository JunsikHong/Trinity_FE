import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { Suspense } from 'react';
import B737Model from '@/models/B737Model';
import {
  MousePointer2,
  Hand,
  ZoomIn,
  ZoomOut,
  X
} from 'lucide-react';

const ModelCanvas = () => {
  return (
    <div className="flex h-full flex-col bg-black">
      <div className="relative flex-1">
        <div className="absolute top-3 left-3 flex flex-col bg-slate-800 z-10 px-1 py-1 rounded-md">
          <button
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white"
            title="선택"
          >
            <MousePointer2 size={18} />
          </button>
          <button
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white"
            title="이동"
          >
            <Hand size={18} />
          </button>
          <button
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white"
            title="확대"
          >
            <ZoomIn size={18} />
          </button>
          <button
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white"
            title="축소"
          >
            <ZoomOut size={18} />
          </button>
        </div>
        <div className='absolute top-3 left-16 flex flex-col bg-slate-800 z-10 px-2 py-2 rounded-md'>
          <div className='flex items-center gap-3 justify-between mb-3 text-slate-500'>
            <p className='text-xs font-bold'>
              위치정보
              <span className='text-xs'>(선택기준)</span>
            </p>
            <X size={14}/>
          </div>
          <div className='flex flex-col gap-1 text-xs text-slate-300'>
            <div className='flex justify-between'>
              <p>Chapter</p>
              <p>45.0</p>
            </div>
            <div className='flex justify-between'>
              <p>STA</p>
              <p>560.0</p>
            </div>
            <div className='flex justify-between'>
              <p>Stringer</p>
              <p>s-156</p>
            </div>
            <div className='flex justify-between'>
              <p>Water line</p>
              <p>180.0</p>
            </div>
            <div className='flex justify-between'>
              <p>Wing Line</p>
              <p>30.0</p>
            </div>
          </div>
        </div>
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

          <GizmoHelper
            alignment="bottom-right"
          >
            <GizmoViewport />
          </GizmoHelper>

          <ambientLight intensity={0.9} />
          <directionalLight
            position={[10, 10, 10]}
            intensity={2}
          />
          <Suspense fallback={null}>
            <B737Model />
          </Suspense>
          <OrbitControls
            enablePan={false}
          />
        </Canvas>
      </div>
      <div className="border-t border-slate-700 bg-slate-950 px-4 py-2">
        <p className="text-[10px] leading-relaxed text-slate-500">
          B737-800 Model (https://skfb.ly/oSG9Q) by
          hakai315 is licensed under Creative
          Commons Attribution 4.0.
        </p>
      </div>
    </div>
  );
};

export default ModelCanvas;