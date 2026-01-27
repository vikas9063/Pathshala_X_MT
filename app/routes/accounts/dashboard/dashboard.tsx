import OnboardingBanner from "~/components/banners/OnboardingBanner";
import { useTenantOrPathshalaStore } from "~/store/useTenantStore"
import { useLoggedInUserStore } from "~/store/useLoggedinUserStore";

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
    <div className="min-h-screen w-full">
      {user?.permissions.includes(3) && !pathshala?.contactInfo && (
        <OnboardingBanner progress={calculatePathshalaCompletePercentage()} />
      )}
    </div>

  )
}

export default dashboard