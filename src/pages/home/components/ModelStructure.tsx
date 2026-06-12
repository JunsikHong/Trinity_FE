import front from "@/assets/models/b737-800-front.png";
import nose from "@/assets/models/b737-800-nose.png";
import wing from "@/assets/models/b737-800-wing.png";
import SearchSelect from "@/common/ui/SearchSelect";
import { useState } from "react";

const ModelStructure = () => {
    const [selectedPart, setSelectedPart] = useState('');
    const partsOptions = [
        {
            label: '선택',
            value: ''
        },
        {
            label: '전면',
            value: 'front'
        },
        {
            label: '노즈',
            value: 'nose'
        },
        {
            label: '윙',
            value: 'wing'
        }
    ];
    return (
        <div className=" flex flex-col items-center p-3 absolute z-99 top-3 right-3 max-w-xs bg-zinc-900 rounded-md">
            <SearchSelect 
                options={partsOptions}
                value={selectedPart}
                onChange={(value) => setSelectedPart(value)}
            />
            {selectedPart === '' && (
                <div className="flex min-w-[100px] mt-3 items-center justify-center text-sm text-zinc-500">
                    No Selected
                </div>
            )}
            {selectedPart === 'front' && <img src={front} alt="" />}
            {selectedPart === 'nose' && <img src={nose} alt="" />}
            {selectedPart === 'wing' && <img src={wing} alt="" />}
        </div>
    );
}

export default ModelStructure;