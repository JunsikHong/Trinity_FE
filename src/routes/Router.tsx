import { createBrowserRouter } from "react-router-dom";
import { PrivateRouter } from "@/routes/components/PrivateRouter";
import { PublicRouter } from "@/routes/components/PublicRouter";

import DefaultLayout from "@/layouts/default/DefaultLayout";
import SimpleLayout from "@/layouts/simple/SimpleLayout";

import HomePage from "@/pages/home/page";
import DashboardPage from '@/pages/dashboard/page';
import LoginPage from "@/pages/member/login/page";

export const Router = createBrowserRouter([
    {
        element: <PublicRouter />,
        children: [
            {
                element: <SimpleLayout />,
                children: [
                    {
                        path: '/login',
                        element: <LoginPage />,
                    },
                ],
            },
        ],
    },
    {
        element: <PrivateRouter />,
        children: [
            {
                element: <DefaultLayout />,
                children: [
                    {
                        path: '/',
                        element: <HomePage />,
                    },
                    {
                        path: '/dashboard',
                        element: <DashboardPage />,
                    },
                ],
            },
        ],
    }
]);