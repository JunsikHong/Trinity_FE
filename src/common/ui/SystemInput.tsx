interface SystemInputProps {
    type?: string;
    value?: string | number | null;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    label?: string;
    name?: string;
    disabled?: boolean;
    className?: string;
}

const SystemInput = ({
    type = "text",
    label,
    value,
    onChange,
    name,
    placeholder,
    disabled = false,
    className
}: SystemInputProps) => {
    return (
        <div className="space-y-1">
            <label className="block text-xs font-medium text-input-text">
                {label}
            </label>
            <input
                type={type}
                disabled={disabled}
                name={name}
                value={value ?? undefined}
                placeholder={placeholder}
                onChange={onChange}
                className={`h-10 w-full rounded-lg bg-input text-input-text border border-input-border px-3 text-sm outline-none transition focus:border-input-focus disabled:bg-input-disabled ${className}`} />
        </div>
    );
};

export default SystemInput;