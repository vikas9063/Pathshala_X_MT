import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { Card, CardContent } from "~/components/ui/card";

export default function OnboardingBanner({ progress }: { progress: number }) {
  return (
    <Card className="border-none shadow-none bg-muted/50">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          {/* Left Side: Info & Progress */}
          <div className="space-y-4 w-full md:max-w-xl">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight">
                Complete your account setup
              </h2>
              <p className="text-sm text-muted-foreground">
                You're almost there! Add your business details to unlock full
                dashboard capabilities and start receiving payments.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span>Setup Progress</span>
                <span>{progress}% complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Checklist Items */}
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <SetupItem label="Account Created" completed={progress >= 25} />
              <SetupItem label="Principal Details" completed={progress >= 50} />
              <SetupItem label="Email Verification" completed={progress >= 75} />
              <SetupItem label="Company Logo" completed={progress >= 100} />
            </div>
          </div>

          {/* Right Side: Action Button */}
          <div className="shrink-0 w-full md:w-auto">
            <Button size="lg" className="w-full md:w-auto gap-2">
              Finish Setup <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}

// Helper Component for Checklist Items
function SetupItem({ label, completed }: { label: string; completed: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      {completed ? (
        <CheckCircle2 className="h-4 w-4 text-primary" />
      ) : (
        <Circle className="h-4 w-4 text-muted-foreground" />
      )}
      <span className={`text-xs ${completed ? "text-foreground font-medium" : "text-muted-foreground"}`}>
        {label}
      </span>
    </div>
  );
}