
import React from 'react';
import { Timer } from 'lucide-react';
import { PlayerProfile } from '@/contexts/PlayerContext';
import { DIFFICULTY_SETTINGS } from '@/utils/gameUtils';

interface GameInfoProps {
  player: PlayerProfile | null;
  currentHint: string;
  timeLeft: number | null;
  gameTime: number;
  selectedDifficulty: "easy" | "medium" | "hard";
}

const GameInfo: React.FC<GameInfoProps> = ({ 
  player, 
  currentHint, 
  timeLeft, 
  selectedDifficulty,
}) => {
  return (
    <div className="mt-6 space-y-2 text-center">
      <div className="text-sm text-muted-foreground">
        <span className="font-medium">Hint:</span> {currentHint}
      </div>

      {selectedDifficulty === 'medium' && timeLeft !== null && (
        <div className={`flex items-center justify-center gap-2 ${timeLeft < 30 ? 'text-red-500' : ''}`}>
          <Timer className="w-4 h-4" />
          <span>{timeLeft}s left</span>
        </div>
      )}
      {selectedDifficulty === 'hard' && (
        <div className="text-amber-500">
          <Timer className="w-4 h-4 inline mr-2" />
          <span>-{DIFFICULTY_SETTINGS.hard.pointsPenalty} points/second</span>
        </div>
      )}

      {player && (
        <div className="mt-6 flex flex-col space-y-2 items-center">
          <p className="text-sm text-muted-foreground">
            Player: <span className="font-medium text-foreground">{player.name}</span>
          </p>
          <div className="flex space-x-2">
            <span className="level-badge">Level {player.level}</span>
            <span className="points-badge">{player.points} pts</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameInfo;
