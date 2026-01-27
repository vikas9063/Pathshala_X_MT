import { useTenantOrPathshalaStore } from "~/store/useTenantStore"
import { useLoggedInUserStore } from "~/store/useLoggedinUserStore";
import OnboardingBannerSettingpathshala from "~/components/banners/OnboardingBannerSettingpathshala";
import NavigationHeaders from "~/components/ui/navigation-headers";

const dashboard = () => {

  // check notification permission like if you need to setup abou pathshala details like logo, principal name etc.
  const { pathshala } = useTenantOrPathshalaStore();
  const { user } = useLoggedInUserStore();
  const calculatePathshalaCompletePercentage = () => {
    if (!pathshala?.contactInfo) {
      return 25;
    }
    if (!pathshala?.logoDetails) {
      return 75;
    }
    return 50;
  }
  return (
    <div className="min-h-screen w-full bg-muted/30 p-6 space-y-8">
      <NavigationHeaders
                title="Pathshala Settings"
                description="Manage school-wide settings, branding, and core contact information."
                // rightButtonLabel="View Public Profile"
                // onRightButtonClick={() => navigate("/public-profile")}
            />
      {user?.permissions.includes(3) && !pathshala?.contactInfo && (
        <OnboardingBannerSettingpathshala progress={calculatePathshalaCompletePercentage()} username={user?.userName} />
      )}
    </div>

  )
}

export default dashboard