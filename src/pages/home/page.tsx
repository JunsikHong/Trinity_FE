import { Group, Panel } from "react-resizable-panels";

import ModelCanvas from "@/pages/home/components/ModelCanvas";
import ModelStructure from "@/pages/home/components/ModelStructure";
import LogSection from "@/pages/home/list/page";

import SeperatorSection from "@/pages/home/components/SeperatorSection";
import SeperatorSection2 from "@/pages/home/components/SeperatorSection2";
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
            <Panel>
                <Group orientation="vertical" className="h-full">
                    <Panel
                        defaultSize="100%"
                        minSize="0%"
                        maxSize="100%"
                    >
                        <div className="relative h-full bg-slate-900">
                            <ModelCanvas />
                        </div>
                    </Panel>
                    <SeperatorSection2/>
                    <Panel
                        defaultSize="350px"
                        minSize="350px"
                        maxSize="100%"
                        collapsible
                        collapsedSize={0}
                    >
                        <div className="h-full bg-white">
                            <ModelStructure />
                        </div>
                    </Panel>
                </Group>
            </Panel>
            <SeperatorSection />
            <Panel
                defaultSize="20%"
                minSize="350px"
                maxSize="50%"
                collapsible
                collapsedSize={0}
            >
                <AsideSection/>
            </Panel>
        </Group>
    );
};

export default HomePage;