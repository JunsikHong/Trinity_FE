import { Bell, Settings } from 'lucide-react';

const DefaultHeader = () => {
    return (
        <header className="flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4">
            <div className="flex items-center gap-3">
                <div>
                    <div className="text-xs text-zinc-500">
                        Aircraft Maintenance System
                    </div>

                    <div className="text-sm font-semibold text-zinc-100">
                        TRINITY
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Bell
                    size={18}
                    className="cursor-pointer text-zinc-400 hover:text-white"
                />
                <Settings
                    size={18}
                    className="cursor-pointer text-zinc-400 hover:text-white"
                />
            </div>
        </header>
    );
}

export default DefaultHeader;