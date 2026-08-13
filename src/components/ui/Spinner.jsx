import { LoaderIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }) {
    return (
        <LoaderIcon
            role="status"
            aria-label="Loading"
            className={cn("h-6 w-6 animate-spin text-foreground", className)}
            {...props}
        />
    )
}

export function SpinnerCustom() {
    return (
        <div className="flex items-center gap-4">
            <Spinner />
        </div>
    )
}

export default SpinnerCustom;
