export const Button = ({
    onClick,
    children,
}: {
    onClick: () => void;
    children: React.ReactNode;
}) => (
    <button
        onClick={onClick}
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
    >
        {children}
    </button>
);