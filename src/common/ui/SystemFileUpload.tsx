import { Paperclip } from 'lucide-react';

const SystemFileUpload = () => {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-[9px] font-medium tracking-wider text-zinc-500 uppercase">
                첨부파일
            </label>

            <label className="flex cursor-pointer items-center justify-center gap-2 border border-dashed border-zinc-800 bg-zinc-900 px-4 py-6 text-sm text-zinc-400 transition-colors hover:border-cyan-500 hover:text-zinc-200">
                <Paperclip size={16} />
                파일 선택
                <input
                    type="file"
                    multiple
                    className="hidden"
                />
            </label>
        </div>
    );
};

export default SystemFileUpload;