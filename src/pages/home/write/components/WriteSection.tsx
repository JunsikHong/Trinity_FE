import SystemDateInput from "@/common/ui/SystemDateInput";
import SystemInput from "@/common/ui/SystemInput";
import SystemTextarea from "@/common/ui/SystemTextarea";
import { useState } from "react";


const WriteSection = () => {
    interface FormData {
    repairNo: string;
    repairDate: string;
    chapter: string;
    sta: string;
    stringer: string;
    waterLine: string;
    buttockLine: string;
    wingLine: string;
    description: string;
}

     const [formData, setFormData] = useState({
        repairNo: "R-2024-00024",
        repairDate: "2024-05-20",
        chapter: "45.0",
        sta: "320.0",
        stringer: "S-12",
        waterLine: "WL 215.0",
        buttockLine: "BL 180.0",
        wingLine: "WL 0.0",
        description: "Skin panel dent repair",
    });

    const handleChange = (
    field: keyof FormData,
    value: string
) => {
    setFormData((prev) => ({
        ...prev,
        [field]: value,
    }));
};

    return (
        <div className="space-y-4 p-4">
            <SystemInput
                label="수리번호"
                value={formData.repairNo}
                onChange={(value) =>
                    handleChange("repairNo", value)
                }
            />
            <div className="grid grid-cols-3 gap-2">
                <SystemInput
                    label="Chapter"
                    value={formData.chapter}
                    onChange={(value) =>
                        handleChange("chapter", value)
                    }
                />
                <SystemInput
                    label="STA"
                    value={formData.sta}
                    onChange={(value) =>
                        handleChange("sta", value)
                    }
                />
                <SystemInput
                    label="Stringer"
                    value={formData.stringer}
                    onChange={(value) =>
                        handleChange("stringer", value)
                    }
                />
                <SystemInput
                    label="Water Line"
                    value={formData.waterLine}
                    onChange={(value) =>
                        handleChange("waterLine", value)
                    }
                />
                <SystemInput
                    label="Buttock Line"
                    value={formData.buttockLine}
                    onChange={(value) =>
                        handleChange("buttockLine", value)
                    }
                />
                <SystemInput
                    label="Wing Line"
                    value={formData.wingLine}
                    onChange={(value) =>
                        handleChange("wingLine", value)
                    }
                />
            </div>
            <SystemDateInput
                label="수리일자"
                value={formData.repairDate}
                onChange={(value) =>
                    handleChange("repairDate", value)
                }
            />
            <SystemTextarea
                label="설명"
                rows={5}
                value={formData.description}
                onChange={(value) =>
                    handleChange("description", value)
                }
            />
        </div>
    );
};

export default WriteSection;