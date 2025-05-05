export const ListItem = ({
    name,
    onDelete,
}: {
    name: string;
    onDelete: () => void;
}) => (
    <li className="flex justify-between items-center mb-4">
        <span className="text-lg text-gray-700">{name}</span>
        <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-700 transition"
        >
            O&apos;chirish
        </button>
    </li>
);