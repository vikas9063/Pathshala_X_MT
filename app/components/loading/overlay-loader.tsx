import React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "~/lib/utils"

interface BlurOverlayLoaderProps {
    message?: string
}

export default function BlurOverlayLoader({
    message = "Saving..."
}: BlurOverlayLoaderProps) {
    return (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
            <div className="relative">
                <div className="absolute inset-0 blur-xl opacity-30 bg-primary rounded-full animate-pulse" />
                <Loader2
                    className="h-8 w-8 animate-spin text-primary"
                    strokeWidth={1.5}
                />
            </div>

            <p className="mt-3 text-xs font-medium text-foreground">
                {message}
            </p>
        </div>
    )
}
