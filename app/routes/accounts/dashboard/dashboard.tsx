import { useTenantOrPathshalaStore } from "~/store/useTenantStore"
import { useLoggedInUserStore } from "~/store/useLoggedinUserStore";
import OnboardingBannerSettingpathshala from "~/components/banners/OnboardingBannerSettingpathshala";
import NavigationHeaders from "~/components/ui/navigation-headers";

const dashboard = () => {

  // check notification permission like if you need to setup abou pathshala details like logo, principal name etc.
  const { pathshala } = useTenantOrPathshalaStore();
  const { user } = useLoggedInUserStore();
  const calculatePathshalaCompletePercentage = () => {
    if (!pathshala) return 0;

    let percentage = 25;

    const contact = pathshala.contactInfo;

    /* ===== Step 2: Any contact info ===== */
    const hasAnyContactInfo =
      !!contact &&
      (
        contact.primaryPhone ||
        contact.secondaryPhone ||
        contact.email ||
        contact.alternateEmail ||
        contact.faxNumber
      );

    if (hasAnyContactInfo) {
      percentage = 50;
    }

    /* ===== Step 3: Leadership info complete ===== */
    const hasLeadershipInfo =
      !!contact &&
      !!contact.principalName &&
      !!contact.principalPhone &&
      !!contact.adminContactName &&
      !!contact.adminContactPhone;

    if (hasLeadershipInfo) {
      percentage = 75;
    }

    /* ===== Step 4: Logo uploaded ===== */
    if (pathshala.logoDetails) {
      percentage = 100;
    }

    return percentage;
  };

  return (
    <div className="min-h-screen w-full bg-muted/30 p-6 space-y-8">
      <NavigationHeaders
        title={`Hi, ${user?.name}`}
        description="Welcome to your dashboard"
      // rightButtonLabel="View Public Profile"
      // onRightButtonClick={() => navigate("/public-profile")}
      />
      {user?.permissions.includes(3) && calculatePathshalaCompletePercentage() < 100 && (
        <OnboardingBannerSettingpathshala progress={calculatePathshalaCompletePercentage()} username={user?.userName} />
      )}
    </div>

  )
}

export default dashboard