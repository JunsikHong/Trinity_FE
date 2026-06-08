import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "@/layouts/default/DefaultLayout";
import HomePage from "@/pages/home/page";

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children : [
            {
                path: '/',
                element: <HomePage />
            }
        ]
    },
])