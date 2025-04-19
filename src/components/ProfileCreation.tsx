import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { AVATARS, usePlayer } from "../contexts/PlayerContext";

const ProfileCreation: React.FC = () => {
  const { completePlayerProfile } = usePlayer();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [errors, setErrors] = useState({ name: "", email: "" });

  const validateForm = (): boolean => {
    const newErrors = { name: "", email: "" };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      completePlayerProfile(name, email, selectedAvatar);
    }
  };

  const nextAvatar = () => {
    const currentIndex = AVATARS.indexOf(selectedAvatar);
    const nextIndex = (currentIndex + 1) % AVATARS.length;
    setSelectedAvatar(AVATARS[nextIndex]);
  };

  const prevAvatar = () => {
    const currentIndex = AVATARS.indexOf(selectedAvatar);
    const prevIndex = currentIndex === 0 ? AVATARS.length - 1 : currentIndex - 1;
    setSelectedAvatar(AVATARS[prevIndex]);
  };

  return (
    <Card className="max-w-md w-full mx-auto bg-card/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Create Your Player Profile</CardTitle>
        <CardDescription className="text-center">
          Complete your profile to start playing Crypto Hangman
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Player Name</Label>
            <Input
              id="name"
              placeholder="Enter your game name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label>Choose Avatar</Label>
            <div className="flex items-center justify-center space-x-4">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={prevAvatar}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary">
                <img
                  src={selectedAvatar}
                  alt="Selected Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={nextAvatar}
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
        >
          <Check className="mr-2 h-5 w-5" /> Complete Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCreation;
