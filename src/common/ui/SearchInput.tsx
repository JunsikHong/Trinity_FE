import { Search } from "lucide-react";

interface SearchInputProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    label?: string;
    name?: string;
    disabled?: boolean;
}

const SearchInput = ({
    value,
    onChange,
    placeholder = "검색",
    name,
    disabled = false

}: SearchInputProps) => {
    return (
        <div className="relative flex-1">
            <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className="
                    h-10
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    pl-10
                    pr-3
                    text-sm
                    outline-none
                    transition
                    focus:border-blue-500
                "
            />
        </div>
    );
};

export default SearchInput;