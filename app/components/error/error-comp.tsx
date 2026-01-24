import React from 'react';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ className, title = "Something went wrong", message, onRetry, ...props }, ref) => {
    const navigate = useNavigate();

    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-100 w-full flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-300",
          className
        )}
        {...props}
      >
        {/* Icon with shadcn destructive theme for errors */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 mb-6">
          <AlertCircle className="h-10 w-10 text-destructive" strokeWidth={1.5} />
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        
        <p className="mt-2 max-w-100 text-sm text-muted-foreground">
          {message || "We encountered an error while trying to load this page. Please try again or head back to the dashboard."}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          {/* Try Again Button */}
          {onRetry && (
            <Button 
              onClick={onRetry} 
              variant="default"
              className="min-w-35 gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </Button>
          )}

          {/* Go to Home Button */}
          <Button 
            onClick={() => navigate('/')} 
            variant="outline"
            className="min-w-35 gap-2"
          >
            <Home className="h-4 w-4" />
            Go to Home
          </Button>
        </div>
      </div>
    );
  }
);

ErrorState.displayName = "ErrorState";

export default ErrorState;