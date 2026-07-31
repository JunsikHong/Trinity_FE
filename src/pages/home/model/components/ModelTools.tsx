import { MousePointer2, Hand, ZoomIn, ZoomOut, X } from 'lucide-react';

const ModelTools = () => {
    return(
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
    );
}

export default ModelTools;