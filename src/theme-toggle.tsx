import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";

/** Toggle terang/gelap. Butuh ThemeProvider di atasnya. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedMode, setMode } = useTheme();

  return (
    <button
      onClick={() => setMode(resolvedMode === "dark" ? "light" : "dark")}
      className={`p-2 rounded-(--radius) border-(length:--brutal-border-w) border-foreground text-foreground/70 hover:cursor-pointer hover:bg-accent transition-colors ${className}`}
      aria-label="Toggle light/dark"
      title="Toggle light/dark"
    >
      {resolvedMode === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
