import { FileText, Calendar, Image } from 'lucide-react';

const StatusSection = () => {
    return (
        <div className="flex gap-3">
            <div className="flex rounded-lg bg-card border border-border p-3 min-w-[250px] justify-between items-center">
                <div className="flex flex-col justify-between gap-3">
                    <p className="text-secondary text-sm">전체 수리이력</p>
                    <p className="text-primary text-2xl font-bold">1,246건</p>
                    <p className="text-secondary text-sm">전체기간</p>
                </div>
                <div className="rounded-full bg-icon w-[50px] h-[50px] flex justify-center items-center">
                    <FileText className='text-icon-text'/>
                </div>
            </div>
        </div>
    );
}

export default StatusSection;