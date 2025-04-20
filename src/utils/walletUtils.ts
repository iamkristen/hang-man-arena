

export const isMetaMaskInstalled = (): boolean => {
  return typeof window !== "undefined" && window.ethereum !== undefined;
};

export const connectWallet = async (): Promise<string | null> => {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed");
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0];
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
    return null;
  }
};

export const getBalance = async (address: string): Promise<string> => {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed");
  }

  try {
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"],
    });
    
    const balanceInEth = parseInt(balance, 16) / 1e18;
    return balanceInEth.toFixed(4);
  } catch (error) {
    console.error("Error getting balance:", error);
    return "0";
  }
};

export const transferTokens = async (toAddress: string, amount: string): Promise<string | null> => {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed");
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const fromAddress = accounts[0];
    
    const amountInWei = (parseFloat(amount) * 1e18).toString(16);
    
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [{
        from: fromAddress,
        to: toAddress,
        value: "0x" + amountInWei, 
        gas: "0x5208", 
      }],
    });
    
    return txHash;
  } catch (error) {
    console.error("Error transferring tokens:", error);
    return null;
  }
};

export const addWalletListener = (callback: (accounts: string[]) => void): void => {
  if (!isMetaMaskInstalled()) {
    return;
  }

  window.ethereum.on("accountsChanged", callback);
};


declare global {
  interface Window {
    ethereum?: any; 
  }
}
