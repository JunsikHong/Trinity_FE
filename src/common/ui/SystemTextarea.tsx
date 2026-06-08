type Props = {
    label?: string;
    value?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const SystemTextarea = ({
    label,
    value,
    placeholder,
    onChange
}: Props) => {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-[9px] font-medium tracking-wider text-zinc-500 uppercase">
                    {label}
                </label>
            )}

            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={5}
                className="resize-none border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-cyan-500"
            />
        </div>
    );
};

export default SystemTextarea;