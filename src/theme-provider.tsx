import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_VARIANT, isThemeVariant, type ThemeVariant } from "./themes";

type ResolvedMode = "light" | "dark";
type Mode = ResolvedMode | "system";

const ThemeContext = createContext<{
  /** Varian tema aktif — menyetel data-theme di <html>. */
  variant: ThemeVariant;
  setVariant: (v: ThemeVariant) => void;
  /** Mode terang/gelap/system — menyetel class .dark di <html>. */
  mode: Mode;
  setMode: (m: Mode) => void;
  resolvedMode: ResolvedMode;
}>({
  variant: DEFAULT_VARIANT,
  setVariant: () => {},
  mode: "system",
  setMode: () => {},
  resolvedMode: "light",
});

const VARIANT_KEY = "theme-variant";
const MODE_KEY = "theme";

export function ThemeProvider({
  children,
  defaultVariant = DEFAULT_VARIANT,
}: {
  children: ReactNode;
  defaultVariant?: ThemeVariant;
}) {
  const [variant, setVariantState] = useState<ThemeVariant>(defaultVariant);
  const [mode, setModeState] = useState<Mode>("system");
  const [resolvedMode, setResolvedMode] = useState<ResolvedMode>("light");

  useEffect(() => {
    const storedVariant = localStorage.getItem(VARIANT_KEY);
    setVariantState(
      storedVariant && isThemeVariant(storedVariant) ? storedVariant : defaultVariant
    );
    const storedMode = localStorage.getItem(MODE_KEY) as Mode | null;
    setModeState(storedMode ?? "system");
  }, [defaultVariant]);

  useEffect(() => {
    // Varian tema: file css tema meng-override token default lewat
    // :root[data-theme="<variant>"], jadi cukup satu atribut di <html>.
    document.documentElement.dataset.theme = variant;
    localStorage.setItem(VARIANT_KEY, variant);
  }, [variant]);

  useEffect(() => {
    const applyMode = (m: Mode) => {
      const isDark =
        m === "dark" ||
        (m === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      document.documentElement.classList.toggle("dark", isDark);
      setResolvedMode(isDark ? "dark" : "light");
    };

    applyMode(mode);

    if (mode !== "system") {
      localStorage.setItem(MODE_KEY, mode);
      return;
    }

    localStorage.removeItem(MODE_KEY);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyMode("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mode]);

  return (
    <ThemeContext.Provider
      value={{ variant, setVariant: setVariantState, mode, setMode: setModeState, resolvedMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
