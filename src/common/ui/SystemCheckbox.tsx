import { Check } from "lucide-react";

interface SystemCheckboxProps {
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    name?: string;
    disabled?: boolean;
}

const SystemCheckbox = ({
    checked = false,
    onChange,
    label,
    name,
    disabled = false,
}: SystemCheckboxProps) => {
    return (
        <label
            className={`flex cursor-pointer items-center gap-2 ${disabled ? "cursor-not-allowed opacity-60" : ""
                }`}
        >
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="hidden"
            />

            <span
                className={`flex h-5 w-5 items-center justify-center rounded border transition ${checked
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
            >
                {checked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
            </span>

            {label && (
                <span className="text-sm text-slate-700">
                    {label}
                </span>
            )}
        </label>
    );
};

export default SystemCheckbox;