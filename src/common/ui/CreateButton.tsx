import { Plus } from "lucide-react";

const CreateButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="
                flex
                h-10
                items-center
                gap-2
                rounded-lg
                bg-blue-600
                px-4
                text-sm
                font-medium
                text-white
                hover:bg-blue-700
            "
        >
            <Plus size={16} />
            새 수리이력
        </button>
    );
};

export default CreateButton;