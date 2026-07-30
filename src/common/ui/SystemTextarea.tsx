type Props = {
    label?: string;
    value?: string | null;
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
            <label className="block text-xs font-medium text-input-text">
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
                    border-input-border
                    p-3
                    bg-input
                    text-input-text
                    text-sm
                    outline-none
                    transition
                    focus:border-blue-500
                "
            >
                
            </textarea>
        </div>
    );
};

export default SystemTextarea;