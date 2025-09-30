"use client"

import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Palette, Check } from "lucide-react"

const themeGroups = [
  {
    label: "Default",
    themes: [
      { value: "light", label: "Light", preview: "bg-white" },
      { value: "system", label: "System", preview: "bg-gradient-to-r from-slate-200 to-slate-900" },
      { value: "dark", label: "Dark", preview: "bg-slate-900" },
    ],
  },
  {
    label: "Catppuccin",
    themes: [
      { value: "catppuccin-latte", label: "Latte", preview: "bg-[#eff1f5]" },
      { value: "catppuccin-frappe", label: "Frappe", preview: "bg-[#303446]" },
      { value: "catppuccin-macchiato", label: "Macchiato", preview: "bg-[#24273a]" },
      { value: "catppuccin-mocha", label: "Mocha", preview: "bg-[#1e1e2e]" },
    ],
  },
  {
    label: "Solarized",
    themes: [
      { value: "solarized-light", label: "Light", preview: "bg-[#fdf6e3]" },
      { value: "solarized-dark", label: "Dark", preview: "bg-[#002b36]" },
    ],
  },
] as const

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-8 px-3">
          <Palette className="h-4 w-4" />
        </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Choose Theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {themeGroups.map((group) => (
          <div key={group.label}>
            <DropdownMenuLabel className="text-xs text-muted-foreground font-medium px-2 py-1">
              {group.label}
            </DropdownMenuLabel>
            {group.themes.map((themeOption) => (
              <DropdownMenuItem
                key={themeOption.value}
                onClick={() => setTheme(themeOption.value as any)}
                className="flex items-center justify-between gap-2 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border border-border ${themeOption.preview}`}
                    aria-hidden="true"
                  />
                  <span>{themeOption.label}</span>
                </div>
                {theme === themeOption.value && <Check className="h-4 w-4 text-primary" />}
              </DropdownMenuItem>
            ))}
            {group.label !== "Solarized" && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
