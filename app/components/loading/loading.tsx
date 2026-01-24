import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '~/lib/utils';


interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  fullPage?: boolean;
}

export const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, message = "Loading...", fullPage = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-4 animate-in fade-in duration-500",
          fullPage ? "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" : "py-10",
          className
        )}
        {...props}
      >
        <div className="relative">
          {/* Subtle Glow Effect using shadcn primary color */}
          <div className="absolute inset-0 blur-xl opacity-20 bg-primary rounded-full animate-pulse" />
          
          <Loader2 
            className="h-10 w-10 animate-spin text-primary" 
            strokeWidth={1.5} 
          />
        </div>

        {/* Text using shadcn's muted-foreground for that professional look */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium tracking-tight text-foreground animate-pulse">
            {message}
          </p>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70">
            Please wait
          </p>
        </div>
      </div>
    );
  }
);

Loading.displayName = "Loading";

export default Loading;