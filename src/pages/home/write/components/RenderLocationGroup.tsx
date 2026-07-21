import { useMemo } from "react";
import type { RepairLocationResponse } from "@/common/type/repair";
import RenderLocation from "@/pages/home/write/components/RenderLocation";
import SystemInput from "@/common/ui/SystemInput";
import SystemCheckbox from "@/common/ui/SystemCheckbox";

interface RenderLocationGroupProps {
    locations: RepairLocationResponse[] | undefined;
    values: Record<string, string | number | boolean>;
    onChange: (key: string, value: string | number | boolean) => void;
}

type LocationItem =
    | { type: "single"; location: RepairLocationResponse }
    | { type: "textGroup"; code: string; name: string; locations: RepairLocationResponse[] }
    | { type: "checkboxGroup"; locations: RepairLocationResponse[] };

const RenderLocationGroup = ({ locations, values, onChange }: RenderLocationGroupProps) => {
    const groupedItems = useMemo<LocationItem[]>(() => {
        if (!locations) return [];

        // code 기준으로 묶기
        const byCode = new Map<string, RepairLocationResponse[]>();
        locations.forEach((loc) => {
            const arr = byCode.get(loc.code) ?? [];
            arr.push(loc);
            byCode.set(loc.code, arr);
        });

        const items: LocationItem[] = [];
        const checkboxCandidates: RepairLocationResponse[] = [];

        byCode.forEach((group) => {
            const isText = group[0].inputType === "text";

            if (isText && group.length >= 2) {
                // text이면서 code가 같은 것이 2개 이상 → 한 줄 그룹 (~ 로 연결)
                const sorted = [...group].sort((a, b) => a.sortOrder - b.sortOrder);
                items.push({
                    type: "textGroup",
                    code: group[0].code,
                    name: group[0].name,
                    locations: sorted,
                });
                return;
            }

            group.forEach((loc) => {
                if (loc.inputType === "checkbox") {
                    checkboxCandidates.push(loc);
                } else {
                    items.push({ type: "single", location: loc });
                }
            });
        });

        // checkbox가 전체적으로 2개 이상이면 2열 그룹으로 배치
        if (checkboxCandidates.length >= 2) {
            const sorted = [...checkboxCandidates].sort((a, b) => a.sortOrder - b.sortOrder);
            items.push({ type: "checkboxGroup", locations: sorted });
        } else {
            checkboxCandidates.forEach((loc) => {
                items.push({ type: "single", location: loc });
            });
        }

        return items;
    }, [locations]);

    return (
        <>
            {groupedItems.map((item) => {
                if (item.type === "single") {
                    return (
                        <RenderLocation
                            key={item.location.id}
                            location={item.location}
                            value={values[item.location.code]}
                            onChange={(value) =>
                                onChange(item.location.code, value)
                            }
                        />
                    );
                }

                if (item.type === "textGroup") {
                    return (
                        <div key={item.code} className="flex items-center gap-2">
                            <span className="w-8 shrink-0 text-sm font-medium text-slate-700">
                                {item.code}
                            </span>
                            <div className="flex items-center gap-2">
                                {item.locations.map((loc, idx) => (
                                    <div key={loc.id} className="flex items-center gap-2">
                                        {idx > 0 && (
                                            <span className="text-slate-400">~</span>
                                        )}
                                        <SystemInput
                                            type="text"
                                            name={`${loc.code}_${loc.id}`}
                                            value={(values[loc.id] as string) ?? ""}
                                            onChange={(e) =>
                                                onChange(loc.id.toString(), e.target.value)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                }

                if (item.type === "checkboxGroup") {
                    return (
                        <div
                            key="checkbox-group"
                            className="grid grid-cols-2 gap-x-6 gap-y-4"
                        >
                            {item.locations.map((loc) => (
                                <SystemCheckbox
                                    key={loc.id}
                                    name={loc.code}
                                    label={loc.name}
                                    checked={(values[loc.code] as boolean) ?? false}
                                    onChange={(e) =>
                                        onChange(loc.code, e.target.checked)
                                    }
                                />
                            ))}
                        </div>
                    );
                }

                return null;
            })}
        </>
    );
};

export default RenderLocationGroup;