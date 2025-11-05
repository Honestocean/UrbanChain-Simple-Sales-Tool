export interface IViewSaleButtonProps {
  customerName: string;
  onClick?: () => void;
}

export function ViewSaleButton({
  customerName,
  onClick,
}: IViewSaleButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      alert(`Viewing sale: ${customerName}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center text-gray-600 hover:text-teal-600 transition-colors cursor-pointer"
    >
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
      View Sale
    </button>
  );
}
