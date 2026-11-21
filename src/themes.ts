/**
 * Daftar tema + label yang tampil di switcher.
 * id = nama file di themes/<id>.css DAN nilai data-theme di <html>.
 * Tema default: "cloudflare".
 */
export const THEMES = [
  { id: "cloudflare", label: "Cloudflare" },
  { id: "brutal", label: "Neo Brutalism" },
  { id: "sage", label: "Sage Garden" },
  { id: "soft", label: "Soft" },
  { id: "t3-chat", label: "T3 Chat" },
  { id: "tangerine", label: "Tangerine" },
  { id: "darkmatter", label: "Darkmatter" },
  { id: "discord", label: "Discord" },
  { id: "js-ts-advent-of-code", label: "JS/TS Advent of Code" },
  { id: "spacelinear", label: "SpaceLinear" },
  { id: "qrafthive", label: "Qrafthive" },
] as const;

export type ThemeVariant = (typeof THEMES)[number]["id"];

export const DEFAULT_VARIANT: ThemeVariant = "cloudflare";

export function isThemeVariant(value: string | null): value is ThemeVariant {
  return THEMES.some((t) => t.id === value);
}
