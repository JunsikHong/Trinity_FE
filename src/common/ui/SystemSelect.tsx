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
            <label className="block text-xs font-medium text-slate-600">
                {label}
            </label>

            <select
                name={name}
                value={value ?? ""}
                onChange={onChange}
                disabled={disabled}
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-blue-500 disabled:bg-slate-100"
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