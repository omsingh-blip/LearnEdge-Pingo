import { useNavigate } from "react-router-dom";

export default function DomainCard({ domain }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(domain.route, {
          state: { domain: domain.name },
        })
      }
      className="relative bg-slate-800/70 backdrop-blur-lg p-6 rounded-xl cursor-pointer
      border border-slate-700
      transition-all duration-300
      hover:border-blue-400
      hover:shadow-[0_0_35px_rgba(59,130,246,0.7)]
      hover:-translate-y-2 hover:scale-[1.05]"
    >

      <div className="flex flex-col items-center gap-3">

        <img
          src={domain.logo}
          alt={domain.name}
          className="w-12 h-12 object-contain transition duration-300 hover:scale-110"
        />

        <h2 className="text-lg font-semibold text-center">
          {domain.name}
        </h2>

      </div>

    </div>
  );
}