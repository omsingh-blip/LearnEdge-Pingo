import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  return (
    <motion.button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={`
        group relative w-full py-3 rounded-lg
        bg-gray-900/80 backdrop-blur-lg border border-gray-700
        text-white font-medium text-center
        transition-all duration-300
        hover:bg-gray-700/80
        hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]
        disabled:bg-gray-700/50
        disabled:text-gray-400
        disabled:cursor-not-allowed
        disabled:hover:bg-gray-700/50
        disabled:hover:shadow-none
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
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
