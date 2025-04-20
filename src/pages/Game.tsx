import React from "react";
import GameBoard from "../components/GameBoard";
import { usePlayer } from "../contexts/PlayerContext";
import WalletConnect from "../components/WalletConnect";
import ProfileCreation from "@/components/ProfileCreation";

const Game: React.FC = () => {
  const { isConnected, isProfileComplete } = usePlayer();

  if (!isConnected) {
    return (
      <div className="container py-10 min-h-screen flex items-center justify-center">
        <WalletConnect />
      </div>
    );
  }

  if (!isProfileComplete) {
    return (
      <div className="container py-10 min-h-screen flex items-center justify-center">
        <ProfileCreation />
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold text-center mb-4 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
        Crypto Hangman Arena
      </h1>
      <GameBoard />
    </div>
  );
};

export default Game;
