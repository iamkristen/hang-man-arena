import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  getRandomWord,
  MAX_WRONG_GUESSES,
  calculatePoints,
  DIFFICULTY_SETTINGS,
} from "../utils/gameUtils";
import { usePlayer } from "../contexts/PlayerContext";
import HangmanDrawing from "./HangmanDrawing";
import GameInfo from "./game/GameInfo";
import WordDisplay from "./game/WordDisplay";
import LetterGrid from "./game/LetterGrid";
import DifficultySelector from "./game/DifficultySelector";

const GameBoard: React.FC = () => {
  const { player, addPoints, recordGamePlayed } = usePlayer();
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "easy" | "medium" | "hard"
  >("easy");
  const [currentWord, setCurrentWord] = useState("");
  const [currentHint, setCurrentHint] = useState("");
  const [wordState, setWordState] = useState<(string | null)[]>([]);
  const [usedLetters, setUsedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  const [gameTime, setGameTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [reactionEmoji, setReactionEmoji] = useState<string | null>(null);
  const [reactionMessage, setReactionMessage] = useState<string>("");
  const [isMuted, setIsMuted] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const correctSound = useRef<HTMLAudioElement | null>(null);
  const wrongSound = useRef<HTMLAudioElement | null>(null);
  const winSound = useRef<HTMLAudioElement | null>(null);
  const loseSound = useRef<HTMLAudioElement | null>(null);
  const backgroundSound = useRef<HTMLAudioElement | null>(null);

  const playSound = (sound: HTMLAudioElement | null) => {
    if (sound && !isMuted) {
      sound.currentTime = 0;
      sound.play();
    }
  };

  const startNewGame = useCallback(() => {
    const wordData = getRandomWord(selectedDifficulty);
    const revealTwoLetters = (word: string): (string | null)[] => {
      if (word.length <= 2) return word.split("");
      const indexes = new Set<number>();
      while (indexes.size < Math.min(2, word.length)) {
        indexes.add(Math.floor(Math.random() * word.length));
      }
      return word.split("").map((char, i) => (indexes.has(i) ? char : null));
    };
    const initialState = revealTwoLetters(wordData.word);
    const startTime = Date.now();
    setCurrentWord(wordData.word);
    setCurrentHint(wordData.hint);
    setWordState(initialState);
    setUsedLetters(new Set(initialState.filter(Boolean) as string[]));
    setWrongGuesses(0);
    setIsGameOver(false);
    setIsWinner(false);
    setGameStartTime(startTime);
    setGameTime(0);
    setReactionEmoji(null);
    setReactionMessage("");
    setResetKey((prev) => prev + 1);
    if (selectedDifficulty === "medium") {
      setTimeLeft(DIFFICULTY_SETTINGS.medium.timeLimit);
    } else {
      setTimeLeft(null);
    }
  }, [selectedDifficulty]);

  useEffect(() => {
    startNewGame();
  }, [selectedDifficulty, startNewGame]);

  useEffect(() => {
    if (gameStartTime && !isGameOver) {
      const timer = setInterval(() => {
        const currentTime = Math.floor((Date.now() - gameStartTime) / 1000);
        setGameTime(currentTime);
        if (selectedDifficulty === "medium" && timeLeft !== null) {
          const remaining = DIFFICULTY_SETTINGS.medium.timeLimit! - currentTime;
          setTimeLeft(remaining);
          if (remaining <= 0) handleLose();
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStartTime, isGameOver, selectedDifficulty, timeLeft]);

  const handleLetterGuess = (letter: string) => {
    if (isGameOver || usedLetters.has(letter)) return;
    const newUsedLetters = new Set(usedLetters).add(letter);
    setUsedLetters(newUsedLetters);
    if (currentWord.includes(letter)) {
      const newWordState = [...wordState];
      for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === letter) newWordState[i] = letter;
      }
      setWordState(newWordState);
      playSound(correctSound.current);
      setReactionEmoji("😄");
      setReactionMessage("Great guess! You're on fire!");
      if (!newWordState.includes(null)) handleWin();
    } else {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
      playSound(wrongSound.current);
      setReactionEmoji("😅");
      setReactionMessage("Oh no! What are you doing?");
      if (newWrongGuesses >= MAX_WRONG_GUESSES) handleLose();
    }
  };

  const handleWin = () => {
    setIsGameOver(true);
    setIsWinner(true);
    playSound(winSound.current);
    setReactionEmoji("😎");
    setReactionMessage("Boom! You nailed it!");
    const gameTimeSeconds = Math.floor(
      (Date.now() - (gameStartTime || 0)) / 1000
    );
    const pointsEarned = calculatePoints(
      selectedDifficulty,
      wrongGuesses,
      gameTimeSeconds
    );
    setTimeout(() => {
      toast.success(
        `You won! The word was ${currentWord}. You earned ${pointsEarned} points!`
      );
      addPoints(pointsEarned);
      recordGamePlayed(true);
    }, 500);
  };

  const handleLose = () => {
    setIsGameOver(true);
    setIsWinner(false);
    playSound(loseSound.current);
    setReactionEmoji("😢");
    setReactionMessage("Better luck next time...");
    setTimeLeft(0);
    setTimeout(() => {
      toast.error(`Game over! The word was ${currentWord}`);
      recordGamePlayed(false);
    }, 500);
  };

  useEffect(() => {
    backgroundSound.current = new Audio("/sounds/background.wav");
    backgroundSound.current.loop = true;
    if (!isMuted) backgroundSound.current.play();
    return () => backgroundSound.current?.pause();
  }, []);

  useEffect(() => {
    if (backgroundSound.current) {
      backgroundSound.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      <audio src="/sounds/correct.wav" ref={correctSound} />
      <audio src="/sounds/wrong.wav" ref={wrongSound} />
      <audio src="/sounds/winner.wav" ref={winSound} />
      <audio src="/sounds/looser.wav" ref={loseSound} />
      <div className="flex justify-end mb-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsMuted(!isMuted)}
          className="text-xs"
        >
          {isMuted ? "🔇 Muted" : "🔊 Sound On"}
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/5">
          <Card className="p-4 h-full bg-card/80 backdrop-blur flex flex-col items-center justify-center">
            <HangmanDrawing
              key={resetKey}
              wrongGuesses={wrongGuesses}
              maxWrongGuesses={MAX_WRONG_GUESSES}
            />
            <GameInfo
              player={player}
              currentHint={currentHint}
              timeLeft={timeLeft}
              gameTime={gameTime}
              selectedDifficulty={selectedDifficulty}
            />
          </Card>
        </div>
        <div className="w-full md:w-3/5">
          <Card className="p-6 h-full bg-card/80 backdrop-blur flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm">
                <span className="text-muted-foreground mr-1">Difficulty:</span>
                <span className="font-medium">
                  {selectedDifficulty.charAt(0).toUpperCase() +
                    selectedDifficulty.slice(1)}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground mr-1">Time:</span>
                <span className="font-medium">{gameTime}s</span>
              </div>
            </div>
            <WordDisplay wordState={wordState} />
            {isGameOver && (
              <div
                className={`py-3 px-4 mb-4 rounded-md text-center ${
                  isWinner
                    ? "bg-green-500/20 text-green-500"
                    : "bg-red-500/20 text-red-500"
                }`}
              >
                <p className="font-bold">
                  {isWinner ? "You won!" : "Game over!"}
                </p>
                <p>
                  The word was: <span className="font-bold">{currentWord}</span>
                </p>
              </div>
            )}
            <LetterGrid
              usedLetters={usedLetters}
              currentWord={currentWord}
              isGameOver={isGameOver}
              onLetterGuess={handleLetterGuess}
            />
            <div className="mt-auto">
              <DifficultySelector
                selectedDifficulty={selectedDifficulty}
                isGameOver={isGameOver}
                onDifficultyChange={setSelectedDifficulty}
              />
              <Button
                onClick={startNewGame}
                className="w-full mt-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
              >
                {isGameOver ? "Play Again" : "New Game"}
              </Button>
            </div>
          </Card>
        </div>
        <div className="w-full md:w-1/5">
          <Card className="p-6 h-full bg-card/80 backdrop-blur flex flex-col items-center justify-center text-center">
            {reactionEmoji && (
              <div className="text-6xl animate-bounce mb-4">
                {reactionEmoji}
              </div>
            )}
            <p className="text-lg font-medium text-muted-foreground">
              {reactionMessage}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
