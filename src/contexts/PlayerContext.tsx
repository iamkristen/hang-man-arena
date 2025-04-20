import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sonner";
import { calculateLevel } from "../utils/gameUtils";
import { useContract } from "../contexts/ContractContext";

export const AVATARS = [
  "/avatar-1.png",
  "/avatar-2.png",
  "/avatar-3.png",
  "/avatar-4.png",
  "/avatar-5.png",
  "/avatar-6.png",
];

export interface PlayerProfile {
  id: string;
  name: string;
  avatar: string;
  walletAddress: string;
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
  disconnectPlayerWallet: () => void;
  updatePlayerProfile: (data: Partial<PlayerProfile>) => void;
  completePlayerProfile: (name: string, avatar: string) => void;
  addPointsAndRecordGame: (points: number, won: boolean) => void;
  fetchAllPlayers: () => Promise<void>;
  searchPlayers: (query: string) => PlayerProfile[];
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { contract, currentAccount, connectWallet } = useContract();
  const [player, setPlayer] = useState<PlayerProfile | null>(null);
  const [players, setPlayers] = useState<PlayerProfile[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    const fetchPlayerFromContract = async () => {
      if (contract && currentAccount) {
        try {
          const data = await contract.getPlayer(currentAccount);
          const fetched = {
            id: currentAccount,
            name: data.name,
            avatar: data.avatar,
            walletAddress: currentAccount,
            points: Number(data.points),
            level: Number(data.level),
            gamesPlayed: Number(data.gamesPlayed),
            gamesWon: Number(data.gamesWon),
          };
          setPlayer(fetched);
          setIsConnected(true);
          setIsProfileComplete(!!fetched.name && !!fetched.avatar);
        } catch (err: any) {
          toast.info("No profile found. Please complete your player profile.");
          setPlayer({
            id: currentAccount,
            name: "",
            avatar: AVATARS[0],
            walletAddress: currentAccount,
            points: 0,
            level: 1,
            gamesPlayed: 0,
            gamesWon: 0,
          });
          setIsConnected(true);
          setIsProfileComplete(false);
        }
      }
    };

    fetchPlayerFromContract();
  }, [contract, currentAccount]);

  const fetchAllPlayers = async () => {
    if (!contract) return;
    try {
      const addresses: string[] = await contract.getAllPlayers();
      const playerDataPromises = addresses.map(async (address) => {
        const data = await contract.getPlayer(address);
        return {
          id: address,
          name: data.name,
          avatar: data.avatar,
          walletAddress: address,
          points: Number(data.points),
          level: Number(data.level),
          gamesPlayed: Number(data.gamesPlayed),
          gamesWon: Number(data.gamesWon),
        };
      });
      const allPlayers = await Promise.all(playerDataPromises);
      setPlayers(allPlayers);
    } catch (error) {
      console.error("Error fetching players:", error);
      toast.error("Failed to fetch player list.");
    }
  };

  const searchPlayers = (query: string): PlayerProfile[] => {
    const lower = query.toLowerCase();
    return players.filter(
      (p) =>
        p.walletAddress.toLowerCase() !== currentAccount?.toLowerCase() &&
        (p.name.toLowerCase().includes(lower) ||
          p.walletAddress.toLowerCase().includes(lower))
    );
  };

  const connectPlayerWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      toast.error("Failed to connect wallet");
    }
  };

  const disconnectPlayerWallet = () => {
    setPlayer(null);
    setIsConnected(false);
    setIsProfileComplete(false);
  };

  const updatePlayerProfile = (data: Partial<PlayerProfile>) => {
    if (player) {
      const updated = { ...player, ...data };
      setPlayer(updated);
      if (contract && currentAccount) {
        contract.createOrUpdatePlayer(
          updated.name,
          updated.avatar,
          updated.points,
          updated.level,
          updated.gamesPlayed,
          updated.gamesWon
        );
      }
    }
  };

  const completePlayerProfile = (name: string, avatar: string) => {
    if (player) {
      updatePlayerProfile({ name, avatar });
      setIsProfileComplete(true);
      toast.success("Profile created successfully!");
    }
  };

  const addPointsAndRecordGame = (points: number, won: boolean) => {
    if (player) {
      const newPoints = player.points + points;
      const newLevel = calculateLevel(newPoints);
      const newGamesPlayed = player.gamesPlayed + 1;
      const newGamesWon = won ? player.gamesWon + 1 : player.gamesWon;

      updatePlayerProfile({
        points: newPoints,
        level: newLevel,
        gamesPlayed: newGamesPlayed,
        gamesWon: newGamesWon,
      });

      if (points > 0) {
        toast.success(`Earned ${points} points!`);
      }

      if (newLevel > player.level) {
        toast.success(`Leveled up to ${newLevel}!`, {
          duration: 5000,
          className:
            "bg-gradient-to-r from-purple-600 to-indigo-600 text-white",
        });
      }
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        player,
        players,
        isConnected,
        isProfileComplete,
        connectPlayerWallet,
        disconnectPlayerWallet,
        updatePlayerProfile,
        completePlayerProfile,
        addPointsAndRecordGame,
        fetchAllPlayers,
        searchPlayers,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
