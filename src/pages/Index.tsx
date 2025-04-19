import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePlayer } from "../contexts/PlayerContext";
import {
  ArrowRight,
  Wallet,
  Gamepad2,
  Coins,
  Trophy,
  Shield,
} from "lucide-react";

const Index = () => {
  const { isConnected, isProfileComplete } = usePlayer();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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
                <ShoppingBag className="mr-2 h-5 w-5" /> Visit Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-secondary/5">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Game Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
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

            {/* Feature 2 */}
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

            {/* Feature 3 */}
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

      {/* Call to Action */}
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

// Additional components used in the Index page
const ShoppingBag: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
