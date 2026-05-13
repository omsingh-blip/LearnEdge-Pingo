import { useEffect } from "react";
import { io } from "socket.io-client";

export default function useLeaderboardSocket(setLeaders) {

  useEffect(() => {

    const socket = io(import.meta.env.VITE_SOCKET_URL);

    socket.on("leaderboardUpdate", (data) => {
      setLeaders(data);
    });

    return () => {
      socket.disconnect();
    };

  }, [setLeaders]);

}