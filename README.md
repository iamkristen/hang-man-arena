# Crypto Hangman Game

Crypto Hangman is a decentralized game where players can connect their MetaMask wallet, earn game points, buy point packages, redeem rewards, and compete with other players. This game integrates blockchain technology to ensure fairness, security, and transparency in transactions, allowing users to earn rewards and send tokens using the Polkadot network.

🔗 Live Demo

🟢 Play the Game Now → https://hangman-arena.netlify.app

Jump in, connect your wallet, guess the crypto words, and compete on the leaderboard! 🧠🏆

## Features

- **MetaMask Wallet Integration**: Players can connect their MetaMask wallet to participate in the game.
- **Blockchain-backed Scoring**: All player progress, points, and level are stored on the blockchain, ensuring secure and immutable records.
- **Marketplace**: Players can buy point packages using cryptocurrency, allowing them to boost their progress.
- **NFT Rewards**: Players can redeem NFTs as rewards after earning enough points.
- **Send crypto**: Players can send crypto as gift to other players within the game, enabling a community-driven experience.
- **Real-time Updates**: Players' balances and progress are updated in real-time on the blockchain.

## Tech Stack

1. **React.js**: Used for building the frontend interface and managing the game's state.
2. **Polkadot**: The blockchain platform powering the game's transactions. Polkadot ensures interoperability and scalability for decentralized applications (DApps).
3. **Westend Network**: A testnet for Polkadot, used for deploying the smart contracts in a non-production environment.
4. **Polkadot remix IDE**: Used for writing, testing, and deploying Solidity smart contracts. Remix allows for the development of Ethereum-compatible smart contracts.
5. **MetaMask**: The browser extension that enables players to interact with the Ethereum blockchain and store their assets securely.
6. **Ethers.js**: JavaScript library used to interact with the Ethereum blockchain, handling wallet connections, transactions, and balance fetching.

## How It Works

### Gameplay

- **Connect Wallet**: Players must connect their MetaMask wallet to start playing the game. This allows players to save their progress and earn rewards.
- **Earn Points**: Players earn points by guessing the correct words in the Hangman game. The more points they accumulate, the more rewards they can redeem.
- **Purchase Point Packages**: Players can purchase game point packages using cryptocurrency. The points are added to their account, which can then be used to redeem rewards or boost progress.
- **Redeem Rewards**: Players can redeem various NFT rewards after accumulating enough points. These NFTs are stored on the blockchain, making them verifiable and collectible.
- **Send crypto**: Players can send their crypto balance from wallet to other players in the game, enabling social interaction and rewarding others.

### Smart Contract

The game uses a smart contract to store critical information such as:

- Player balances
- Purchased/earn point packages
- Redeemed rewards
- Player statistics

### Blockchain Features

- **Polkadot Network**: The game leverages Polkadot's decentralized platform for secure transactions, ensuring that no central authority controls the game data. Transactions, such as purchasing point packages or sending tokens, are processed on the Polkadot blockchain.
- **Westend Testnet**: Westend serves as the testnet for the Polkadot blockchain, providing a safe environment for testing and deploying smart contracts before using the main network.

## Running the Game Locally

### Prerequisites

1. Install [MetaMask](https://metamask.io/) and set up an account and use westend server.
2. Install [Node.js](https://nodejs.org/) (version 22.x or higher).

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/iamkristen/hang-man-arena.git
   cd crypto-hangman-arena
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Connect your MetaMask wallet**:
   - Open MetaMask and connect to the Westend testnet.
   - Link your wallet to the game interface when prompted.

5. **Interact with the game**:
   - Connect your wallet to the game interface.
   - Start playing by guessing words, buying point packages, and redeeming rewards.

### Deployment

1. **Deploying the smart contract**:
   - Write your contract code using polkadot Remix IDE.
   - Deploy the smart contract to the Westend testnet for testing.
   - Once tested, deploy it to Polkadot’s mainnet for production use.

2. **Hosting the frontend**:
   - Host the frontend on a web hosting platform like Vercel, Netlify, or GitHub Pages.
   - Ensure that the site is connected to the Polkadot blockchain and the smart contract.

## How to Interact with the Blockchain

### Sending Tokens

To send tokens, the player must:

1. Connect their wallet using MetaMask.
2. Select the amount of tokens to send.
3. Confirm the transaction via the MetaMask popup.
4. The transaction is processed on the Polkadot blockchain, ensuring the transfer is secure and immutable.

### Fetching Player Balance

The player’s balance is fetched using the `ethers.js` library, which interacts with the Ethereum-compatible blockchain. Once the wallet is connected, the balance is updated in real-time.

## Conclusion

Crypto Hangman is an innovative game that leverages blockchain technology to ensure a transparent and fair experience for players. By integrating Polkadot and MetaMask, the game allows players to earn, spend, and send tokens while collecting NFTs and tracking their progress securely on the blockchain.

## License
This project is licensed under the MIT License
