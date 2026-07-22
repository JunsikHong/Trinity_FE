
const ButtonSection = ({ handleSubmit }: any) => {
    return (
        <div className="flex gap-2 px-2">
            <button
                onClick={handleSubmit}
                className="flex h-10 flex-1 items-center justify-center rounded-lg bg-blue-600 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300"
            >
                저장
            </button>
        </div>
    );
};

export default ButtonSection;
