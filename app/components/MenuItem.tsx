const MenuItem: React.FC<{ label: string; onClick?: () => void }> = ({
  label,
  onClick,
}) => {
  return (
    <div
      className="px-4 py-3 font-semibold text-sm hover:bg-neutral-200/50 transition"
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default MenuItem;
