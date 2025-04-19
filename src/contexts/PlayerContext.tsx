import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sonner";
import {
  connectWallet,
  getBalance,
  addWalletListener,
} from "../utils/walletUtils";
import { calculateLevel } from "../utils/gameUtils";

// Available avatars for player selection
export const AVATARS = [
  "/avatar-1.png",
  "/avatar-2.png",
  "/avatar-3.png",
  "/avatar-4.png",
  "/avatar-5.png",
  "/avatar-6.png",
];

// Player profile interface
export interface PlayerProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  walletAddress: string;
  walletBalance: string;
  points: number;
  level: number;
  gamesPlayed: number;
  gamesWon: number;
}

interface PlayerContextType {
  player: PlayerProfile | null;
  players: PlayerProfile[];
  isConnected: boolean;
  isProfileComplete: boolean;
  connectPlayerWallet: () => Promise<void>;
  updatePlayerProfile: (data: Partial<PlayerProfile>) => void;
  completePlayerProfile: (name: string, email: string, avatar: string) => void;
  addPoints: (points: number) => void;
  recordGamePlayed: (won: boolean) => void;
  searchPlayers: (query: string) => PlayerProfile[];
  getPlayerById: (id: string) => PlayerProfile | undefined;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Mock data for other players
const mockPlayers: PlayerProfile[] = [
  {
    id: "player1",
    name: "CryptoKing",
    email: "crypto@example.com",
    avatar: "/avatar-1.png",
    walletAddress: "0x1234...5678",
    walletBalance: "1.243",
    points: 1250,
    level: 5,
    gamesPlayed: 25,
    gamesWon: 18,
  },
  {
    id: "player2",
    name: "BlockchainQueen",
    email: "queen@example.com",
    avatar: "/avatar-2.png",
    walletAddress: "0x8765...4321",
    walletBalance: "0.876",
    points: 980,
    level: 4,
    gamesPlayed: 19,
    gamesWon: 12,
  },
  {
    id: "player3",
    name: "TokenMaster",
    email: "master@example.com",
    avatar: "/avatar-3.png",
    walletAddress: "0xabcd...efgh",
    walletBalance: "2.321",
    points: 1890,
    level: 7,
    gamesPlayed: 32,
    gamesWon: 23,
  },
];

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [player, setPlayer] = useState<PlayerProfile | null>(null);
  const [players] = useState<PlayerProfile[]>(mockPlayers);
  const [isConnected, setIsConnected] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  // Attempt to load player data from localStorage on mount
  useEffect(() => {
    const savedPlayer = localStorage.getItem("playerProfile");
    if (savedPlayer) {
      const parsedPlayer = JSON.parse(savedPlayer);
      setPlayer(parsedPlayer);
      setIsConnected(!!parsedPlayer.walletAddress);
      setIsProfileComplete(!!parsedPlayer.name && !!parsedPlayer.email);

      // Refresh wallet balance
      if (parsedPlayer.walletAddress) {
        getBalance(parsedPlayer.walletAddress).then((balance) => {
          updatePlayerProfile({ walletBalance: balance });
        });
      }
    }

    // Add wallet change listener
    addWalletListener((accounts) => {
      if (accounts.length === 0) {
        // User disconnected wallet
        setIsConnected(false);
        toast.error("Wallet disconnected");
      } else if (player && accounts[0] !== player.walletAddress) {
        // User changed wallet
        updatePlayerProfile({ walletAddress: accounts[0] });
        toast.info("Wallet changed");
      }
    });
  }, []);

  // Save player data to localStorage whenever it changes
  useEffect(() => {
    if (player) {
      localStorage.setItem("playerProfile", JSON.stringify(player));
    }
  }, [player]);

  // Connect player wallet
  const connectPlayerWallet = async () => {
    try {
      const address = await connectWallet();
      if (address) {
        const balance = await getBalance(address);

        if (player) {
          // Update existing player
          updatePlayerProfile({
            walletAddress: address,
            walletBalance: balance,
          });
        } else {
          // Create new player with wallet info
          setPlayer({
            id: `player-${Date.now()}`,
            name: "",
            email: "",
            avatar: AVATARS[0],
            walletAddress: address,
            walletBalance: balance,
            points: 0,
            level: 1,
            gamesPlayed: 0,
            gamesWon: 0,
          });
        }

        setIsConnected(true);
        toast.success("Wallet connected successfully!");
      }
    } catch (error) {
      toast.error("Failed to connect wallet");
      console.error(error);
    }
  };

  // Update player profile with partial data
  const updatePlayerProfile = (data: Partial<PlayerProfile>) => {
    if (player) {
      setPlayer((prev) => {
        if (!prev) return null;
        return { ...prev, ...data };
      });
    }
  };

  // Complete player profile after wallet connection
  const completePlayerProfile = (
    name: string,
    email: string,
    avatar: string
  ) => {
    if (player) {
      updatePlayerProfile({ name, email, avatar });
      setIsProfileComplete(true);
      toast.success("Profile created successfully!");
    }
  };

  // Add points to player and recalculate level
  const addPoints = (points: number) => {
    if (player) {
      const newPoints = player.points + points;
      const newLevel = calculateLevel(newPoints);

      updatePlayerProfile({
        points: newPoints,
        level: newLevel,
      });

      toast.success(`Earned ${points} points!`);

      if (newLevel > player.level) {
        toast.success(`Leveled up to ${newLevel}!`, {
          duration: 5000,
          className:
            "bg-gradient-to-r from-purple-600 to-indigo-600 text-white",
        });
      }
    }
  };

  // Record game played and update stats
  const recordGamePlayed = (won: boolean) => {
    if (player) {
      updatePlayerProfile({
        gamesPlayed: player.gamesPlayed + 1,
        gamesWon: won ? player.gamesWon + 1 : player.gamesWon,
      });
    }
  };

  // Search players by name, email or wallet address
  const searchPlayers = (query: string): PlayerProfile[] => {
    if (!query) return players;

    const lowerCaseQuery = query.toLowerCase();
    return players.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerCaseQuery) ||
        p.email.toLowerCase().includes(lowerCaseQuery) ||
        p.walletAddress.toLowerCase().includes(lowerCaseQuery)
    );
  };

  // Get player by ID
  const getPlayerById = (id: string): PlayerProfile | undefined => {
    return players.find((p) => p.id === id);
  };

  return (
    <PlayerContext.Provider
      value={{
        player,
        players,
        isConnected,
        isProfileComplete,
        connectPlayerWallet,
        updatePlayerProfile,
        completePlayerProfile,
        addPoints,
        recordGamePlayed,
        searchPlayers,
        getPlayerById,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

// Hook to use the player context
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
