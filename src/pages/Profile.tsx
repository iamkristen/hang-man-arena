import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePlayer } from "../contexts/PlayerContext";
import WalletConnect from "../components/WalletConnect";
import ProfileCreation from "../components/ProfileCreation";
import PlayerProfile from "../components/PlayerProfile";
import PlayersDirectory from "../components/PlayersDirectory";

const Profile: React.FC = () => {
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
        Player Hub
      </h1>

      <Tabs defaultValue="profile" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="profile">My Profile</TabsTrigger>
          <TabsTrigger value="players">Players Directory</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <PlayerProfile />
        </TabsContent>

        <TabsContent value="players">
          <PlayersDirectory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
