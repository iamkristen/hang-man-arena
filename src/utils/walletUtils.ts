
// Check if MetaMask is installed
export const isMetaMaskInstalled = (): boolean => {
  return typeof window !== "undefined" && window.ethereum !== undefined;
};

// Connect to MetaMask wallet
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

// Get account balance
export const getBalance = async (address: string): Promise<string> => {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed");
  }

  try {
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"],
    });
    
    // Convert from wei to eth (balance is in hex)
    const balanceInEth = parseInt(balance, 16) / 1e18;
    return balanceInEth.toFixed(4);
  } catch (error) {
    console.error("Error getting balance:", error);
    return "0";
  }
};

// Transfer tokens to another address
export const transferTokens = async (toAddress: string, amount: string): Promise<string | null> => {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed");
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const fromAddress = accounts[0];
    
    // Convert ETH to wei
    const amountInWei = (parseFloat(amount) * 1e18).toString(16);
    
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [{
        from: fromAddress,
        to: toAddress,
        value: "0x" + amountInWei, // hex format
        gas: "0x5208", // 21000 gas
      }],
    });
    
    return txHash;
  } catch (error) {
    console.error("Error transferring tokens:", error);
    return null;
  }
};

// Add wallet events listener
export const addWalletListener = (callback: (accounts: string[]) => void): void => {
  if (!isMetaMaskInstalled()) {
    return;
  }

  window.ethereum.on("accountsChanged", callback);
};

// Declare window ethereum property
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (args: any) => void) => void;
    };
  }
}
