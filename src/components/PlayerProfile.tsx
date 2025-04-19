import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePlayer } from "../contexts/PlayerContext";
import {
  Dna,
  GamepadIcon,
  Trophy,
  Wallet,
  ClipboardCopy,
  Check,
} from "lucide-react";

const PlayerProfile: React.FC = () => {
  const { player } = usePlayer();
  const [copied, setCopied] = useState(false);

  if (!player) {
    return null;
  }

  const winRate =
    player.gamesPlayed > 0
      ? Math.round((player.gamesWon / player.gamesPlayed) * 100)
      : 0;

  return (
    <Card className="w-full mx-auto bg-card/80 backdrop-blur">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold">Player Profile</CardTitle>
        <CardDescription>View your profile stats and progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center md:w-1/3">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary mb-4">
              {player.avatar ? (
                <img
                  src={player.avatar}
                  alt="Player Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 absolute flex items-center justify-center">
                  <span className="text-5xl">👾</span>
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold mb-1">{player.name}</h3>
            <p className="text-muted-foreground text-sm mb-3">{player.email}</p>
            <div className="flex space-x-2 mb-4">
              <span className="level-badge">Level {player.level}</span>
              <span className="points-badge">{player.points} pts</span>
            </div>
            <div className="w-full">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress to Level {player.level + 1}</span>
                <span>{player.points % 300}/300</span>
              </div>
              <div className="w-full bg-secondary/30 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 h-2 rounded-full"
                  style={{ width: `${(player.points % 300) / 3}%` }}
                />
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <h4 className="font-medium mb-4 text-muted-foreground">
              Player Stats
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-secondary/10">
                <CardContent className="p-4 flex items-center">
                  <div className="mr-4 p-2 bg-indigo-500/20 rounded-full">
                    <GamepadIcon className="h-6 w-6 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Games Played
                    </p>
                    <p className="text-2xl font-bold">{player.gamesPlayed}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-secondary/10">
                <CardContent className="p-4 flex items-center">
                  <div className="mr-4 p-2 bg-green-500/20 rounded-full">
                    <Trophy className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Win Rate</p>
                    <p className="text-2xl font-bold">{winRate}%</p>
                    <p className="text-xs text-muted-foreground">
                      ({player.gamesWon} wins)
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-secondary/10">
                <CardContent className="p-4 flex items-center">
                  <div className="mr-4 p-2 bg-purple-500/20 rounded-full">
                    <Dna className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Player ID</p>
                    <p className="text-sm font-medium truncate">{player.id}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-secondary/10">
                <CardContent className="p-4 flex items-start justify-between gap-4">
                  <div className="flex items-center mr-2">
                    <div className="mr-4 p-2 bg-orange-500/20 rounded-full">
                      <Wallet className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Wallet</p>
                      <p className="text-sm font-medium break-all">
                        {player.walletAddress}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {player.walletBalance} ETH
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(player.walletAddress);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500 transition-all duration-200" />
                    ) : (
                      <ClipboardCopy className="h-4 w-4" />
                    )}
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerProfile;
