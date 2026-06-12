import useStateStore from '@/store/useStateStore';

const LogListSection = () => {
    const { openDetail, putDetailList } = useStateStore();

    return (
        <div className="overflow-y-auto min-h-0 flex-1">
            {Array.from({ length: 20 }).map((_, idx) => (
                <div
                    key={idx}
                    className="cursor-pointer border-b border-zinc-800 px-4 py-3 transition-colors hover:bg-zinc-900"
                    onClick={() => {
                        putDetailList(idx);
                        openDetail(idx)
                    }}
                >
                    <div className="mb-2 flex items-start justify-between gap-4">
                        <h3 className="line-clamp-1 text-sm font-semibold text-zinc-100">
                            Crack Inspection Required
                        </h3>
                        <span className="flex-shrink-0 text-xs text-zinc-500">
                            2026-06-05
                        </span>
                    </div>
                    <div className="mb-2 flex flex-wrap gap-1 text-xs text-zinc-400">
                        <span className="rounded bg-zinc-800 px-2 py-0.5">
                            CHA 51
                        </span>
                        <span className="rounded bg-zinc-800 px-2 py-0.5">
                            STA 540
                        </span>
                        <span className="rounded bg-zinc-800 px-2 py-0.5">
                            STR 18
                        </span>
                        <span className="rounded bg-zinc-800 px-2 py-0.5">
                            WL 120
                        </span>
                        <span className="rounded bg-zinc-800 px-2 py-0.5">
                            BL 50
                        </span>
                        <span className="rounded bg-zinc-800 px-2 py-0.5">
                            WN 30
                        </span>
                    </div>
                    <p className="line-clamp-1 text-sm text-zinc-400">
                        Engine vibration inspection required near frame 540.
                        Recommended after maintenance action.
                    </p>
                </div>
            ))}
        </div>
    );
}

export default LogListSection;