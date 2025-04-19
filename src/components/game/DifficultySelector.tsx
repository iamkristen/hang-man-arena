import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DifficultySelectorProps {
  selectedDifficulty: "easy" | "medium" | "hard";
  isGameOver: boolean;
  onDifficultyChange: (difficulty: "easy" | "medium" | "hard") => void;
}

const DIFFICULTY_LEVELS = [
  {
    id: "easy",
    label: "Easy",
    description: "No time limit, perfect for beginners",
  },
  {
    id: "medium",
    label: "Medium",
    description: "2 minute time limit to solve the word",
  },
  {
    id: "hard",
    label: "Hard",
    description: "Points decrease over time - act fast!",
  },
];

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  onDifficultyChange,
}) => {
  return (
    <Tabs
      value={selectedDifficulty}
      onValueChange={(value) =>
        onDifficultyChange(value as "easy" | "medium" | "hard")
      }
      className="w-full"
    >
      <TabsList className="grid grid-cols-3 mb-3">
        {DIFFICULTY_LEVELS.map((level) => (
          <TabsTrigger
            key={level.id}
            value={level.id}
            className={`capitalize ${
              selectedDifficulty === level.id ? "text-primary" : ""
            }`}
          >
            {level.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {DIFFICULTY_LEVELS.map((level) => (
        <TabsContent
          key={level.id}
          value={level.id}
          className="text-xs text-center text-muted-foreground -mt-2"
        >
          {level.description}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DifficultySelector;
