import { Bell } from "lucide-react";
import { Button } from "./button";

export function NotificationButton({ hasNotification }: { hasNotification: boolean }) {
    return (
        <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell />
            {hasNotification && (
                <span className="absolute top-1 right-1 inline-flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
            )}
            {!hasNotification && (
                <span className="absolute top-1 right-1 inline-flex h-2 w-2 rounded-full bg-green-500 animate-ping" />
            )}
        </Button>

    );
}
