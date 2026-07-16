import { useState } from "react";
import SystemInput from "@/common/ui/SystemInput";
import SystemSelect from "@/common/ui/SystemSelect";
import SystemCheckbox from "@/common/ui/SystemCheckbox";

const RepairLocationSection = () => {

    const [formData, setFormData] = useState({ id: "", airplaneType:"", chapter:"", inputType:"", name:"", code:"", section:"", sortOrder:"", active:false });

    const handleChange = (name: string, value: string) => {
        let formattedValue = value;
        setFormData(prev => ({ ...prev, [name]: formattedValue }));
    };

    // TODO:
    // location 리스트 불러오기
    // location 선택 시 formData 에 값넣기
    // airplaneType 리스트 불러와서 select box에 넣기
    // airplaneType 선택 시 chapter 리스트 불러와서 select box에 넣기
    // 등록, 수정 로직 짜기
    
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b px-6 py-4">
                <div>
                    <h2 className="text-lg font-semibold">
                        Repair Locations
                    </h2>
                    <p className="text-sm text-slate-500">
                        Manage locations
                    </p>
                </div>
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                    New
                </button>
            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-5 border-r">
                    <button className="w-full border-b px-5 py-4 text-left hover:bg-slate-50">
                        <div className="font-medium">
                            STA
                        </div>
                        <div className="text-xs text-slate-500">
                            sta
                        </div>
                        <div className="mt-2 flex gap-2">
                            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">
                                Number
                            </span>
                            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                                Fuselage
                            </span>
                        </div>
                    </button>
                </div>
                <div className="col-span-7 space-y-5 p-6">
                    <h3 className="font-semibold">
                        Edit Location
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <SystemSelect
                                label="airplane type"
                                options={[
                                    { label: "선택", value: "" },
                                    { label: "text", value: "text" },
                                    { label: "checkbox", value: "checkbox" },
                                ]}
                            />
                        </div>
                        <div>
                            <SystemSelect
                                label="chapter"
                                options={[
                                    { label: "선택", value: "" },
                                    { label: "text", value: "text" },
                                    { label: "checkbox", value: "checkbox" },
                                ]}
                            />
                        </div>
                        <div>
                            <SystemSelect
                                label="input type"
                                options={[
                                    { label: "선택", value: "" },
                                    { label: "text", value: "text" },
                                    { label: "checkbox", value: "checkbox" },
                                ]}
                            />
                        </div>
                        <div>
                            <SystemInput
                                label="name"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                            />
                        </div>
                        <div>
                            <SystemInput
                                label="code"
                                value={formData.code}
                                onChange={(e) => handleChange("code", e.target.value)}
                            />
                        </div>
                        <div>
                            <SystemInput
                                label="section"
                                value={formData.section}
                                onChange={(e) => handleChange("section", e.target.value)}
                            />
                        </div>
                        <div>
                            <SystemInput
                                label="sort order"
                                value={formData.sortOrder}
                                onChange={(e) => handleChange("sortOrder", e.target.value)}
                            />
                        </div>
                    </div>
                    <SystemCheckbox
                        label="Active"
                        checked={formData.active}
                        onChange={(e) => handleChange("active", e.target.checked ? "true" : "false")}
                    />
                    <button className="rounded-lg bg-blue-600 px-5 py-2 text-white">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RepairLocationSection;