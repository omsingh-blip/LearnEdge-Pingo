import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import {
  getLeaderboard,
} from "../services/leaderboardService";

import { useAuthStore } from "../store/authStore";
import { useGameStore } from "../store/useGameStore";
import DomainCard from "../components/dashboard/DomainCard";
import Leaderboard from "../components/dashboard/Leaderboard";
import XPCard from "../components/dashboard/XPCard";
import ProfileMenu from "../components/dashboard/ProfileMenu";
import PingoAssistant from "../components/dashboard/PingoAssistant";
import useLeaderboardSocket from "../hooks/useLeaderboardSocket";

export default function Dashboard() {
 
  const { xp, level } = useGameStore();

  const [leaders, setLeaders] = useState([]);

  const [showXpFloat, setShowXpFloat] = useState(false);

  const domains = [
    { name: "DSA", route: "/code", logo: "/dsa.png" },
    { name: "Web Dev", route: "/modules", logo: "/web.png" },
    { name: "Machine Learning", route: "/modules", logo: "/Ml.png" },
    { name: "AgriNova", route: "/modules", logo: "/AgriNova.jpeg" },
  ];

  useLeaderboardSocket(setLeaders);

  // Fetch leaderboard
  useEffect(() => {
    getLeaderboard()
      .then(setLeaders)
      .catch(console.error);
  }, []);


  useEffect(() => {
    if (xp > 0) {
      setShowXpFloat(true);

      const timer = setTimeout(() => {
        setShowXpFloat(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [xp]);


  return (
    <DashboardLayout>

      {showXpFloat && (
        <div className="fixed top-20 right-10 text-yellow-400 font-bold text-xl animate-floatUp z-50">
          +XP 🎉
        </div>
      )}

      {/* Header */}
      <div className="mb-6">

        <div className="flex items-center justify-between flex-wrap gap-4">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/companyLogo.png"
              alt="LearnEdge"
              className="w-12 h-12 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]"
            />

            <h1
              className="text-3xl font-bold transition
              hover:scale-105
              hover:drop-shadow-[0_0_20px_rgba(96,165,250,0.8)]"
            >
              LearnEdge Dashboard
            </h1>
          </div>

          {/* Profile */}
          <ProfileMenu />
        </div>

        {/* XP Card */}
        <div className="mt-4 flex justify-end">
          <XPCard
            xp={xp}
            level={level}
          />
        </div>
      </div>

      {/* Welcome */}
      <h2 className="text-lg text-gray-400 mb-6">
        Welcome back! Keep leveling up!
      </h2>

      {/* Domains */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {domains.map((domain, i) => (
          <DomainCard
            key={i}
            domain={domain}
          />
        ))}
      </div>

      {/* Leaderboard */}
      <Leaderboard leaders={leaders} />

      {/* Pingo Assistant */}
      <PingoAssistant xp={xp} />

    </DashboardLayout>
  );
}