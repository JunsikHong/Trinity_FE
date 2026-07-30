type Props = {
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

import { Calendar } from "lucide-react";

const SystemDateInput = ({
    label,
    value,
    onChange,
}: Props) => {
    return (
        <div className="space-y-1">
            <label className="block text-xs font-medium text-input-text">
                {label}
            </label>

            <div className="relative">
                <Calendar
                    size={16}
                    className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-input-text
                    "
                />

                <input
                    type="date"
                    value={value ?? ""}
                    onChange={onChange}
                    className="
                        h-10
                        w-full
                        rounded-lg
                        border
                        border-input-border
                        pl-10
                        pr-3
                        text-sm
                        outline-none
                        bg-input
                        text-input-text
                        focus:border-input-focus
                    "
                />
            </div>
        </div>
    );
};

export default SystemDateInput;