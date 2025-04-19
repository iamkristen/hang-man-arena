import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { usePlayer, PlayerProfile } from "../contexts/PlayerContext";
import { Search, Send } from "lucide-react";
import { transferTokens } from "../utils/walletUtils";
import { toast } from "sonner";

const PlayersDirectory: React.FC = () => {
  const { players, searchPlayers } = usePlayer();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlayers, setFilteredPlayers] =
    useState<PlayerProfile[]>(players);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerProfile | null>(
    null
  );
  const [sendAmount, setSendAmount] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredPlayers(searchPlayers(query));
  };

  const openSendDialog = (player: PlayerProfile) => {
    setSelectedPlayer(player);
    setIsDialogOpen(true);
  };

  const handleSendTokens = async () => {
    if (!selectedPlayer || !sendAmount) return;
    setIsSending(true);
    try {
      const amount = parseFloat(sendAmount);
      if (isNaN(amount) || amount <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }
      const txHash = await transferTokens(
        selectedPlayer.walletAddress,
        sendAmount
      );
      if (txHash) {
        toast.success(
          `Successfully sent ${sendAmount} ETH to ${selectedPlayer.name}`
        );
        setIsDialogOpen(false);
        setSendAmount("");
      } else {
        toast.error("Transaction failed");
      }
    } catch (error) {
      console.error("Error sending tokens:", error);
      toast.error("Error sending tokens");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="w-full mx-auto bg-card/80 backdrop-blur">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold">Players Directory</CardTitle>
        <CardDescription>
          View other players and interact with them
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search players by name, email or wallet address..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
        <div className="space-y-4">
          {filteredPlayers.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No players found
            </p>
          ) : (
            filteredPlayers.map((player) => (
              <Card key={player.id} className="bg-secondary/10">
                <CardContent className="p-4 flex items-center">
                  <div className="relative mr-4 w-12 h-12 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                    {player.avatar ? (
                      <img
                        src={player.avatar}
                        alt={`${player.name}'s Avatar`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 absolute flex items-center justify-center">
                        <span className="text-xl">👾</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold truncate">{player.name}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {player.email}
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <span className="level-badge text-xs py-0.5">
                            Level {player.level}
                          </span>
                          <span className="points-badge text-xs py-0.5">
                            {player.points} pts
                          </span>
                        </div>
                      </div>
                      <Dialog
                        open={isDialogOpen && selectedPlayer?.id === player.id}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="ml-2 flex-shrink-0"
                            onClick={() => openSendDialog(player)}
                          >
                            <Send className="h-4 w-4 mr-1" /> Send
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Send Tokens to {selectedPlayer?.name}
                            </DialogTitle>
                            <DialogDescription>
                              Send ETH tokens to this player as a gift or
                              reward.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="flex items-center">
                              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary mr-4 flex-shrink-0">
                                {selectedPlayer?.avatar ? (
                                  <img
                                    src={selectedPlayer.avatar}
                                    alt={`${selectedPlayer.name}'s Avatar`}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center">
                                    <span className="text-xl">👾</span>
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-medium">
                                  {selectedPlayer?.name}
                                </p>
                                <p className="text-sm text-muted-foreground truncate">
                                  {selectedPlayer?.walletAddress}
                                </p>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-1 block">
                                Amount (ETH)
                              </label>
                              <Input
                                type="number"
                                placeholder="0.001"
                                value={sendAmount}
                                onChange={(e) => setSendAmount(e.target.value)}
                                step="0.001"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleSendTokens}
                              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                              disabled={isSending}
                            >
                              {isSending ? "Sending..." : "Send Tokens"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayersDirectory;
