import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PingoAssistant({ xp }) {
  const navigate = useNavigate();

  const [pingoMessage, setPingoMessage] = useState("");
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [showBubble, setShowBubble] = useState(false);

  // Generate message from XP
  useEffect(() => {
    let message = "";

    if (xp === 0) {
      message = "👋 Start your journey!";
    } else if (xp < 50) {
      message = "🔥 Good start! Try quiz!";
    } else if (xp < 100) {
      message = "🚀 You're improving fast!";
    } else {
      message = "🏆 You're on fire!";
    }

    setPingoMessage(message);
    setDisplayedMessage("");
    setShowBubble(true);
  }, [xp]);

  // Auto hide bubble
  useEffect(() => {
    if (!pingoMessage) return;

    setShowBubble(true);

    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [pingoMessage]);

  // Typing effect
  useEffect(() => {
    if (!pingoMessage) return;

    let i = 0;

    const interval = setInterval(() => {
      if (i < pingoMessage.length) {
        setDisplayedMessage((prev) => (
          prev + pingoMessage.charAt(i)
        ));

        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [pingoMessage]);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-50">

      {/* Bubble */}
      <div className="mb-2 mr-2 max-w-[180px]">

        <div
          className={`bg-white text-black text-xs px-3 py-2 rounded-xl shadow-lg
          transition-all duration-500
          ${showBubble ? "opacity-100" : "opacity-0"}`}
        >

          <p>{displayedMessage}</p>

        </div>
      </div>

      {/* Pingo */}
      <div className="relative">

        <div className="absolute inset-0 rounded-full bg-cyan-400 blur-3xl opacity-40 animate-pulse"></div>

        <div className="absolute inset-0 rounded-full border border-cyan-300 opacity-60"></div>

        <img
          src="/pingo-idle.png"
          alt="Pingo"
          className="relative w-20 md:w-24 animate-breathe cursor-pointer z-10
          transition hover:scale-110"
          onMouseEnter={() => {
            setDisplayedMessage(
              "😏 Ohh do you want a planner? Click me!"
            );

            setShowBubble(true);
          }}
          onMouseLeave={() => {
            setShowBubble(false);
          }}
          onClick={() => {
            navigate("/prep-planner");
          }}
        />

      </div>
    </div>
  );
}