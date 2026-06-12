import SearchSelect from '@/common/ui/SearchSelect';
import SearchInput from '@/common/ui/SearchInput';
import SearchDateInput from '@/common/ui/SearchDateInput';
import { X } from 'lucide-react'; 
import useStateStore from '@/store/useStateStore';

const LogSearchSection = () => {
    const { detailList } = useStateStore();

    const registerOptions = [
        {
            label: '등록부호 (기종)',
            value: ''
        },
        {
            label: 'HL3800 (Boeing 737-800)',
            value: 'HL3800'
        },
        {
            label: 'HL3821 (Boeing 737-800)',
            value: 'HL3821'
        }
    ]

    return (
        <div className="flex-shrink-0 border-b flex flex-col gap-2.5 border-zinc-800 px-3 pb-3">
            <div className='flex items-center gap-2'>
                <SearchSelect
                    options={registerOptions}
                />
                <SearchDateInput />
                <span className='text-white'>~</span>
                <SearchDateInput />
            </div>
            <div className='flex items-center gap-2'>
                <SearchInput
                    placeholder='키워드 검색'
                />
                <button className="h-9 flex-shrink-0 px-4 border border-zinc-700 bg-zinc-900 text-sm text-zinc-300 transition-colors hover:bg-zinc-800">
                    검색 (38건)
                </button>
            </div>
            <div className='flex gap-2 items-center'>
                <span className='text-xs text-zinc-500'>선택 ({detailList.length} / 5) : </span>
                {detailList.map((id) => (
                    <span key={id} className='bg-zinc-800 px-3 text-xs text-zinc-300 py-1 rounded-md flex gap-1 items-center'>
                        #{id} <X className="h-2.5 w-2.5 rounded-full text-zinc-300" />
                    </span>
                ))}
            </div>
            {/* <div className="mt-3 grid grid-cols-6 gap-2">
                <SystemInput label="CHAPTER" />
                <SystemInput label="STA" />
                <SystemInput label="STRINGER" />
                <SystemInput label="WATER LINE" />
                <SystemInput label="BUTTOCK LINE" />
                <SystemInput label="WING LINE" />
            </div> */}
        </div>
    );
}

export default LogSearchSection;