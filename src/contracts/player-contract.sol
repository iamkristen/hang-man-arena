// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HangmanArena {
    struct Player {
        string name;
        string email;
        string avatar;
        uint256 points;
        uint256 level;
        uint256 gamesPlayed;
        uint256 gamesWon;
        bool exists;
    }

    mapping(address => Player) private players;
    address[] private playerAddresses;

    event PlayerUpdated(address indexed player, string name, uint256 level);

    modifier onlyExistingPlayer() {
        require(players[msg.sender].exists, "Player does not exist");
        _;
    }

    function createOrUpdatePlayer(
        string memory name,
        string memory email,
        string memory avatar,
        uint256 points,
        uint256 level,
        uint256 gamesPlayed,
        uint256 gamesWon
    ) public {
        Player storage player = players[msg.sender];

        if (!player.exists) {
            playerAddresses.push(msg.sender);
            player.exists = true;
        }

        player.name = name;
        player.email = email;
        player.avatar = avatar;
        player.points = points;
        player.level = level;
        player.gamesPlayed = gamesPlayed;
        player.gamesWon = gamesWon;

        emit PlayerUpdated(msg.sender, name, level);
    }

    function getPlayer(
        address playerAddress
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        Player memory player = players[playerAddress];
        require(player.exists, "Player does not exist");

        return (
            player.name,
            player.email,
            player.avatar,
            player.points,
            player.level,
            player.gamesPlayed,
            player.gamesWon
        );
    }

    function getAllPlayers() public view returns (address[] memory) {
        return playerAddresses;
    }

    function getLeaderboard() public view returns (address[] memory) {
        address[] memory sorted = playerAddresses;
        uint256 n = sorted.length;

        for (uint256 i = 0; i < n; i++) {
            for (uint256 j = 0; j < n - i - 1; j++) {
                if (players[sorted[j]].points < players[sorted[j + 1]].points) {
                    address temp = sorted[j];
                    sorted[j] = sorted[j + 1];
                    sorted[j + 1] = temp;
                }
            }
        }
        return sorted;
    }
}
