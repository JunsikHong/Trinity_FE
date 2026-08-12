interface Option {
    value: string | number;
    label: string;
}

interface SystemSelectProps {
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
    label?: string;
    name?: string;
    disabled?: boolean;
    options: Option[];
}

const SystemSelect = ({
    label,
    value,
    onChange,
    name,
    disabled = false,
    options,
}: SystemSelectProps) => {
    return (
        <div className="space-y-1">
            <label className="block text-xs font-medium text-input-text">
                {label}
            </label>

            <select
                name={name}
                value={value ?? ""}
                onChange={onChange}
                disabled={disabled}
                className="h-10 w-full text-input-text rounded-lg border border-input-border bg-input px-3 text-sm outline-none transition focus:border-focus disabled:bg-input-disabled"
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SystemSelect;