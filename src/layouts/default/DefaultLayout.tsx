import { Outlet } from "react-router-dom";
import DefaultHeader from '@/layouts/default/components/DefaultHeader';
const DefaultLayout = () => {

    return (
        <div className="h-screen overflow-hidden bg-zinc-950">
            <DefaultHeader />
            <div className="flex h-[calc(100vh-56px)]">
                <div className="flex flex-1 flex-col overflow-hidden">
                    <div className="flex-1 overflow-hidden">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout;