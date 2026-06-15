import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import {
    Plane,
    Info,
} from 'lucide-react';

import B737Model from '@/models/B737Model';

const ModelCanvas = () => {
    return (
        <div className="flex h-full flex-col bg-slate-900">
            {/* Header */}
            <div className="border-b border-slate-700 px-4 py-3">
                <div className="flex items-center gap-2">
                    <Plane
                        size={18}
                        className="text-sky-400"
                    />

                    <span className="font-semibold text-white">
                        Boeing 737-800
                    </span>
                </div>

                <div className="mt-1 text-sm text-slate-400">
                    HL3800
                </div>
            </div>

            {/* 3D Viewer */}
            <div className="relative flex-1">
                <Canvas
                    camera={{
                        position: [10, 5, 10],
                        fov: 45,
                    }}
                >
                    <ambientLight intensity={1.2} />

                    <directionalLight
                        position={[10, 10, 10]}
                        intensity={2}
                    />

                    <Suspense fallback={null}>
                        <B737Model />
                    </Suspense>

                    <OrbitControls />
                </Canvas>

                {/* Viewer Badge */}
                <div
                    className="
                        absolute
                        right-4
                        top-4
                        rounded-lg
                        bg-black/50
                        px-3
                        py-2
                        text-xs
                        text-white
                        backdrop-blur
                    "
                >
                    3D Aircraft Viewer
                </div>
            </div>

            {/* Aircraft Information */}
            <div className="border-t border-slate-700 bg-slate-800 p-4">
                <div className="mb-3 flex items-center gap-2">
                    <Info
                        size={16}
                        className="text-sky-400"
                    />

                    <span className="text-sm font-semibold text-white">
                        Aircraft Information
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div className="text-slate-400">
                        Registration
                    </div>
                    <div className="text-white">
                        HL3800
                    </div>

                    <div className="text-slate-400">
                        Aircraft Type
                    </div>
                    <div className="text-white">
                        Boeing 737-800
                    </div>

                    <div className="text-slate-400">
                        Manufacturer
                    </div>
                    <div className="text-white">
                        Boeing
                    </div>

                    <div className="text-slate-400">
                        Operator
                    </div>
                    <div className="text-white">
                        Korean Air
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-slate-700 bg-slate-950 px-4 py-2">
                <p className="text-[10px] leading-relaxed text-slate-500">
                    B737-800 Model (https://skfb.ly/oSG9Q) by
                    hakai315 is licensed under Creative
                    Commons Attribution 4.0.
                </p>
            </div>
        </div>
    );
};

export default ModelCanvas;