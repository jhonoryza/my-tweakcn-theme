import { Palette, Check } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "./cn";
import { THEMES } from "./themes";
import { useTheme } from "./theme-provider";

/**
 * Dropdown pemilih varian tema (palet). Butuh ThemeProvider di atasnya
 * dan stylesheet tema ter-import (lihat README).
 */
export function ThemeVariantSwitcher({ className = "" }: { className?: string }) {
  const { variant, setVariant } = useTheme();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            "p-2 rounded-(--radius) border-(length:--brutal-border-w) border-foreground text-foreground/70 hover:cursor-pointer hover:bg-accent transition-colors",
            className
          )}
          aria-label="Ganti tema"
          title="Ganti tema"
        >
          <Palette className="h-4 w-4" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          className="z-50 min-w-[11rem] rounded-(--radius) border-(length:--brutal-border-w) border-foreground bg-popover text-popover-foreground p-1 shadow-md"
        >
          {THEMES.map((t) => (
            <DropdownMenu.Item
              key={t.id}
              onSelect={() => setVariant(t.id)}
              className="flex items-center justify-between gap-4 px-2 py-1.5 text-sm outline-none cursor-pointer data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground rounded-(--radius-sm,0.25rem)"
            >
              {t.label}
              {variant === t.id && <Check className="h-4 w-4" />}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
