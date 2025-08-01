import { useEffect, useState } from "react"
import { useTheme } from "./theme-provider"
import { Moon, Sun } from "lucide-react"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const next = theme === "light" ? "dark" : "light"

    useEffect(() => {
        setMounted(true)
    }, [])

    // During SSR and initial client render, show a placeholder to avoid hydration mismatch
    if (!mounted) {
        return (
            <button type="button" disabled>
                <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"><Moon size={18} /></span>
            </button>
        )
    }

    return (
        <button type="button" onClick={() => setTheme(next)} className="cursor-pointer">
            {theme === "light" 
            ? <Sun size={18} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" /> 
            : <Moon size={18} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" />}
        </button>
    )
}
