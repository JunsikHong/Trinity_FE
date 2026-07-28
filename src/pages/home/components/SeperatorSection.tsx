import { Separator } from "react-resizable-panels";

const SeperatorSection = () => {
    return (
        <Separator className="group relative flex w-6 cursor-col-resize items-center justify-center bg-separator hover:bg-separator-hover">
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-separator-line group-hover:bg-separator-active" />
            <div className="z-10 rounded border border-separator-border bg-separator-handle px-[2px] py-1 shadow-sm">
                <div className="flex flex-col gap-[2px]">
                    <div className="h-[2px] w-[2px] rounded-full bg-separator-dot" />
                    <div className="h-[2px] w-[2px] rounded-full bg-separator-dot" />
                    <div className="h-[2px] w-[2px] rounded-full bg-separator-dot" />
                </div>
            </div>
        </Separator>
    );
}

export default SeperatorSection;