import { FileText, Calendar, Image } from 'lucide-react';

const StatusSection = () => {
    return (
        <div className="flex gap-3">
            <div className="flex rounded-lg bg-white p-3 min-w-[250px] justify-between items-center">
                <div className="flex flex-col justify-between gap-3">
                    <p className="text-slate-400 text-sm">전체 수리이력</p>
                    <p className="text-slate-700 text-2xl font-bold">1,246건</p>
                    <p className="text-slate-400 text-sm">전체기간</p>
                </div>
                <div className="rounded-full bg-blue-100 w-[50px] h-[50px] flex justify-center items-center">
                    <FileText className='text-blue-600'/>
                </div>
            </div>
            <div className="flex rounded-lg bg-white p-3 min-w-[250px] justify-between items-center">
                <div className="flex flex-col justify-between gap-3">
                    <p className="text-slate-400 text-sm">최근 등록</p>
                    <p className="text-slate-700 text-2xl font-bold">6건</p>
                    <p className="text-slate-400 text-sm">최근 7일</p>
                </div>
                <div className="rounded-full bg-blue-100 w-[50px] h-[50px] flex justify-center items-center">
                    <Calendar className='text-blue-600'/>
                </div>
            </div>
            <div className="flex rounded-lg bg-white p-3 min-w-[250px] justify-between items-center">
                <div className="flex flex-col justify-between gap-3">
                    <p className="text-slate-400 text-sm">사진 첨부된 이력</p>
                    <p className="text-slate-700 text-2xl font-bold">932건</p>
                    <p className="text-slate-400 text-sm">전체의 74.8%</p>
                </div>
                <div className="rounded-full bg-blue-100 w-[50px] h-[50px] flex justify-center items-center">
                    <Image className='text-blue-600'/>
                </div>
            </div>
        </div>
    );
}

export default StatusSection;