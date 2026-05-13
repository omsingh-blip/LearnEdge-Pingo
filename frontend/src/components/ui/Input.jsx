export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  className = "",
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        w-full p-3 rounded-lg
        bg-slate-900
        border border-slate-700
        focus:border-blue-400
        focus:ring-2
        focus:ring-blue-400
        outline-none
        transition
        ${className}
      `}
    />
  );
}