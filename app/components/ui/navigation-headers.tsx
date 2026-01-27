import { Button } from "@/components/ui/button"
import { useLocation } from "react-router"

type NavigationHeadersProps = {
  title: string
  description: string
  rightButtonLabel?: string
  onRightButtonClick?: () => void
}

const NavigationHeaders = ({
  title,
  description,
  rightButtonLabel,
  onRightButtonClick,
}: NavigationHeadersProps) => {

  const location = useLocation()

  // Convert URL to breadcrumb
 const breadcrumbs = [
  "Account",
  ...location.pathname
    .split("/")
    .filter(Boolean)
    .slice(1) // remove first URL segment
    .map((item) =>
      item
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    ),
]


  return (
    <div className="space-y-4">

      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground">
        {breadcrumbs.map((item, index) => (
          <span key={index}>
            <span
              className={
                index === breadcrumbs.length - 1
                  ? "text-foreground font-medium"
                  : ""
              }
            >
              {item}
            </span>
            {index !== breadcrumbs.length - 1 && "  >  "}
          </span>
        ))}
      </div>

      {/* Title + Right Action */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>

        {rightButtonLabel && (
          <Button
            variant="outline"
            onClick={onRightButtonClick}
            className="gap-2"
          >
            👁 {rightButtonLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

export default NavigationHeaders
