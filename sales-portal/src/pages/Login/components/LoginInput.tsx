export interface ILoginInputProps {
  label: string;
  id: string;
  name: string;
  type: "text" | "password";
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  icon: React.ReactNode;
}

export function LoginInput({
  label,
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  disabled = false,
  error,
  icon,
}: ILoginInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full pl-10 pr-10 py-3 border-0 border-b-2 focus:ring-0 focus:border-teal-500 transition-colors bg-transparent ${
            error ? "border-red-300" : "border-gray-300"
          }`}
          placeholder={placeholder}
          disabled={disabled}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <svg
            className="h-5 w-5 text-teal-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
