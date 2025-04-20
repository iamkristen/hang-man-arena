import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Gamepad2,
  Wallet,
  Coins,
  Trophy,
  Shield,
} from "lucide-react";
import { usePlayer } from "../contexts/PlayerContext";

const Index = () => {
  const { isConnected, isProfileComplete, players, fetchAllPlayers } =
    usePlayer();
  const [sortedPlayers, setSortedPlayers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllPlayers();
      setSortedPlayers(players.sort((a: any, b: any) => b.level - a.level));
    };

    fetchData();
  }, [players, fetchAllPlayers]);

  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 container relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 py-4 bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-pulse">
            Crypto Hangman Arena
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
            Connect your wallet, guess the crypto words, and earn points to
            redeem exclusive NFTs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isConnected ? (
              <Link to="/game">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                >
                  <Wallet className="mr-2 h-5 w-5" /> Connect Wallet to Play
                </Button>
              </Link>
            ) : !isProfileComplete ? (
              <Link to="/game">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                >
                  <Shield className="mr-2 h-5 w-5" /> Complete Your Profile
                </Button>
              </Link>
            ) : (
              <Link to="/game">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                >
                  <Gamepad2 className="mr-2 h-5 w-5" /> Play Now
                </Button>
              </Link>
            )}
            <Link to="/marketplace">
              <Button size="lg" variant="outline">
                <Wallet className="mr-2 h-5 w-5" /> Visit Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/5">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            🌟 Top Crypto Warriors
          </h2>
          <div className="flex justify-center overflow-x-auto gap-6 scroll-smooth scrollbar-hide px-6 pb-4 pt-6">
            {sortedPlayers.map((player, index) => {
              let glow = "";
              if (index === 0) glow = "ring-4 ring-yellow-400";
              else if (index === 1) glow = "ring-4 ring-gray-300";
              else if (index === 2) glow = "ring-4 ring-orange-500";

              return (
                <div key={player.id} className="flex-shrink-0">
                  <Card
                    className={`bg-card/50 backdrop-blur border-secondary/20 w-72 shadow-lg hover:scale-105 transition-transform duration-300 ${glow}`}
                  >
                    <CardContent className="p-6 flex items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-6 border-2 border-primary">
                        <img
                          src={player.avatar || "/default-avatar.png"}
                          alt={`${player.name}'s Avatar`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1 text-foreground">
                          {player.name}
                        </h3>
                        <div className="flex flex-col gap-1">
                          <span className="level-badge">
                            Level {player.level}
                          </span>
                          <span className="points-badge">
                            Points: {player.points}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/5">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Game Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card/50 backdrop-blur border-secondary/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center mb-4">
                  <Gamepad2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Play & Earn</h3>
                <p className="text-muted-foreground">
                  Guess crypto-themed words correctly to win points and climb
                  the leaderboard.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur border-secondary/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/30 to-amber-500/30 flex items-center justify-center mb-4">
                  <Wallet className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Web3 Integration</h3>
                <p className="text-muted-foreground">
                  Connect your MetaMask wallet to authenticate and send tokens
                  to other players.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur border-secondary/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex items-center justify-center mb-4">
                  <Coins className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">NFT Rewards</h3>
                <p className="text-muted-foreground">
                  Redeem your earned points for exclusive NFT rewards in the
                  marketplace.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 container">
        <Card className="bg-gradient-to-r from-secondary/20 to-primary/20 border-0 overflow-hidden">
          <CardContent className="p-8 md:p-12 relative">
            <div className="max-w-2xl relative z-10">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Test Your Crypto Knowledge?
              </h2>
              <p className="text-lg mb-6">
                Connect your wallet, start guessing words, and earn crypto
                points today!
              </p>
              <Link to="/game">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                >
                  Start Playing <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none">
              <Trophy className="w-48 h-48 text-primary" />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
