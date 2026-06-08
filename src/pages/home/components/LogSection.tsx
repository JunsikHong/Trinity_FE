import SystemSelect from '@/common/ui/SystemSelect';
import SystemInput from '@/common/ui/SystemInput';
import SystemTimeInput from '@/common/ui/SystemTimeInput';
import SystemDateInput from '@/common/ui/SystemDateInput';

const LogSection = () => {
    return (
        <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex h-12 items-center justify-between border-b border-zinc-800 px-4">
                <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    MAINTENANCE LOG
                </span>
            </div>
            <div className="flex-1 overflow-hidden">
                <div className="border-b border-zinc-800 p-3">
                    <SystemSelect
                        label="등록부호 (기종)"
                        options={[
                            {
                                label: 'HL3800 (Boeing 737-800)',
                                value: 'HL3800'
                            },
                            {
                                label: 'HL3821 (Boeing 737-800)',
                                value: 'HL3821'
                            }
                        ]}
                    />
                    <div className="mt-3">
                        <SystemInput
                            label="검색어"
                        />
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">

                        <SystemDateInput
                            label="날짜"
                        />
                        <SystemTimeInput
                            label="시간"
                        />
                    </div>
                    <div className="mt-3 grid grid-cols-5 gap-2">
                        <SystemInput label="STA" />
                        <SystemInput label="STRINGER" />
                        <SystemInput label="WATER LINE" />
                        <SystemInput label="BUTTOCK LINE" />
                        <SystemInput label="WING LINE" />
                    </div>
                    <div className="mt-3 flex gap-2">
                        <button className="h-9 flex-1 border border-zinc-700 bg-zinc-900 text-sm text-zinc-300 transition-colors hover:bg-zinc-800">
                            검색
                        </button>
                    </div>
                </div>
                <div className="flex h-full flex-col">
                    <div className="overflow-auto">
                        <div className="divide-y divide-zinc-800">
                            {Array.from({ length: 10 }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className="cursor-pointer border-b border-zinc-800 px-4 py-3 transition-colors hover:bg-zinc-900"
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogSection;