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
                className="absolute left-3 top-1/2 -translate-y-1/2 text-input-text"
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
                    border-border
                    bg-input
                    pl-10
                    pr-3
                    text-sm
                    outline-none
                    transition
                    text-input-text
                    focus:border-focus-input
                "
            />
        </div>
    );
};

export default SearchInput;