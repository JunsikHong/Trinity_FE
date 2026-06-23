import SystemDateInput from "@/common/ui/SystemDateInput";
import SystemInput from "@/common/ui/SystemInput";
import SystemTextarea from "@/common/ui/SystemTextarea";
import { useState, useEffect } from "react";
import { Plus } from 'lucide-react';
import type { MaintenanceDetailResponse } from "@/hooks/useMaintenanceDetail";

interface WriteSectionProps {
    maintenanceDetail: MaintenanceDetailResponse | undefined;
    isLoading: boolean;
}

interface FormData {
    chapter: number | null;
    station: number | null;
    waterLine: number | null;
    buttockLine: number | null;
    stringer: number | null;
    frame: number | null;
    rib: number | null;
    wingStation: number | null;
    bodyStation: number | null;
    description: string | null;
    createdAt: string;
}

const WriteSection = ({ maintenanceDetail, isLoading }: WriteSectionProps) => {


    const [formData, setFormData] = useState<FormData>({
        chapter: null,
        station: null,
        waterLine: null,
        buttockLine: null,
        stringer: null,
        frame: null,
        rib: null,
        wingStation: null,
        bodyStation: null,
        description: "",
        createdAt: ""
    });

    const handleChange = <K extends keyof FormData>(
        field: K,
        value: FormData[K]
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    useEffect(() => {
        if (!maintenanceDetail?.id) return;

        setFormData({
            chapter: maintenanceDetail.chapter ?? null,
            station: maintenanceDetail.station ?? null,
            waterLine: maintenanceDetail.waterLine ?? null,
            buttockLine: maintenanceDetail.buttockLine ?? null,
            stringer: maintenanceDetail.stringer ?? null,
            frame: maintenanceDetail.frame ?? null,
            rib: maintenanceDetail.rib ?? null,
            wingStation: maintenanceDetail.wingStation ?? null,
            bodyStation: maintenanceDetail.bodyStation ?? null,
            description: maintenanceDetail.description ?? "",
            createdAt: maintenanceDetail.createdAt ?? ""
        });
    }, [maintenanceDetail]);

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
                        label="Station"
                        value={formData.station}
                        onChange={(e) =>
                            handleChange("station", e.target.value)
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
                        label="Stringer"
                        value={formData.stringer}
                        onChange={(e) =>
                            handleChange("stringer", e.target.value)
                        }
                    />
                    <SystemInput
                        label="Frame"
                        value={formData.frame}
                        onChange={(e) =>
                            handleChange("frame", e.target.value)
                        }
                    />
                    <SystemInput
                        label="Rib"
                        value={formData.rib}
                        onChange={(e) =>
                            handleChange("rib", e.target.value)
                        }
                    />
                    <SystemInput
                        label="Wing Station"
                        value={formData.wingStation}
                        onChange={(e) =>
                            handleChange("wingStation", e.target.value)
                        }
                    />
                    <SystemInput
                        label="Body Station"
                        value={formData.bodyStation}
                        onChange={(e) =>
                            handleChange("bodyStation", e.target.value)
                        }
                    />
                </div>
                <SystemDateInput
                    label="수리일자"
                    value={formData.createdAt}
                    onChange={(e) =>
                        handleChange("createdAt", e.target.value)
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
                        <Plus size={16} /> 사진 추가
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