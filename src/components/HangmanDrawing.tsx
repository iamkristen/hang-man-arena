import { useState, useEffect } from "react";

interface HangmanDrawingProps {
  wrongGuesses: number;
  maxWrongGuesses: number;
}

const HangmanDrawing: React.FC<HangmanDrawingProps> = ({
  wrongGuesses,
  maxWrongGuesses,
}) => {
  const [partsToShow, setPartsToShow] = useState<number>(0);

  useEffect(() => {
    if (wrongGuesses > partsToShow && partsToShow < maxWrongGuesses) {
      const timer = setTimeout(() => {
        setPartsToShow((prev) => prev + 1);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [wrongGuesses, partsToShow, maxWrongGuesses]);

  return (
    <div className="w-full max-w-xs mx-auto">
      <svg viewBox="0 0 200 250" className="w-full">
        <line
          x1="20"
          y1="230"
          x2="100"
          y2="230"
          stroke="#9b87f5"
          strokeWidth="4"
          className={partsToShow >= 1 ? "hangman-part" : "opacity-0"}
        />
        <line
          x1="60"
          y1="230"
          x2="60"
          y2="30"
          stroke="#9b87f5"
          strokeWidth="4"
          className={partsToShow >= 2 ? "hangman-part" : "opacity-0"}
        />
        <line
          x1="60"
          y1="30"
          x2="150"
          y2="30"
          stroke="#9b87f5"
          strokeWidth="4"
          className={partsToShow >= 3 ? "hangman-part" : "opacity-0"}
        />
        <line
          x1="150"
          y1="30"
          x2="150"
          y2="50"
          stroke="#9b87f5"
          strokeWidth="4"
          className={partsToShow >= 4 ? "hangman-part" : "opacity-0"}
        />
        <circle
          cx="150"
          cy="70"
          r="20"
          stroke="#9b87f5"
          strokeWidth="4"
          fill="transparent"
          className={partsToShow >= 5 ? "hangman-part" : "opacity-0"}
        />
        <line
          x1="150"
          y1="90"
          x2="150"
          y2="150"
          stroke="#9b87f5"
          strokeWidth="4"
          className={partsToShow >= 6 ? "hangman-part" : "opacity-0"}
        />
        <line
          x1="150"
          y1="110"
          x2="120"
          y2="130"
          stroke="#9b87f5"
          strokeWidth="4"
          className={partsToShow >= 7 ? "hangman-part" : "opacity-0"}
        />
        <line
          x1="150"
          y1="110"
          x2="180"
          y2="130"
          stroke="#9b87f5"
          strokeWidth="4"
          className={partsToShow >= 8 ? "hangman-part" : "opacity-0"}
        />
        <line
          x1="150"
          y1="150"
          x2="120"
          y2="190"
          stroke="#9b87f5"
          strokeWidth="4"
          className={partsToShow >= 9 ? "hangman-part" : "opacity-0"}
        />
        <line
          x1="150"
          y1="150"
          x2="180"
          y2="190"
          stroke="#9b87f5"
          strokeWidth="4"
          className={partsToShow >= 10 ? "hangman-part" : "opacity-0"}
        />
        {partsToShow >= maxWrongGuesses && (
          <>
            <line
              x1="142"
              y1="65"
              x2="148"
              y2="75"
              stroke="#f87171"
              strokeWidth="2"
              className="hangman-part"
            />
            <line
              x1="148"
              y1="65"
              x2="142"
              y2="75"
              stroke="#f87171"
              strokeWidth="2"
              className="hangman-part"
            />
            <line
              x1="152"
              y1="65"
              x2="158"
              y2="75"
              stroke="#f87171"
              strokeWidth="2"
              className="hangman-part"
            />
            <line
              x1="158"
              y1="65"
              x2="152"
              y2="75"
              stroke="#f87171"
              strokeWidth="2"
              className="hangman-part"
            />
            <path
              d="M140,80 Q150,70 160,80"
              fill="transparent"
              stroke="#f87171"
              strokeWidth="2"
              className="hangman-part"
            />
          </>
        )}
      </svg>
      <div className="text-center text-lg text-red-400 font-medium">
        {wrongGuesses} / {maxWrongGuesses} wrong guesses
      </div>
    </div>
  );
};

export default HangmanDrawing;
