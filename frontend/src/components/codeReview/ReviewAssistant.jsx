import { motion } from "framer-motion";

export default function ReviewAssistant({
  pingoState,
  hasWelcomed,
}) {

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 50,
      }}

      animate={{
        opacity: 1,
        x: 0,
      }}

      transition={{
        duration: 0.5,
      }}

      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
    >

      {pingoState !== "idle" && (
        <div
          className="mb-2 mr-2 bg-white text-black text-xs
          px-3 py-2 rounded-xl shadow-lg
          max-w-[160px] relative animate-fadeIn"
        >

          <p>

            {!hasWelcomed &&
              "👋 Hi! Try some code!"}

            {hasWelcomed &&
              pingoState === "happy" &&
              "🚀 Try some more!"}

            {pingoState === "running" &&
              "⚡ Running your code..."}

            {pingoState === "thinking" &&
              "🧠 Hmm... analyzing..."}

          </p>

          <div
            className="absolute bottom-[-6px] right-4
            w-3 h-3 bg-white rotate-45"
          ></div>

        </div>
      )}

      <div className="relative">

        <div
          className={`absolute inset-0 rounded-full blur-3xl opacity-40
          ${
            pingoState === "running"
              ? "bg-yellow-400"
              : pingoState === "thinking"
              ? "bg-purple-500"
              : pingoState === "happy"
              ? "bg-green-400"
              : "bg-blue-500"
          }`}
        ></div>

        <div
          className="absolute inset-0 rounded-full border-2 border-blue-400
          opacity-60 animate-pulse"
        ></div>

        <img
          src={
            pingoState === "running"
              ? "/pingo-running.png"
              : pingoState === "thinking"
              ? "/pingo-thinking.png"
              : pingoState === "happy"
              ? "/pingo-happy.png"
              : "/pingo-idle.png"
          }
          className="relative w-16 md:w-20 animate-breathe
          drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
        />

      </div>

    </motion.div>
  );
}