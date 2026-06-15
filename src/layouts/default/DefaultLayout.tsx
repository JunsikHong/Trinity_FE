import { Outlet } from "react-router-dom";
import DefaultHeader from '@/layouts/default/components/DefaultHeader';
const DefaultLayout = () => {

    return (
        <div className="flex h-screen flex-col bg-slate-100">
            <DefaultHeader />
            <main className="flex flex-1 overflow-hidden">
                <Outlet />
            </main>
        </div>
    )
}

export default DefaultLayout;