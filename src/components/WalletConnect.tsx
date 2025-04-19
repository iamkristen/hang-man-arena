
import React from "react";
import { Button } from "@/components/ui/button";
import { usePlayer } from "../contexts/PlayerContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { isMetaMaskInstalled } from "../utils/walletUtils";
import { Wallet } from "lucide-react";

const WalletConnect: React.FC = () => {
  const { connectPlayerWallet } = usePlayer();

  const handleConnectWallet = () => {
    connectPlayerWallet();
  };

  const openMetaMaskSite = () => {
    window.open("https://metamask.io/", "_blank");
  };

  return (
    <Card className="max-w-md w-full mx-auto bg-card/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Connect Your Wallet</CardTitle>
        <CardDescription className="text-center">
          Connect your MetaMask wallet to start playing Crypto Hangman
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
          <Wallet className="w-12 h-12 text-white" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">Why connect a wallet?</h3>
          <p className="text-muted-foreground">
            Connecting your wallet allows you to:
          </p>
          <ul className="text-sm text-left space-y-1">
            <li>• Save your game progress</li>
            <li>• Earn and store crypto points</li>
            <li>• Send tokens to other players</li>
            <li>• Participate in the marketplace</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        {isMetaMaskInstalled() ? (
          <Button
            onClick={handleConnectWallet}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
          >
            <Wallet className="mr-2 h-5 w-5" /> Connect MetaMask
          </Button>
        ) : (
          <>
            <p className="text-center text-sm text-muted-foreground mb-2">
              MetaMask extension not detected
            </p>
            <Button
              onClick={openMetaMaskSite}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
            >
              Install MetaMask
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default WalletConnect;
