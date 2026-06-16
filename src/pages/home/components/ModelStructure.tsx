import { useState, useRef, useCallback } from 'react';
import { Rnd } from 'react-rnd';
import SearchSelect from '@/common/ui/SearchSelect';
import SystemToggleSwitch from '@/common/ui/SystemToggleSwitch';
import B737Front from '@/assets/models/b737-800-front.png';
import B737Nose from '@/assets/models/b737-800-nose.png';
import B737Wing from '@/assets/models/b737-800-wing.png';

interface Drawing {
    id: number;
    label: string;
    src: string | null;
    naturalW: number;
    naturalH: number;
}

interface Box {
    x: number;
    y: number;
    w: number;
    h: number;
}

const MIN_SIZE = 300;
const HEADER_H = 32;
const CANVAS_PAD = 8;
const MAX_DRAWINGS = 4;

const INITIAL_BOXES: Box[] = [
    { x: 8, y: 8, w: 360, h: 260 },
    { x: 380, y: 8, w: 360, h: 260 },
    { x: 752, y: 8, w: 360, h: 260 },
    { x: 8, y: 280, w: 360, h: 260 },
];

const DRAWING_OPTIONS = [
    { label: '(없음)', value: '' },
    { label: '전면도 (B737 Front)', value: 'front' },
    { label: '노즈 (B737 Nose)', value: 'nose' },
    { label: '날개 (B737 Wing)', value: 'wing' },
];

const IMAGE_MAP: Record<string, string> = {
    front: B737Front,
    nose: B737Nose,
    wing: B737Wing,
};

function clamp(v: number, lo: number, hi: number) {
    return Math.max(lo, Math.min(hi, v));
}

function sizeForAspect(targetW: number, nw: number, nh: number): { w: number; h: number } {
    if (!nw || !nh) return { w: targetW, h: targetW };
    const ratio = nh / nw;
    const w = Math.max(MIN_SIZE, targetW);
    const h = Math.max(MIN_SIZE, Math.round(w * ratio));
    return { w, h };
}

function overlaps(a: Box, b: Box, padding = 4): boolean {
    return (
        a.x < b.x + b.w + padding &&
        a.x + a.w + padding > b.x &&
        a.y < b.y + b.h + padding &&
        a.y + a.h + padding > b.y
    );
}

function maxSizeWithoutOverlap(
    idx: number,
    current: Box,
    all: Box[],
    canvasW: number,
    canvasH: number,
    nw: number,
    nh: number,
): { maxW: number; maxH: number } {
    const ratio = nh && nw ? nh / nw : 1;
    let maxW = canvasW - current.x - CANVAS_PAD;
    let maxH = canvasH - current.y - CANVAS_PAD;

    for (let s = maxW; s >= MIN_SIZE; s -= 4) {
        const h = Math.round(s * ratio);
        const candidate: Box = { x: current.x, y: current.y, w: s, h };
        const collides = all.some((b, i) => i !== idx && overlaps(candidate, b));
        if (!collides) {
            maxW = s;
            maxH = h;
            break;
        }
    }
    return { maxW: Math.max(MIN_SIZE, maxW), maxH: Math.max(MIN_SIZE, maxH) };
}

