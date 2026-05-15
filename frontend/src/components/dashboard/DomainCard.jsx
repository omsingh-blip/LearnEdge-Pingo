import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

export default function DomainCard({
  domain,
}) {

  const navigate = useNavigate();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.4,
      }}

      whileHover={{
        scale: 1.05,
      }}
    >

      <div
        onClick={() =>
          navigate(domain.route)
        }
        className="group cursor-pointer
        bg-slate-800/70 backdrop-blur-lg
        border border-slate-700
        rounded-2xl p-6
        transition-all duration-300
        hover:border-blue-400
        hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
      >

        <div className="flex flex-col items-center text-center">

          <img
            src={domain.logo}
            alt={domain.name}
            className="w-16 h-16 object-contain mb-4
            transition group-hover:scale-110"
          />

          <h2
            className="text-lg font-semibold
            transition group-hover:text-blue-400"
          >
            {domain.name}
          </h2>

        </div>

      </div>

    </motion.div>
  );
}