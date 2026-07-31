import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import type { RepairFileResponse } from "@/common/type/repair";


interface ImageViewerModalProps {
    images: RepairFileResponse[];
    currentIndex: number;
    onClose: () => void;
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 5;
const DOUBLE_CLICK_ZOOM = 2.5;

const ImageViewer = ({
    images,
    currentIndex,
    onClose,
}: ImageViewerModalProps) => {
    const API_URL = import.meta.env.VITE_API_URL;

    const [index, setIndex] = useState(currentIndex);
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const isDragging = useRef(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const positionStart = useRef({ x: 0, y: 0 });
    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const prev = () => {
        setIndex((p) => (p === 0 ? images.length - 1 : p - 1));
    };

    const next = () => {
        setIndex((p) => (p === images.length - 1 ? 0 : p + 1));
    };

    // 이미지가 확대된 크기와 컨테이너 크기를 기준으로
    // 드래그 가능한 최대 범위를 계산해서 position을 그 안으로 clamp
    const clampPosition = (pos: { x: number; y: number }, currentZoom: number) => {
        const img = imgRef.current;
        const container = containerRef.current;
        if (!img || !container) return pos;

        // naturalWidth/Height 기준이 아니라 실제 렌더된(스케일 전) 크기 사용
        const rect = img.getBoundingClientRect();
        // 현재 scale이 이미 적용된 상태의 rect이므로, scale=1일 때의 크기를 역산
        const baseWidth = rect.width / currentZoom;
        const baseHeight = rect.height / currentZoom;

        const scaledWidth = baseWidth * currentZoom;
        const scaledHeight = baseHeight * currentZoom;

        const containerRect = container.getBoundingClientRect();

        // 이미지가 컨테이너보다 작으면 이동 불가(0으로 고정)
        const maxX = Math.max((scaledWidth - containerRect.width) / 2, 0);
        const maxY = Math.max((scaledHeight - containerRect.height) / 2, 0);

        return {
            x: Math.min(Math.max(pos.x, -maxX), maxX),
            y: Math.min(Math.max(pos.y, -maxY), maxY),
        };
    };

    const zoomIn = () => {
        setZoom((prevZoom) => {
            const newZoom = Math.min(prevZoom + 0.25, MAX_ZOOM);
            setPosition((pos) => clampPosition(pos, newZoom));
            return newZoom;
        });
    };

    const zoomOut = () => {
        setZoom((prevZoom) => {
            const newZoom = Math.max(prevZoom - 0.25, MIN_ZOOM);
            setPosition((pos) => clampPosition(pos, newZoom));
            return newZoom;
        });
    };

    // 휠로 확대/축소
    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setZoom((prevZoom) => {
            const delta = e.deltaY > 0 ? -0.15 : 0.15;
            const newZoom = Math.min(Math.max(prevZoom + delta, MIN_ZOOM), MAX_ZOOM);
            setPosition((pos) => clampPosition(pos, newZoom));
            return newZoom;
        });
    };

    // 더블클릭으로 확대/원복 토글
    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setZoom((prevZoom) => {
            const newZoom = prevZoom > 1 ? 1 : DOUBLE_CLICK_ZOOM;
            if (newZoom === 1) {
                setPosition({ x: 0, y: 0 });
            } else {
                setPosition((pos) => clampPosition(pos, newZoom));
            }
            return newZoom;
        });
    };

    // 드래그 시작
    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoom <= 1) return; // 확대 상태가 아니면 드래그 불필요
        e.preventDefault();
        e.stopPropagation();
        isDragging.current = true;
        dragStart.current = { x: e.clientX, y: e.clientY };
        positionStart.current = { ...position };
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;
            const dx = e.clientX - dragStart.current.x;
            const dy = e.clientY - dragStart.current.y;
            const newPos = {
                x: positionStart.current.x + dx,
                y: positionStart.current.y + dy,
            };
            setPosition(clampPosition(newPos, zoom));
        };

        const handleMouseUp = () => {
            isDragging.current = false;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zoom]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };

        window.addEventListener("keydown", handleKeyDown);

        return () =>
            window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
    }, [index]);

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] bg-black/90"
            onClick={onClose}
        >
            <div className="absolute right-6 top-6 z-20 flex items-center gap-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        zoomOut();
                    }}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-black/80 text-white hover:bg-black"
                >
                    <ZoomOut size={20} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        zoomIn();
                    }}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-black/80 text-white hover:bg-black"
                >
                    <ZoomIn size={20} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setZoom(1);
                        setPosition({ x: 0, y: 0 });
                    }}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-black/80 text-white hover:bg-black"
                >
                    <RotateCcw size={20} />
                </button>
                <button
                    onClick={onClose}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-black/80 text-white hover:bg-black"
                >
                    <X size={20} />
                </button>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    prev();
                }}
                className="absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/80 px-4 py-3 text-2xl text-white hover:bg-black"
            >
                ‹
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    next();
                }}
                className="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/80 px-4 py-3 text-2xl text-white hover:bg-black"
            >
                ›
            </button>

            <div
                ref={containerRef}
                className="flex h-full items-center justify-center overflow-hidden p-10"
                onClick={(e) => e.stopPropagation()}
                onWheel={handleWheel}
            >
                <img
                    ref={imgRef}
                    key={images[index].id}
                    src={API_URL + 'repair-file/' + images[index].id}
                    alt={images[index].originalName}
                    onMouseDown={handleMouseDown}
                    onDoubleClick={handleDoubleClick}
                    draggable={false}
                    className={`max-h-[85vh] max-w-[90vw] rounded-xl object-contain select-none ${
                        zoom > 1 ? "cursor-grab active:cursor-grabbing" : ""
                    }`}
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                        transition: isDragging.current ? "none" : "transform 0.2s",
                    }}
                />
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/80 px-4 py-2 text-sm text-white">
                {index + 1} / {images.length}
            </div>
        </div>,
        document.body
    );
};

export default ImageViewer;