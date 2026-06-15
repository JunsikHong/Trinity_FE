import SystemDateInput from "@/common/ui/SystemDateInput";
import SystemInput from "@/common/ui/SystemInput";
import SystemTextarea from "@/common/ui/SystemTextarea";
import { useState } from "react";
import { Plus } from 'lucide-react';

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
        <>
            <div className="space-y-4 m-2 p-3 border rounded-md border-slate-200">
                <div className="grid grid-cols-3 gap-3">
                    <SystemInput
                        label="Chapter"
                        value={formData.chapter}
                        onChange={(e) =>
                            handleChange("chapter", e.target.value)
                        }
                    />
                    <SystemInput
                        label="STA"
                        value={formData.sta}
                        onChange={(e) =>
                            handleChange("sta", e.target.value)
                        }
                    />
                    <SystemInput
                        label="Stringer"
                        value={formData.stringer}
                        onChange={(e) =>
                            handleChange("stringer", e.target.value)
                        }
                    />
                    <SystemInput
                        label="Water Line"
                        value={formData.waterLine}
                        onChange={(e) =>
                            handleChange("waterLine", e.target.value)
                        }
                    />
                    <SystemInput
                        label="Buttock Line"
                        value={formData.buttockLine}
                        onChange={(e) =>
                            handleChange("buttockLine", e.target.value)
                        }
                    />
                    <SystemInput
                        label="Wing Line"
                        value={formData.wingLine}
                        onChange={(e) =>
                            handleChange("wingLine", e.target.value)
                        }
                    />
                </div>
                <SystemDateInput
                    label="수리일자"
                    value={formData.repairDate}
                    onChange={(e) =>
                        handleChange("repairDate", e.target.value)
                    }
                />
                <SystemTextarea
                    label="설명"
                    rows={5}
                    value={formData.description}
                    onChange={(e) =>
                        handleChange("description", e.target.value)
                    }
                />
            </div>
            <div className="space-y-4 m-2 p-3 border rounded-md border-slate-200">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm text-slate-600">첨부 사진</h3>
                    <button
                        className="flex h-8 items-center gap-1 rounded-md border text-slate-600 border-slate-200 bg-white px-2 font-medium hover:bg-slate-50 text-xs"
                    >
                        <Plus size={16}/> 사진 추가
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2">
                        <div className="border border-slate-300 h-16 rounded-lg flex items-center justify-center text-sm text-slate-400">
                            사진을 첨부해주세요.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WriteSection;