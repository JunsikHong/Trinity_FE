import logo from '@/assets/logo.png';
import { LogOut } from "lucide-react";
import { useMember } from "@/hooks/useMember";
import { useLogout } from "@/hooks/useLogout";
import SearchSelect from "@/common/ui/SearchSelect";
import { useAirplane } from "@/hooks/useAirplane";
import { useAirplaneStore } from "@/store/airplaneStore";

const DefaultHeader = () => {
    const logout = useLogout();
    const { data: member } = useMember();
    const { data: airplanes = [] } = useAirplane();
    const { selectedAirplaneId, setSelectedAirplane } = useAirplaneStore();

    const options = [
        { value: "", label: "항공기 선택" },
        ...airplanes.map((airplane) => ({
            value: airplane.id,
            label: airplane.registrationNumber + " (" + airplane.airplaneTypeName + ")",
        })),
    ];

    const handleAirplaneChange = (value: string) => {
        if (!value) {
            setSelectedAirplane(null);
            return;
        }

        const airplane = airplanes.find(
            (item) => item.id === Number(value)
        );

        if (!airplane) return;

        setSelectedAirplane(airplane.id);
    };

    return (
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-2">
            <div className="flex items-center gap-2 p-2">
                <img src={logo} alt="" className='w-[40px]' />
                <p className="flex flex-col">
                    <span className='text-slate-400 text-xs font-semibold'>Maintanence System</span>
                    <span className='text-lg font-bold'>AirONE</span>
                </p>
                <div className='ml-3'>
                    <SearchSelect
                        value={selectedAirplaneId ?? ""}
                        options={options}
                        onChange={handleAirplaneChange}
                        className="w-full"
                    />
                </div>
            </div>
            <div className="flex items-center gap-3 p-2">
                <div className="flex flex-col items-end">
                    <p className="font-semibold text-sm">{member?.departmentName}</p>
                    <p className="text-xs text-slate-500">{member?.name}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold">
                    {member?.name?.charAt(0)}
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                >
                    <LogOut size={16} />
                    <span>로그아웃</span>
                </button>
            </div>
        </header>
    );
}

export default DefaultHeader;