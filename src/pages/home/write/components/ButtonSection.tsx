import useStateStore from '@/store/useStateStore';

const ButtonSection = () => {
    const { closeWrite, openDetail } = useStateStore();

    const handleSave = () => {
        closeWrite();
        openDetail("R-2024-00017");
    };

    return (
        <div className="flex gap-2 px-2">
            <button
                onClick={handleSave}
                className="flex-1 h-10 rounded-md bg-blue-100 border border-blue-400 text-blue-600 font-medium text-sm hover:bg-blue-600 transition"
            >
                저장
            </button>
        </div>
    );
};

export default ButtonSection;
