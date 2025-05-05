export const Select = ({
    value,
    onChange,
    options,
}: {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { id: number; name: string }[];
}) => (
    <select
        value={value}
        onChange={onChange}
        className="p-3 border-2 border-gray-300 rounded-lg w-full mb-4"
    >
        <option value={0}>Kategoriya tanlang</option>
        {options.map((option) => (
            <option key={option.id} value={option.id}>
                {option.name}
            </option>
        ))}
    </select>
);