import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  getLeaderboard,
} from "../services/leaderboardService";
import { useGameStore } from "../store/useGameStore";
import DomainCard from "../components/dashboard/DomainCard";
import Leaderboard from "../components/dashboard/Leaderboard";
import XPCard from "../components/dashboard/XPCard";
import PingoAssistant from "../components/dashboard/PingoAssistant";
import useLeaderboardSocket from "../hooks/useLeaderboardSocket";

export default function Dashboard() {
 
  const { xp, level } = useGameStore();

  const [leaders, setLeaders] = useState([]);

  const [showXpFloat, setShowXpFloat] = useState(false);

 const domains = [

  {
    name: "DSA",
    route: "/modules/dsa",
    logo: "/dsa.png",
  },

  {
    name: "Web Dev",
    route: "/modules/webdev",
    logo: "/web.png",
  },

  {
    name: "Machine Learning",
    route: "/modules/ml",
    logo: "/Ml.png",
  },

  {
    name: "AgriNova",
    route: "/modules/agrinova",
    logo: "/AgriNova.jpeg",
  },

];

  useLeaderboardSocket(setLeaders);

  // Fetch leaderboard
useEffect(() => {

  getLeaderboard()

    .then((data) => {

      setLeaders(data);

    })

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

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