//import { SignedIn, SignedOut, UserButton } from "@daveyplate/better-auth-ui"
import { Link } from "@tanstack/react-router";
import { ModeToggle } from "./mode-toggle";
import { BookOpenText, Github } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/60 px-4 py-3 backdrop-blur h-12 flex items-center">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold text-2xl text-foreground"></Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/docs"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <BookOpenText size={18} />
          </Link>
          <a
            href="https://github.com/gaojunran/WakaAura"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Github size={18} />
          </a>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
