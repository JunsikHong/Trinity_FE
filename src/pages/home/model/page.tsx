
// store
import { useAirplaneStore } from "@/store/airplaneStore";
import { useRepairStore } from "@/store/repairStore";
import { useStatusStore } from "@/store/statusStore";

// hooks
import { useRepairDetail } from "@/hooks/repair/useRepair";

// components
import ModelCanvas from '@/pages/home/model/components/ModelCanvas';
import ModelTools from '@/pages/home/model/components/ModelTools';
import ModelLocationInfo from '@/pages/home/model/components/ModelLocationInfo';
import ModelSource from '@/pages/home/model/components/ModelSource';

const ModelPage = () => {

    const { selectedAirplaneId } = useAirplaneStore();
    const { selectedRepairId } = useRepairStore();
    const { data: repairDetail } = useRepairDetail(selectedRepairId);
    const { zoom } = useStatusStore();

    return (
        <div className="flex h-full flex-col bg-black">
            <div className="relative flex-1">
                <ModelTools />
                {selectedRepairId && repairDetail && (
                    <ModelLocationInfo
                        repairDetail={repairDetail}
                    />
                )}
                <ModelCanvas
                    selectedAirplaneId={selectedAirplaneId}
                />
                <div className="absolute top-3 right-3 text-white">
                    {zoom}%
                </div>
            </div>
            <ModelSource/>
        </div>
    );
}

export default ModelPage;