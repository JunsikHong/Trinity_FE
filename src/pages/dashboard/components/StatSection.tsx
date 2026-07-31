import { FileText, Calendar, Image } from 'lucide-react';
import SearchSelect from '@/common/ui/SearchSelect';

const StatSection = () => {
    return (
        <div className="grid grid-rows-5 w-72 gap-3">
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
                <div>
                    <p className="text-sm font-medium text-secondary">
                        전체 수리이력
                    </p>
                </div>
                <div className="mt-8">
                    <div className="flex items-end gap-1">
                        <span className="text-4xl font-bold tracking-tight text-primary">
                            1,246
                        </span>
                        <span className="mb-1 text-secondary">
                            건
                        </span>
                    </div>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-xs font-medium text-green-500">
                        ▲ 12% 지난달 대비
                    </span>

                    <span className="text-xs text-secondary">
                        전체 기간
                    </span>
                </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-secondary">
                        기종별 수리이력
                    </span>

                    <SearchSelect
                        options={[]}
                    />
                </div>
                <div className="mt-8">
                    <div className="flex items-end gap-1">
                        <span className="text-4xl font-bold tracking-tight text-primary">
                            1,246
                        </span>
                        <span className="mb-1 text-secondary">
                            건
                        </span>
                    </div>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-xs font-medium text-green-500">
                        ▲ 12% 지난달 대비
                    </span>

                    <span className="text-xs text-secondary">
                        전체 기간
                    </span>
                </div>
            </div>

        </div>
        // 전체수리이력건수, 기종별로 수리이력 건수, 비행기별로 수리이력 건수, 각 챕터별 건수, 부위별 건수
    );
}

export default StatSection;