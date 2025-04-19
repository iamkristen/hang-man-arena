
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePlayer } from "../contexts/PlayerContext";
import { toast } from "sonner";
import { Sparkle, Coins, Gift } from "lucide-react";

// Point packages that players can buy
const POINT_PACKAGES = [
  { id: "small", name: "Starter Pack", points: 500, price: "0.005 ETH", color: "from-blue-500 to-cyan-500" },
  { id: "medium", name: "Boost Pack", points: 1500, price: "0.01 ETH", color: "from-purple-500 to-indigo-500" },
  { id: "large", name: "Premium Pack", points: 5000, price: "0.025 ETH", color: "from-pink-500 to-rose-500" }
];

// NFT rewards that players can redeem
const NFT_REWARDS = [
  { id: "avatar1", name: "Rare Avatar", points: 2000, rarity: "Rare", color: "from-blue-500 to-cyan-500" },
  { id: "boost1", name: "Word Hint Boost", points: 1000, rarity: "Common", color: "from-green-500 to-emerald-500" },
  { id: "title1", name: "Crypto Master Title", points: 5000, rarity: "Epic", color: "from-orange-500 to-amber-500" }
];

const Marketplace: React.FC = () => {
  const { player, addPoints } = usePlayer();
  
  const handleBuyPoints = (packageId: string) => {
    // In a real app, this would initiate a blockchain transaction
    const pkg = POINT_PACKAGES.find(p => p.id === packageId);
    if (pkg) {
      toast.success(`Successfully purchased ${pkg.name}!`, {
        description: `Added ${pkg.points} points to your account`
      });
      
      // Simulate adding points to the player
      addPoints(pkg.points);
    }
  };
  
  const handleRedeemNFT = (nftId: string) => {
    const nft = NFT_REWARDS.find(n => n.id === nftId);
    if (nft && player) {
      if (player.points >= nft.points) {
        // Simulate NFT redemption
        toast.success(`Successfully redeemed ${nft.name}!`, {
          description: `The NFT has been added to your collection`
        });
        
        // Deduct points for the NFT
        addPoints(-nft.points);
      } else {
        toast.error(`Not enough points to redeem ${nft.name}`);
      }
    }
  };
  
  return (
    <Card className="w-full mx-auto bg-card/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Marketplace</CardTitle>
        <CardDescription>
          Buy point packages and redeem rewards
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Player's current points */}
          {player && (
            <div className="bg-secondary/10 p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Your Points</p>
                <p className="text-2xl font-bold">{player.points}</p>
              </div>
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-full">
                <Coins className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
          
          {/* Point Packages */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Coins className="mr-2 h-5 w-5" /> Point Packages
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {POINT_PACKAGES.map((pkg) => (
                <Card key={pkg.id} className="bg-secondary/10 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${pkg.color}`} />
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <CardDescription>{pkg.points} Points</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{pkg.price}</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleBuyPoints(pkg.id)}
                      className={`w-full bg-gradient-to-r ${pkg.color}`}
                    >
                      Buy Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          {/* NFT Rewards */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Gift className="mr-2 h-5 w-5" /> NFT Rewards
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {NFT_REWARDS.map((nft) => (
                <Card key={nft.id} className="bg-secondary/10 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${nft.color}`} />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{nft.name}</CardTitle>
                      <span className="text-xs bg-secondary/30 px-2 py-0.5 rounded-full">
                        {nft.rarity}
                      </span>
                    </div>
                    <CardDescription className="flex items-center">
                      <Sparkle className="h-4 w-4 mr-1 text-amber-500" />
                      {nft.points} Points
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-24 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-md flex items-center justify-center">
                      <span className="text-3xl">🏆</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleRedeemNFT(nft.id)}
                      className={`w-full bg-gradient-to-r ${nft.color}`}
                      disabled={player && player.points < nft.points}
                    >
                      {player && player.points >= nft.points ? "Redeem Now" : "Not Enough Points"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Marketplace;
