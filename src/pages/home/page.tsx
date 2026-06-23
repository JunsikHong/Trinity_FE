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
            >
                <LogSection />
            </Panel>
            <SeperatorSection />
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
                    <SeperatorSection2/>
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
            <SeperatorSection />
            <Panel
                defaultSize="20%"
                minSize="350px"
                maxSize="50%"
            >
                <AsideSection/>
            </Panel>
        </Group>
    );
};

export default HomePage;