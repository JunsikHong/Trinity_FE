import { MousePointer2, Hand, ZoomIn, ZoomOut, X } from 'lucide-react';
import { useStatusStore } from '@/store/statusStore';

const ModelTools = () => {

  const { toolStatus, setToolStatus, setZoomAction } = useStatusStore();

  return (
    <div className="absolute top-3 left-3 flex flex-col bg-slate-800 z-10 px-1 py-1 rounded-md">
      <button
        className={`rounded-lg p-2 transition
                    ${toolStatus === "select" ? 'bg-slate-900 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}
                  `}
        title="선택"
        onClick={() => setToolStatus("select")}
      >
        <MousePointer2 size={22} />
      </button>
      <button
        className={`rounded-lg p-2 transition
                    ${toolStatus === "pan" ? 'bg-slate-900 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}
                  `}
        title="이동"
        onClick={() => setToolStatus("pan")}
      >
        <Hand size={22} />
      </button>
      <button
        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white"
        title="확대"
        onClick={() => setZoomAction("in")}
      >
        <ZoomIn size={22} />
      </button>
      <button
        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white"
        title="축소"
        onClick={() => setZoomAction("out")}
      >
        <ZoomOut size={22} />
      </button>
    </div>
  );
}

export default ModelTools;