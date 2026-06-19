import { Outlet } from "react-router-dom";

const SimpleLayout = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <Outlet />
            </div>
        </main>
    );
};

export default SimpleLayout;