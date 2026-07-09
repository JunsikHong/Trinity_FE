import { Group, Panel } from "react-resizable-panels";

import ModelCanvas from "@/pages/home/components/ModelCanvas";
import LogSection from "@/pages/home/list/page";

import SeperatorSection from "@/pages/home/components/SeperatorSection";
import AsideSection from "@/pages/home/components/AsideSection";

const HomePage = () => {

    return (
        <Group orientation="horizontal" className="h-full w-full">
            <Panel
                defaultSize="20%"
                minSize="350px"
                maxSize="50%"
                collapsible
                collapsedSize={0}
            >
                <LogSection />
            </Panel>
            <SeperatorSection />
            <Panel
                defaultSize="100%"
                minSize="0%"
                maxSize="100%"
            >
                <div className="relative h-full bg-slate-900">
                    <ModelCanvas />
                </div>
            </Panel>
            <SeperatorSection />
            <Panel
                defaultSize="20%"
                minSize="350px"
                maxSize="50%"
                collapsible
                collapsedSize={0}
            >
                <AsideSection />
            </Panel>
        </Group>
    );
};

export default HomePage;