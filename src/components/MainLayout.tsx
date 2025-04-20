import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePlayer } from "../contexts/PlayerContext";
import {
  Gamepad2,
  Home,
  User,
  ShoppingBag,
  Wallet,
  LogOut,
} from "lucide-react";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { player, isConnected, disconnectPlayerWallet } = usePlayer();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/game", label: "Play Game", icon: Gamepad2 },
    { path: "/profile", label: "Profile", icon: User },
    { path: "/marketplace", label: "Marketplace", icon: ShoppingBag },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/30 via-background to-background">
      <header className="border-b border-border/30 backdrop-blur-sm bg-background/50 supports-backdrop-blur:bg-background/30 sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">CryptoHangman</span>
          </Link>
          <div className="flex items-center space-x-4">
            {isConnected && player ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {player.points} points
                </span>
                <Link to="/profile">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full relative"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary">
                      {player.avatar ? (
                        <img
                          src={player.avatar}
                          alt="Player Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center">
                          <span className="text-sm">👾</span>
                        </div>
                      )}
                    </div>
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground">
                      {player.level}
                    </span>
                  </Button>
                </Link>
                <Button
                  size="sm"
                  onClick={disconnectPlayerWallet}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Disconnect</span>
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                className="bg-gradient-to-r from-orange-500 to-amber-500"
              >
                <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Mobile Nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border/40">
        <div className="flex justify-around py-2">
          {navItems.map((item) => (
            <Link to={item.path} key={item.path}>
              <Button
                variant="ghost"
                size="icon"
                className={`flex flex-col items-center justify-center h-14 w-16 rounded-none ${
                  isActive(item.path)
                    ? "text-primary border-t-2 border-primary"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-[10px] mt-1">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </nav>
      <nav className="hidden sm:block fixed top-1/2 transform -translate-y-1/2 left-4 z-50">
        <div className="bg-card/80 backdrop-blur rounded-full p-2 border border-border/40 space-y-2">
          {navItems.map((item) => (
            <Link to={item.path} key={item.path}>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                <item.icon className="h-5 w-5" />
              </Button>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;
