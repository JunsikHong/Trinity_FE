import SystemInput from '@/common/ui/SystemInput';
import SystemTextarea from '@/common/ui/SystemTextarea';
import SystemDateInput from '@/common/ui/SystemDateInput';
import SystemTimeInput from '@/common/ui/SystemTimeInput';
import SystemFileUpload from '@/common/ui/SystemFileUpload';

const DetailSection = () => {
    return (
        <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex h-12 items-center justify-between border-b border-zinc-800 px-4">
                <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    MAINTENANCE Detail
                </span>
            </div>
            <div className="flex-1 overflow-hidden">
                <div className="border-b border-zinc-800 p-3">

                    <div className="grid grid-cols-2 gap-2">
                        <SystemInput label="등록부호(기종)" />
                        <SystemInput label="작성자" />
                    </div>
                    <div className="grid grid-cols-5 gap-2 mt-4">
                        <SystemInput label="STA" />
                        <SystemInput label="STRINGER" />
                        <SystemInput label="WATER LINE" />
                        <SystemInput label="BUTTOCK LINE" />
                        <SystemInput label="WING LINE" />
                    </div>
                    <div className="mt-4">
                        <SystemTextarea
                            label="설명"
                        />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        <SystemDateInput
                            label="날짜"
                        />
                        <SystemTimeInput
                            label="시간"
                        />
                    </div>
                    <div className="mt-4">
                        <SystemFileUpload />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailSection;