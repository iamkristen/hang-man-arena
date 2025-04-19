
// Game words by difficulty with hints
export const wordCategories = {
  easy: [
    { word: "CRYPTO", hint: "Digital or virtual currency" },
    { word: "WALLET", hint: "Stores your digital assets" },
    { word: "TOKEN", hint: "Digital unit of value" },
    { word: "CHAIN", hint: "Series of connected blocks" },
    { word: "BLOCK", hint: "Container of transaction data" },
    { word: "DAPP", hint: "Decentralized application" },
    { word: "COINS", hint: "Digital currency units" },
    { word: "NODES", hint: "Network participants" },
    { word: "MINER", hint: "Creates new blocks" },
    { word: "TRADE", hint: "Exchange of assets" }
  ],
  medium: [
    { word: "BITCOIN", hint: "First cryptocurrency" },
    { word: "ETHEREUM", hint: "Platform for smart contracts" },
    { word: "POLYGON", hint: "Layer 2 scaling solution" },
    { word: "SOLANA", hint: "High-speed blockchain" },
    { word: "CARDANO", hint: "Proof of stake blockchain" },
    { word: "AVALANCHE", hint: "Fast finality blockchain" },
    { word: "POLKADOT", hint: "Multi-chain network" },
    { word: "CHAINLINK", hint: "Decentralized oracle network" },
    { word: "COSMOS", hint: "Internet of blockchains" },
    { word: "ARBITRUM", hint: "Ethereum scaling solution" }
  ],
  hard: [
    { word: "DECENTRALIZED", hint: "Not controlled by a single entity" },
    { word: "CRYPTOCURRENCY", hint: "Digital or virtual currency" },
    { word: "TOKENOMICS", hint: "Token economics" },
    { word: "TRANSACTION", hint: "Transfer of value" },
    { word: "CONSENSUS", hint: "Agreement mechanism" },
    { word: "VALIDATOR", hint: "Network security participant" },
    { word: "LIQUIDITY", hint: "Asset availability for trading" },
    { word: "GOVERNANCE", hint: "Decision making system" },
    { word: "PROTOCOL", hint: "Set of rules and procedures" },
    { word: "SIGNATURE", hint: "Cryptographic proof of ownership" }
  ]
};

// Returns a random word from the selected difficulty
export const getRandomWord = (difficulty: keyof typeof wordCategories): { word: string; hint: string } => {
  const words = wordCategories[difficulty];
  return words[Math.floor(Math.random() * words.length)];
};

// Create initial state for the word display
export const createInitialWordState = (word: string): (string | null)[] => {
  const wordState = Array(word.length).fill(null);
  
  // Show approximately 25% of letters (at least 1)
  const lettersToShow = Math.max(1, Math.floor(word.length * 0.25));
  
  // Get random indices to show
  const indices = new Set<number>();
  while (indices.size < lettersToShow) {
    indices.add(Math.floor(Math.random() * word.length));
  }
  
  // Fill in the letters at those indices
  for (const index of indices) {
    wordState[index] = word[index];
  }
  
  return wordState;
};

// Maximum number of wrong guesses allowed
export const MAX_WRONG_GUESSES = 6;

// Time limits for different difficulties (in seconds)
export const DIFFICULTY_SETTINGS = {
  easy: {
    timeLimit: null,
    pointsPenalty: 0
  },
  medium: {
    timeLimit: 120, // 2 minutes
    pointsPenalty: 0
  },
  hard: {
    timeLimit: null,
    pointsPenalty: 2 // Points deducted per second
  }
};

// Calculate points based on difficulty, wrong guesses, and time
export const calculatePoints = (
  difficulty: keyof typeof wordCategories,
  wrongGuesses: number,
  timeSeconds: number
): number => {
  const basePoints = {
    easy: 100,
    medium: 200,
    hard: 300
  };

  let points = basePoints[difficulty];

  // Deduct points for wrong guesses
  const wrongGuessDeduction = wrongGuesses * 10;
  points -= wrongGuessDeduction;

  // Apply time-based penalties for medium and hard difficulties
  if (difficulty === 'medium') {
    const timeLimit = DIFFICULTY_SETTINGS.medium.timeLimit!;
    if (timeSeconds > timeLimit) {
      points = Math.floor(points * 0.5); // 50% penalty for exceeding time limit
    }
  } else if (difficulty === 'hard') {
    // Deduct points based on time taken
    const timeDeduction = timeSeconds * DIFFICULTY_SETTINGS.hard.pointsPenalty;
    points -= timeDeduction;
  }

  // Ensure minimum points
  return Math.max(20, points);
};

// Calculate level based on total points
export const calculateLevel = (totalPoints: number): number => {
  return Math.floor(totalPoints / 300) + 1;
};
