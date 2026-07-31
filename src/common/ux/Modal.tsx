import { useEffect } from "react";
import { X } from "lucide-react";
import Portal from "./Portal";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    closeOnOverlay?: boolean;
    closeOnEsc?: boolean;
    width?: string;
}

const Modal = ({
    open,
    onClose,
    children,
    closeOnOverlay = true,
    closeOnEsc = true,
    width = "max-w-lg",
}: ModalProps) => {
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (closeOnEsc && e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, closeOnEsc, onClose]);

    if (!open) return null;

    return (
        <Portal>
            <div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
                onClick={() => {
                    if (closeOnOverlay) {
                        onClose();
                    }
                }}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`
                        relative w-full ${width}
                        max-h-[80vh]
                        overflow-hidden
                        rounded-xl border border-border bg-surface shadow-xl
                    `}
                >
                    <button
                        onClick={onClose}
                        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-lg text-primary transition hover:bg-icon"
                        aria-label="닫기"
                    >
                        <X size={20} />
                    </button>

                    <div className="max-h-[80vh] overflow-y-auto p-6 custom-scrollbar">
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default Modal;