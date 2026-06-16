import logo from '@/assets/logo.png';

const DefaultHeader = () => {
    return (
        <header className="flex p-2 items-center justify-between border-b border-slate-200 bg-white px-6">
            <div className="flex items-center gap-2">
                <img src={logo} alt="" className='w-[40px]' />
                <p className="flex flex-col">
                    <span className='text-slate-400 text-xs font-semibold'>Maintanence System</span>
                    <span className='text-lg font-bold'>AirONE</span>
                </p>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                    <p className="font-semibold text-sm">트리니티 정비팀</p>
                    <p className="text-xs text-slate-500">팀장/홍민식</p>

                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold">
                    H
                </div>
            </div>
        </header>
    );
}

export default DefaultHeader;