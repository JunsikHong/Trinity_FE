import { Outlet } from "react-router-dom";

const SimpleLayout = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-page px-4">
            <div className="w-full max-w-3xl">
                <Outlet />
            </div>
        </main>
    );
};

export default SimpleLayout;