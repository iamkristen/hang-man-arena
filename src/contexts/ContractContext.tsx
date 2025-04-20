import React, { createContext, useContext, useEffect, useState } from "react";
declare global {
  interface Window {
    ethereum?: any;
  }
}
import { ethers, formatEther, parseEther } from "ethers";
import contractABI from "../abi/abi.json";

const CONTRACT_ADDRESS = "0xAbCbB8254461e4620c6112D811F36350DF293E2F";

const ContractContext = createContext(null);

export const ContractProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [balance, setBalance] = useState<string>("0.0000");
  const [player, setPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        console.error("MetaMask is not installed");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);

      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      setCurrentAccount(userAddress);

      const hangmanContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractABI,
        signer
      );

      setContract(hangmanContract);
      setIsLoading(false);

      const playerData = await hangmanContract.getPlayer(userAddress);
      setPlayer({
        id: userAddress,
        name: playerData.name,
        avatar: playerData.avatar,
        points: playerData.points,
        level: playerData.level,
        gamesPlayed: playerData.gamesPlayed,
        gamesWon: playerData.gamesWon,
      });

      await getBalance(provider, userAddress);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  const getBalance = async (provider, userAddress) => {
    try {
      const walletBalance = await provider.getBalance(userAddress);
      const formattedBalance = formatEther(walletBalance);
      setBalance(formattedBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
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
        value: parseEther(amount),
      });

      console.log("Transaction Hash: ", tx.hash);

      await tx.wait();

      await getBalance(provider, currentAccount);

      return tx.hash;
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <ContractContext.Provider
      value={{
        contract,
        currentAccount,
        balance,
        player,
        connectWallet,
        sendMoney,
        isLoading,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error("useContract must be used within a ContractProvider");
  }
  return context;
};
