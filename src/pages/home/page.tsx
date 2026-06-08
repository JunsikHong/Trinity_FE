import ModelCanvas from '@/pages/home/components/ModelCanvas';
import ModelStructure from '@/pages/home/components/ModelStructure';
import LogSection from '@/pages/home/components/LogSection';
import DetailSection from '@/pages/home/components/DetailSection';

const HomePage = () => {
    return (
        <div className="flex h-full bg-black">
            {/* 좌측 로그 */}
            <div className="w-[450px] flex-shrink-0 border-r border-zinc-800">
                <LogSection />
            </div>

            {/* 우측 영역 */}
            <div className="flex min-w-0 flex-1 flex-col">
                {/* 상단 */}
                <div className="flex min-h-0 flex-1">
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

                    <div className="w-[320px] flex-shrink-0 border-l border-zinc-800 bg-zinc-950">
                        <ModelStructure />
                    </div>
                </div>

                {/* 하단 상세 */}
                <div className="h-[350px] flex-shrink-0 border-t border-zinc-800 bg-zinc-900">
                    <DetailSection />
                </div>
            </div>
        </div>
    );
};

export default HomePage;