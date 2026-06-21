import { Group, Panel, Separator } from "react-resizable-panels";

import ModelCanvas from "@/pages/home/components/ModelCanvas";
import ModelStructure from "@/pages/home/components/ModelStructure";
import LogSection from "@/pages/home/list/page";
import ViewPage from "@/pages/home/view/page";
import WritePage from "@/pages/home/write/page";
import useStateStore from "@/store/useStateStore";

const HomePage = () => {
    const { isOpenDetail, isOpenWrite } = useStateStore();

    return (
        <Group orientation="horizontal" className="h-full w-full">
            <Panel
                defaultSize="20%"
                minSize="350px"
                maxSize="50%"
            >
                <LogSection />
            </Panel>
            <Separator className="group relative flex w-4 cursor-col-resize items-center justify-center bg-slate-50 hover:bg-slate-100">
                <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-slate-200 group-hover:bg-blue-500" />
                <div className="z-10 rounded border border-slate-200 bg-white px-[2px] py-1 shadow-sm">
                    <div className="flex flex-col gap-[2px]">
                        <div className="h-[2px] w-[2px] rounded-full bg-slate-400" />
                        <div className="h-[2px] w-[2px] rounded-full bg-slate-400" />
                        <div className="h-[2px] w-[2px] rounded-full bg-slate-400" />
                    </div>
                </div>
            </Separator>
            <Panel>
                <Group orientation="vertical" className="h-full">
                    <Panel
                        defaultSize="60%"
                        minSize="0%"
                        maxSize="100%"
                    >
                        <div className="relative h-full bg-slate-900">
                            <ModelCanvas />
                        </div>
                    </Panel>
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
                    <Panel
                        defaultSize="40%"
                        minSize="0%"
                        maxSize="100%"
                    >
                        <div className="h-full bg-white">
                            <ModelStructure />
                        </div>
                    </Panel>
                </Group>
            </Panel>
            <Separator className="group relative flex w-4 cursor-col-resize items-center justify-center bg-slate-50 hover:bg-slate-100">
                <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-slate-200 group-hover:bg-blue-500" />
                <div className="z-10 rounded border border-slate-200 bg-white px-[2px] py-1 shadow-sm">
                    <div className="flex flex-col gap-[2px]">
                        <div className="h-[2px] w-[2px] rounded-full bg-slate-400" />
                        <div className="h-[2px] w-[2px] rounded-full bg-slate-400" />
                        <div className="h-[2px] w-[2px] rounded-full bg-slate-400" />
                    </div>
                </div>
            </Separator>
            {isOpenDetail && (
                <>
                    <Panel
                        defaultSize="20%"
                        minSize="350px"
                        maxSize="50%"
                    >
                        <ViewPage />
                    </Panel>
                </>
            )}
            {isOpenWrite && (
                <>
                    <Panel
                        defaultSize="20%"
                        minSize="350px"
                        maxSize="50%"
                    >
                        <WritePage />
                    </Panel>
                </>
            )}
        </Group>
    );
};

export default HomePage;