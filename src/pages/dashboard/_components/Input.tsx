export const Input = ({
    value,
    onChange,
    placeholder,
    type
}: {
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type: string
}) => (
    <input
    type={type}
        value={value}
        onChange={onChange}
        className="p-3 border-2 border-gray-300 rounded-lg w-full mb-4"
        placeholder={placeholder}
    />
);
