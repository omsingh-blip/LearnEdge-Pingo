export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative w-full py-3 rounded-lg
        bg-blue-600
        transition-all duration-300
        hover:scale-[1.02]
        disabled:opacity-50
        disabled:cursor-not-allowed
        overflow-hidden
        ${className}
      `}
    >

      {/* Glow */}
      <span
        className="absolute inset-0 rounded-lg bg-green-400 opacity-0
        group-hover:opacity-20 blur-xl transition"
      ></span>

      {/* Content */}
      <span className="relative z-10">
        {children}
      </span>

    </button>
  );
}