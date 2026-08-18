import * as React from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";
import Button from "@/components/ui/Button";

export function ThemeToggle() {
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem("theme") || (document.documentElement.classList.contains("dark") ? "dark" : "dark");
  });

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="flex items-center gap-1.5 px-2.5 h-8 border-border text-foreground hover:bg-accent"
      title="Toggle Light/Dark Theme">
      {theme === "dark" ? (
        <>
          <IconSun className="h-4 w-4 text-amber-400" />
          <span className="text-xs hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <IconMoon className="h-4 w-4 text-blue-500" />
          <span className="text-xs hidden sm:inline">Dark</span>
        </>
      )}
    </Button>
  );
}
