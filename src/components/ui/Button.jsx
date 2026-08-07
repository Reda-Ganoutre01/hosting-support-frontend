const VARIANT_STYLES = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

export default function Button({
                                 children,
                                 variant = 'primary',
                                 type = 'button',
                                 disabled = false,
                                 onClick,
                                 className = '',
                               }) {
  return (
      <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANT_STYLES[variant]} ${className}`}
      >
        {children}
      </button>
  );
}