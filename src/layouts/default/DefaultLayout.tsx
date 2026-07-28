import { Outlet } from "react-router-dom";
import { useState } from "react";
import DefaultHeader from "@/layouts/default/components/DefaultHeader";
import DefaultMenu from "@/layouts/default/components/DefaultMenu";

const DefaultLayout = () => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <div className="flex h-screen flex-col bg-background">
            <DefaultHeader
                onMenuClick={() => setCollapsed(!collapsed)}
            />

            <div className="flex flex-1 overflow-hidden">
                <DefaultMenu
                    collapsed={collapsed}
                />

                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DefaultLayout;