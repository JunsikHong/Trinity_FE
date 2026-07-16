import type { RepairLocationResponse } from "@/common/type/repair";
import SystemCheckbox from "@/common/ui/SystemCheckbox";
import SystemInput from "@/common/ui/SystemInput";

interface RenderLocationProps {
    location: RepairLocationResponse;
    value: string | number | boolean;
    onChange: (value: string | number | boolean) => void;
}

const RenderLocation = ({ location, value, onChange }: RenderLocationProps) => {
    switch (location.inputType) {
        case "text":
            return (
                <SystemInput
                    key={location.id}
                    type="text"
                    name={location.code}
                    label={location.name}
                    value={value as string}
                    onChange={(e) => onChange(e.target.value)}
                />
            );
        case "checkbox":
            return (
                <SystemCheckbox
                    key={location.id}
                    name={location.code}
                    label={location.name}
                    checked={value as boolean}
                    onChange={(e) => onChange(e.target.checked)}
                />
            );

        default:
            return null;
    }
};

export default RenderLocation;