type Props = {
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchDateInput = ({
    value,
    onChange
}: Props) => {
    return (
        <input
            type="date"
            value={value}
            onChange={onChange}
            className="h-9 w-full border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-100 outline-none focus:border-cyan-500"
        />
    );
};

export default SearchDateInput;