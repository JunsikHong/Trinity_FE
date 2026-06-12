import LogSearchSection from '@/pages/home/components/LogSearchSection';
import LogListSection from '@/pages/home/components/LogListSection';
import useStateStore from '@/store/useStateStore';

const LogSection = () => {
    const { openWrite } = useStateStore();

    return (
        <div className="flex flex-1 flex-col overflow-hidden relative">
            <div className="flex pb-2 pt-4 items-center justify-between border-zinc-800 px-4">
                <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    MAINTENANCE LOG
                </span>
            </div>
            <div className="flex flex-1 min-h-0 flex-col overflow-hidden">
                <LogSearchSection />
                <LogListSection />
            </div>
            <div className="absolute bottom-9 right-7">
                <button 
                    className="h-12 flex-shrink-0 px-5 border rounded-md border-zinc-700 bg-zinc-900 text-sm text-zinc-300 transition-colors hover:bg-zinc-800"
                    onClick={() => openWrite()}
                >
                    Add
                </button>
            </div>
        </div>
    );
}

export default LogSection;