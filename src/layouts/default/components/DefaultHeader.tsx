import { ChevronDown } from "lucide-react";

const DefaultHeader = () => {
    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                        A
                    </div>

                    <span className="text-lg font-semibold">
                        A-ONE
                    </span>
                </div>
                <button className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <span>A/C : HL-1234</span>
                    <ChevronDown size={16} />
                </button>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                    <p className="font-semibold text-sm">트리니티 정비팀</p>
                    <p className="text-xs text-slate-500">팀장/홍민식</p>

                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold">
                    H
                </div>
            </div>
        </header>
    );
}

export default DefaultHeader;