import React from "react";
import { usePlayer } from "../contexts/PlayerContext";
import WalletConnect from "../components/WalletConnect";
import ProfileCreation from "../components/ProfileCreation";
import Marketplace from "../components/Marketplace";

const MarketplacePage: React.FC = () => {
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
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
        NFT Marketplace
      </h1>
      <Marketplace />
    </div>
  );
};

export default MarketplacePage;
