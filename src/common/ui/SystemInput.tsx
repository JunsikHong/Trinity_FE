interface SystemInputProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    label?: string;
    name?: string;
    disabled?: boolean;
}

const SystemInput = ({
    label,
    value,
    onChange,
    name,
    placeholder,
    disabled = false,
}: SystemInputProps) => {
    return (
        <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-600">
                {label}
            </label>

            <input
                type="text"
                disabled={disabled}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="
                    h-10
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    px-3
                    text-sm
                    outline-none
                    transition
                    focus:border-blue-500
                    disabled:bg-slate-100
                "
            />
        </div>
    );
};

export default SystemInput;