const ModelStructure = () => {
    const [drawings, setDrawings] = useState<Drawing[]>(
        Array.from({ length: MAX_DRAWINGS }, (_, i) => ({
            id: i,
            label: `도면${i + 1}`,
            src: null,
            naturalW: 0,
            naturalH: 0,
        })),
    );

    const [boxes, setBoxes] = useState<Box[]>(INITIAL_BOXES.map(b => ({ ...b })));
    const [visible, setVisible] = useState<boolean[]>(Array(MAX_DRAWINGS).fill(false));
    const [repairMarker, setRepairMarker] = useState(false);

    const canvasRef = useRef<HTMLDivElement>(null);

    const handleSelect = useCallback(
        (idx: number, value: string) => {
            const src = value ? IMAGE_MAP[value] ?? null : null;

            if (src) {
                const img = new Image();
                img.onload = () => {
                    setDrawings(prev =>
                        prev.map((d, i) =>
                            i === idx ? { ...d, src, naturalW: img.naturalWidth, naturalH: img.naturalHeight } : d,
                        ),
                    );
                    setVisible(prev => prev.map((v, i) => (i === idx ? true : v)));
                };
                img.src = src;
            } else {
                setDrawings(prev => prev.map((d, i) => (i === idx ? { ...d, src: null, naturalW: 0, naturalH: 0 } : d)));
                setVisible(prev => prev.map((v, i) => (i === idx ? false : v)));
            }
        },
        [],
    );

    const handleDragStop = useCallback(
        (idx: number, d: { x: number; y: number }) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const cw = canvas.offsetWidth;
            const ch = canvas.offsetHeight;
            const cur = boxes[idx];

            const x = clamp(d.x, CANVAS_PAD, cw - cur.w - CANVAS_PAD);
            const y = clamp(d.y, CANVAS_PAD, ch - cur.h - CANVAS_PAD);
            const candidate: Box = { ...cur, x, y };

            // 겹치면 원래 위치 유지
            const collides = boxes.some((b, i) => i !== idx && overlaps(candidate, b));
            if (collides) return;

            setBoxes(prev => prev.map((b, i) => (i === idx ? candidate : b)));
        },
        [boxes],
    );

    const handleResizeStop = useCallback(
        (idx: number, _dir: unknown, ref: HTMLElement, _delta: unknown, pos: { x: number; y: number }) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const cw = canvas.offsetWidth;
            const ch = canvas.offsetHeight;
            const d = drawings[idx];
            const rawW = ref.offsetWidth;

            const { w, h } = sizeForAspect(rawW, d.naturalW, d.naturalH);
            const x = clamp(pos.x, CANVAS_PAD, cw - w - CANVAS_PAD);
            const y = clamp(pos.y, CANVAS_PAD, ch - h - CANVAS_PAD);
            const candidate: Box = { x, y, w, h };

            const collides = boxes.some((b, i) => i !== idx && overlaps(candidate, b));
            if (collides) {
                const { maxW, maxH } = maxSizeWithoutOverlap(idx, boxes[idx], boxes, cw, ch, d.naturalW, d.naturalH);
                setBoxes(prev => prev.map((b, i) => (i === idx ? { ...b, w: maxW, h: maxH } : b)));
                return;
            }

            setBoxes(prev => prev.map((b, i) => (i === idx ? candidate : b)));
        },
        [boxes, drawings],
    );

    return (
        <div className="flex h-full bg-white" style={{ fontFamily: 'inherit' }}>
            <div ref={canvasRef} className="relative flex-1 overflow-hidden bg-slate-50 border border-slate-200 m-2 rounded-md">
                {drawings.map((d, idx) =>
                    visible[idx] && d.src ? (
                        <Rnd
                            key={d.id}
                            position={{ x: boxes[idx].x, y: boxes[idx].y }}
                            size={{ width: boxes[idx].w, height: boxes[idx].h }}
                            minWidth={MIN_SIZE}
                            minHeight={MIN_SIZE}
                            bounds="parent"
                            dragHandleClassName="drawing-drag-handle"
                            enableResizing={{
                                bottomRight: true,
                                right: true,
                                bottom: true,
                            }}
                            onDragStop={(_e, dd) => handleDragStop(idx, dd)}
                            onResizeStop={(e, dir, ref, delta, pos) => handleResizeStop(idx, dir, ref, delta, pos)}
                            style={{ zIndex: 10 }}
                        >
                            <div
                                className="flex flex-col h-full border border-slate-300 rounded-md bg-white overflow-hidden shadow-sm"
                            >
                                <div
                                    className="drawing-drag-handle flex items-center justify-between px-2 border-b border-slate-200 bg-slate-50 cursor-grab active:cursor-grabbing select-none"
                                    style={{ height: HEADER_H, minHeight: HEADER_H }}
                                >
                                    <span className="text-slate-500 text-sm font-medium truncate">{d.label}</span>
                                    <button
                                        className="text-slate-400 hover:text-slate-600 text-xs ml-2 leading-none"
                                        onClick={() =>
                                            setVisible(prev => prev.map((v, i) => (i === idx ? false : v)))
                                        }
                                        title="닫기"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="flex flex-1 items-center justify-center p-2 overflow-hidden">
                                    <img src={d.src} alt={d.label} className="max-h-full max-w-full object-contain" />
                                </div>
                                <div
                                    className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
                                    style={{ pointerEvents: 'none' }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 14 14" className="absolute bottom-1 right-1 text-slate-300">
                                        <path d="M2 12 L12 2 M6 12 L12 6 M10 12 L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
                        </Rnd>
                    ) : null,
                )}

                {visible.every(v => !v) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-2 select-none">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-slate-300">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <path d="M3 9h18M9 21V9" />
                        </svg>
                        <p className="text-sm">오른쪽 패널에서 도면을 선택하세요</p>
                    </div>
                )}
            </div>

            <div className="flex flex-col min-w-[240px] max-w-[240px] py-3 border border-slate-200 rounded-md m-2 gap-1">
                <h3 className="text-slate-700 text-sm border-b border-slate-200 px-3 pb-2 mb-2 font-medium">도면설정</h3>
                <div className="flex flex-col gap-3 px-3">
                    <div className="flex justify-between items-center">
                        <p className="text-slate-600 text-sm">수리이력 마커</p>
                        <SystemToggleSwitch 
                            checked={repairMarker}
                            onChange={setRepairMarker}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-slate-600 text-sm">3D Sync</p>
                        <SystemToggleSwitch 
                            checked={repairMarker}
                            onChange={setRepairMarker}
                        />
                    </div>
                    {drawings.map((d, idx) => (
                        <div key={d.id} className="flex justify-between items-center gap-2">
                            <p className="text-slate-600 text-sm whitespace-nowrap">{d.label}</p>
                            <SearchSelect
                                value={d.src ? Object.keys(IMAGE_MAP).find(k => IMAGE_MAP[k] === d.src) ?? '' : ''}
                                onChange={value => handleSelect(idx, value)}
                                options={DRAWING_OPTIONS}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModelStructure;