import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePlayer } from "../contexts/PlayerContext";
import { toast } from "sonner";
import { Sparkle, Coins, Gift } from "lucide-react";
import { ethers, parseEther } from "ethers";
declare global {
  interface Window {
    ethereum?: any;
  }
}

const POINT_PACKAGES = [
  {
    id: "small",
    name: "Starter Pack",
    points: 500,
    price: "0.005 WND",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "medium",
    name: "Boost Pack",
    points: 1500,
    price: "0.01 WND",
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: "large",
    name: "Premium Pack",
    points: 5000,
    price: "0.025 WND",
    color: "from-pink-500 to-rose-500",
  },
];

const NFT_REWARDS = [
  {
    id: "avatar1",
    name: "Rare Avatar",
    points: 2000,
    rarity: "Rare",
    color: "from-blue-500 to-cyan-500",
    image: "/avatar-3.png",
  },
  {
    id: "boost1",
    name: "Word Hint Boost",
    points: 1000,
    rarity: "Common",
    color: "from-green-500 to-emerald-500",
    image: "/avatar-1.png",
  },
  {
    id: "title1",
    name: "Crypto Master Title",
    points: 5000,
    rarity: "Epic",
    color: "from-orange-500 to-amber-500",
    image: "/avatar-2.png",
  },
];

const Marketplace: React.FC = () => {
  const { player, addPointsAndRecordGame } = usePlayer();
  const [sendAmount, setSendAmount] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleBuyPoints = async (packageId: string) => {
    const pkg = POINT_PACKAGES.find((p) => p.id === packageId);
    if (pkg) {
      const amount = parseEther(pkg.price.split(" ")[0]);
      const recipientAddress = "0xa0DD2Bccd31ce119e5a9E8729441c1B5C41d2858";

      try {
        setIsSending(true);
        const txHash = await sendMoney(recipientAddress, amount);
        if (txHash) {
          toast.success(`Successfully purchased ${pkg.name}!`, {
            description: `Added ${pkg.points} points to your account`,
          });
          addPointsAndRecordGame(pkg.points, false);
        }
      } catch (error) {
        console.error("Error purchasing points:", error);
        toast.error("Transaction failed");
      } finally {
        setIsSending(false);
      }
    }
  };

  const sendMoney = async (toAddress, amount) => {
    if (!window.ethereum) {
      console.error("MetaMask is not available");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();

    try {
      const tx = await (
        await signer
      ).sendTransaction({
        to: toAddress,
        value: amount,
      });

      console.log("Transaction Hash: ", tx.hash);
      await tx.wait();

      return tx.hash;
    } catch (error) {
      console.error("Error sending WND:", error);
      toast.error("Error sending WND");
    }
  };

  function handleRedeemNFT(id: string): void {
    const nft = NFT_REWARDS.find((n) => n.id === id);
    if (nft && player) {
      if (player.points >= nft.points) {
        addPointsAndRecordGame(-nft.points, true);
        toast.success(`Successfully redeemed ${nft.name}!`, {
          description: `NFT has been added to your collection`,
        });
      } else {
        toast.error(`Not enough points to redeem ${nft.name}`);
      }
    }
  }

  return (
    <Card className="w-full mx-auto bg-card/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Marketplace</CardTitle>
        <CardDescription>Buy point packages and redeem rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
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
                      disabled={isSending}
                    >
                      {isSending ? "Processing..." : "Buy Now"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

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
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="h-20 w-20 object-cover"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => handleRedeemNFT(nft.id)}
                      className={`w-full bg-gradient-to-r ${nft.color}`}
                      disabled={player && player.points < nft.points}
                    >
                      {player && player.points >= nft.points
                        ? "Redeem Now"
                        : "Not Enough Points"}
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
