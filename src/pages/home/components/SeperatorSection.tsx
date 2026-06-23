import { Separator } from "react-resizable-panels";

const SeperatorSection = () => {
    return (
        <Separator className="group relative flex w-6 cursor-col-resize items-center justify-center bg-slate-50 hover:bg-slate-100">
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-slate-200 group-hover:bg-blue-500" />
            <div className="z-10 rounded border border-slate-200 bg-white px-[2px] py-1 shadow-sm">
                <div className="flex flex-col gap-[2px]">
                    <div className="h-[2px] w-[2px] rounded-full bg-slate-400" />
                    <div className="h-[2px] w-[2px] rounded-full bg-slate-400" />
                    <div className="h-[2px] w-[2px] rounded-full bg-slate-400" />
                </div>
            </div>
        </Separator>
    );
}

export default SeperatorSection;