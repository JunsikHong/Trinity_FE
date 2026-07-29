import { createPortal } from "react-dom";
import type { ReactNode } from "react";

interface PortalProps {
    children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
    if (typeof window === "undefined") return null;

    return createPortal(children, document.body);
};

export default Portal;