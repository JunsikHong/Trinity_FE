import { Separator } from "react-resizable-panels";

const SeperatorSection2 = () => {
    return (
        <Separator className="group relative flex h-4 cursor-row-resize items-center justify-center bg-slate-50 hover:bg-slate-100">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-slate-200 group-hover:bg-blue-500" />
            <div className="z-10 rounded border border-slate-200 bg-white py-[2px] px-1 shadow-sm">
                <div className="flex gap-[2px]">
                    <div className="h-[2px] w-[2px] rounded-full bg-slate-400" />
                    <div className="h-[2px] w-[2px] rounded-full bg-slate-400" />
                    <div className="h-[2px] w-[2px] rounded-full bg-slate-400" />
                </div>
            </div>
        </Separator>
    );
}

export default SeperatorSection2;