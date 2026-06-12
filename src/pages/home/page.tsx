import ModelCanvas from '@/pages/home/components/ModelCanvas';
import ModelStructure from '@/pages/home/components/ModelStructure';
import LogSection from '@/pages/home/components/LogSection';
import DetailSection from '@/pages/home/components/DetailSection';
import useStateStore from '@/store/useStateStore';
import DetailListSection from './components/DetailListSection';

const HomePage = () => {
    const { isOpenDetail, detailList } = useStateStore();

    return (
        <div className="flex h-full bg-black">
            <div className="w-1/3 flex min-h-0 flex-shrink-0 border-r border-zinc-800">
                <LogSection />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex min-h-0 flex-1 relative">
                    <div className="relative min-w-0 flex-1">
                        <ModelCanvas />
                        <div className="absolute left-4 top-4 z-10 flex items-center gap-1">
                            <span className="text-sm font-semibold text-slate-100">
                                HL3800
                            </span>
                            <span className="text-sm text-slate-500">
                                (Boeing 737-800)
                            </span>
                        </div>
                        <div className="absolute bottom-1 left-3 z-10 text-[8px] text-slate-500">
                            CopyRight : "B737-800 Model"
                            (https://skfb.ly/oSG9Q) by hakai315 is licensed
                            under Creative Commons Attribution
                            (http://creativecommons.org/licenses/by/4.0/).
                        </div>
                    </div>
                    <ModelStructure />
                </div>
                {detailList.length > 1 && (
                    <DetailListSection />    
                )}
                {isOpenDetail && (
                    <div className="h-[350px] flex-shrink-0 border-t border-zinc-800 overflow-y-auto">
                        <DetailSection />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;