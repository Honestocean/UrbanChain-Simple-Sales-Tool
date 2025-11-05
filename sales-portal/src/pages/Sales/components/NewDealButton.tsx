export interface INewDealButtonProps {
  onClick?: () => void;
}

export function NewDealButton({
  onClick,
}: INewDealButtonProps) {
  return (
    <button
      className="bg-gray-900 text-white px-4 py-0 rounded-lg hover:bg-gray-800 transition-colors flex items-center cursor-pointer"
      onClick={onClick}
    >
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
      New Deal
    </button>
  );
}
