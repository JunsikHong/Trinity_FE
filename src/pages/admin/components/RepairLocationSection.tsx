import { useState } from "react";
import SystemInput from "@/common/ui/SystemInput";
import SystemSelect from "@/common/ui/SystemSelect";
import SystemCheckbox from "@/common/ui/SystemCheckbox";
import { useRepairLocationList, useCreateRepairLocation, useUpdateRepairLocation, useDeleteRepairLocation } from "@/hooks/repair/useRepairLocation";
import { useAirplaneType } from "@/hooks/airplane/useAriplaneType";
import { useRepairChapter } from "@/hooks/repair/useRepairChapter";

const initialFormData = { id: "", airplaneType: "", chapter: "", inputType: "", inputDescription: "", name: "", code: "", section: "", sortOrder: "", isActive: false };

const RepairLocationSection = () => {
    const [status, setStatus] = useState("create");
    const [formData, setFormData] = useState(initialFormData);

    const { data: repairLocationList } = useRepairLocationList();
    const { data: airplaneTypes } = useAirplaneType();
    const { data: repairChapters } = useRepairChapter(formData.airplaneType ? Number(formData.airplaneType) : null);
    const createRepairLocation = useCreateRepairLocation();
    const updateRepairLocation = useUpdateRepairLocation();
    const deleteRepairLocation = useDeleteRepairLocation();

    const handleChange = (name: string, value: string) => {
        const sanitizedValue = name === "section" || name === "sortOrder"
            ? value.replace(/\D/g, "")
            : value;

        setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    };

    const handleSetFormData = (row: any) => {
        setStatus("edit");
        setFormData({
            id: String(row.id),
            airplaneType: String(row.airplaneTypeId),
            chapter: String(row.repairChapterId),
            inputType: row.inputType,
            name: row.name,
            code: row.code,
            section: row.section,
            sortOrder: String(row.sortOrder),
            inputDescription: row.inputDescription,
            isActive: row.isActive,
        });
    };

    const handleSave = () => {
        if (!formData.chapter) return;

        const request = {
            repairChapterId: Number(formData.chapter),
            name: formData.name,
            code: formData.code,
            section: formData.section,
            inputType: formData.inputType,
            inputDescription: formData.inputDescription,
            sortOrder: Number(formData.sortOrder) || 0,
            isActive: formData.isActive
        };

        if (status === "edit" && formData.id) {
            updateRepairLocation.mutate({ id: Number(formData.id), request });
        } else {
            createRepairLocation.mutate(request);
        }
    };

    const handleDelete = () => {
        deleteRepairLocation.mutate(Number(formData.id));
        setFormData(initialFormData);
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b px-6 py-4">
                <div><h2 className="text-lg font-semibold">Repair Locations</h2></div>
                <button
                    onClick={() => {
                        setStatus("create");
                        setFormData(initialFormData);
                    }}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                >
                    추가
                </button>
            </div>
            <div className="flex flex-col p-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <SystemSelect
                            label="airplane type"
                            value={formData.airplaneType}
                            onChange={(e) => setFormData(prev => ({ ...prev, airplaneType: e.target.value, chapter: "" }))}
                            options={[
                                { label: "선택", value: "" },
                                ...(airplaneTypes?.map(type => ({ label: type.name, value: type.id })) ?? [])
                            ]}
                        />
                    </div>
                    <div>
                        <SystemSelect
                            label="chapter"
                            value={formData.chapter}
                            onChange={(e) => handleChange("chapter", e.target.value)}
                            disabled={!formData.airplaneType}
                            options={[
                                { label: "선택", value: "" },
                                ...(repairChapters?.map(chapter => ({ label: `${chapter.chapterName} (${chapter.chapterNumber})`, value: chapter.id })) ?? [])
                            ]}
                        />
                    </div>
                    <div>
                        <SystemSelect
                            label="input type"
                            value={formData.inputType}
                            onChange={(e) => handleChange("inputType", e.target.value)}
                            options={[
                                { label: "선택", value: "" },
                                { label: "text", value: "text" },
                                { label: "checkbox", value: "checkbox" }
                            ]}
                        />
                    </div>
                    <div>
                        <SystemInput
                            label="input description"
                            value={formData.inputDescription}
                            onChange={(e) => handleChange("inputDescription", e.target.value)}
                        />
                    </div>
                    <div>
                        <SystemInput
                            label="name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                        /></div>
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
                    <div>
                        <SystemCheckbox
                            label="Active"
                            checked={formData.isActive}
                            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                        />
                    </div>
                </div>
                <div className="mt-3 w-full flex justify-end">
                    {status == 'edit' && (
                        <button
                            onClick={handleDelete}
                            className="rounded-lg bg-red-600 px-5 py-2 text-white mr-2"
                        >
                            삭제
                        </button>
                    )}
                    <button
                        onClick={handleSave}
                        className="rounded-lg bg-blue-600 px-5 py-2 text-white"
                    >
                        저장
                    </button>
                </div>
            </div>
            <div className="flex flex-col border-t">
                {repairLocationList?.map((row) => (
                    <button
                        key={row.id}
                        className="w-full text-slate-700 border-b rounded-md p-2"
                        onClick={() => handleSetFormData(row)}
                    >
                        <div className="font-medium">
                            {row.airplaneTypeName} &gt; {row.repairChapterName} ({row.repairChapterNumber}) &gt; {row.name}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RepairLocationSection;
