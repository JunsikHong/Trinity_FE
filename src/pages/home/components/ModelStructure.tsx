import { useState } from 'react';
import {
    ZoomIn,
    ZoomOut,
    Move,
} from 'lucide-react';

const views = [
    'TOP',
    'SIDE',
    'FRONT',
];

const DrawingSection = () => {
    const [selectedView, setSelectedView] =
        useState('SIDE');

    return (
        <div className="flex h-full flex-col bg-white">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-4 py-2">
                <div>
                    <h3 className="font-semibold text-slate-800">
                        Aircraft Drawing
                    </h3>

                    <p className="text-xs text-slate-500">
                        Boeing 737-800 Structural Drawing
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    {views.map((view) => (
                        <button
                            key={view}
                            onClick={() =>
                                setSelectedView(view)
                            }
                            className={`
                                rounded-md
                                px-3
                                py-1.5
                                text-xs
                                font-medium
                                transition
                                ${
                                    selectedView === view
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-100 text-slate-600'
                                }
                            `}
                        >
                            {view}
                        </button>
                    ))}
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-2 border-b bg-slate-50 px-4 py-2">
                <button className="rounded-md p-2 hover:bg-slate-200">
                    <ZoomIn size={16} />
                </button>

                <button className="rounded-md p-2 hover:bg-slate-200">
                    <ZoomOut size={16} />
                </button>

                <button className="rounded-md p-2 hover:bg-slate-200">
                    <Move size={16} />
                </button>
            </div>

            {/* Drawing Viewer */}
            <div className="relative flex-1 overflow-auto bg-slate-100">
                <div className="flex min-h-full items-center justify-center p-8">
                    <img
                        src="/images/b737-side.png"
                        alt="Aircraft Drawing"
                        className="
                            max-w-full
                            rounded-lg
                            border
                            bg-white
                            shadow-sm
                        "
                    />

                    {/* Repair Point */}
                    <button
                        className="
                            absolute
                            left-[55%]
                            top-[42%]
                            h-4
                            w-4
                            rounded-full
                            border-2
                            border-white
                            bg-red-500
                            shadow-lg
                        "
                    />

                    <button
                        className="
                            absolute
                            left-[65%]
                            top-[55%]
                            h-4
                            w-4
                            rounded-full
                            border-2
                            border-white
                            bg-yellow-500
                            shadow-lg
                        "
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="border-t bg-slate-50 px-4 py-2">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                        Drawing View :
                        {selectedView}
                    </span>

                    <span className="text-slate-500">
                        Repair Points : 24
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DrawingSection;