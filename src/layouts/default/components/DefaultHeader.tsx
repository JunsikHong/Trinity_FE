import { Bell, Settings, Cog } from 'lucide-react';

const DefaultHeader = () => {
    return (
        <header className="flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4">
            <div className="flex items-center gap-1">
                <Cog
                    size={18}
                    className="cursor-pointer text-zinc-400 hover:text-white"
                />
                <div className="text-sm font-semibold text-zinc-100">
                    Aircraft Maintenance System
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