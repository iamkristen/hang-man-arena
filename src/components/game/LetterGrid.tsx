
import React from 'react';

interface LetterGridProps {
  usedLetters: Set<string>;
  currentWord: string;
  isGameOver: boolean;
  onLetterGuess: (letter: string) => void;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const LetterGrid: React.FC<LetterGridProps> = ({ 
  usedLetters, 
  currentWord, 
  isGameOver, 
  onLetterGuess 
}) => {
  return (
    <div className="grid grid-cols-7 sm:grid-cols-9 gap-1.5 mb-6">
      {ALPHABET.map(letter => (
        <button
          key={letter}
          className={`letter-button ${
            usedLetters.has(letter) 
              ? currentWord.includes(letter)
                ? 'bg-green-600/50 text-green-100' 
                : 'bg-red-600/50 text-red-100'
              : ''
          }`}
          onClick={() => onLetterGuess(letter)}
          disabled={isGameOver || usedLetters.has(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default LetterGrid;
