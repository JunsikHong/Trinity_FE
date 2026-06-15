type Props = {
    label?: string;
    value?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows: number;
};

const SystemTextarea = ({
    label,
    value,
    onChange,
    placeholder,
    rows = 4,
}: Props) => {
    return (
        <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-600">
                {label}
            </label>

            <textarea
                rows={rows}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="
                    w-full
                    resize-none
                    rounded-lg
                    border
                    border-slate-200
                    p-3
                    text-sm
                    outline-none
                    transition
                    focus:border-blue-500
                "
            />
        </div>
    );
};

export default SystemTextarea;