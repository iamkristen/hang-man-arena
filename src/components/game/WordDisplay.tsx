
import React from 'react';
import { Card } from "@/components/ui/card";

interface WordDisplayProps {
  wordState: (string | null)[];
}

const WordDisplay: React.FC<WordDisplayProps> = ({ wordState }) => {
  return (
    <div className="flex justify-center flex-wrap gap-2 mb-6">
      {wordState.map((letter, index) => (
        <div key={index} className="word-letter">
          {letter}
        </div>
      ))}
    </div>
  );
};

export default WordDisplay;
