"use client"

import * as React from "react"

type Theme =
  | "system"
  | "light"
  | "dark"
  | "catppuccin-latte"
  | "catppuccin-mocha"
  | "catppuccin-macchiato"
  | "catppuccin-frappe"
  | "solarized-dark"
  | "solarized-light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system", // Changed default from catppuccin-latte to system
  storageKey = "eisenhower-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(
    () => ((typeof window !== "undefined" && localStorage.getItem(storageKey)) as Theme) || defaultTheme,
  )

  React.useEffect(() => {
    const root = window.document.documentElement

    // Remove all theme classes
    root.classList.remove(
      "dark",
      "theme-catppuccin-mocha",
      "theme-catppuccin-latte",
      "theme-catppuccin-macchiato",
      "theme-catppuccin-frappe",
      "theme-solarized-dark",
      "theme-solarized-light",
    )

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      if (systemTheme === "dark") {
        root.classList.add("dark")
      }
    } else if (theme === "dark") {
      root.classList.add("dark")
    } else if (theme === "light") {
      // Light theme uses the default :root styles, no class needed
    } else {
      // Custom themes
      root.classList.add(`theme-${theme}`)
    }
  }, [theme])

  React.useEffect(() => {
    if (theme !== "system") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      const root = window.document.documentElement
      root.classList.remove("dark")
      if (mediaQuery.matches) {
        root.classList.add("dark")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
