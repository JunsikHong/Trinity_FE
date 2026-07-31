import { X } from 'lucide-react';
import type { RepairLocationItemListResponse, RepairDetailResponse } from "@/common/type/repair"

const ModelLocationInfo = ({ repairDetail }: { repairDetail: RepairDetailResponse }) => {
    return(
        <div className='absolute top-3 left-16 flex flex-col bg-slate-800 z-10 px-2 py-2 rounded-md min-w-[130px]'>
            <div className='flex items-center gap-3 justify-between mb-3 text-slate-500'>
              <p className='text-xs font-bold'>
                위치정보
              </p>
              <X size={14} />
            </div>
            <div className='flex flex-col gap-1 text-xs text-slate-300'>
              <div className='flex justify-between'>
                <p>CHAPTER</p>
                <p>{repairDetail?.locationItems[0].chapterNumber}</p>
              </div>
              {(() => {
                const groups = (repairDetail?.locationItems ?? []).reduce(
                  (acc, cur) => {
                    if (!acc[cur.locationCode]) {
                      acc[cur.locationCode] = [];
                    }

                    acc[cur.locationCode].push(cur);
                    return acc;
                  },
                  {} as Record<string, RepairLocationItemListResponse[]>
                );

                return Object.entries(groups).map(([code, items]) => {
                  const isRange = code === "STA" || code === "STR";

                  return (
                    <div key={code} className="flex justify-between gap-6">
                      <p>{isRange ? code : items[0].locationName}</p>

                      <p>
                        {isRange &&
                          (() => {
                            const values = items.map((v) => v.value);

                            return values.length > 1
                              ? `${values[0]} ~ ${values[values.length - 1]}`
                              : values[0];
                          })()}
                      </p>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
    );
}

export default ModelLocationInfo;