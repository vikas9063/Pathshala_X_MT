import { useTenantOrPathshalaStore } from "~/store/useTenantStore";
import { useLoggedInUserStore } from "~/store/useLoggedinUserStore";
import OnboardingBannerSettingpathshala from "~/components/banners/OnboardingBannerSettingpathshala";
import NavigationHeaders from "~/components/ui/navigation-headers";

const Dashboard = () => {
  const { pathshala } = useTenantOrPathshalaStore();
  const { user } = useLoggedInUserStore();

  const calculatePathshalaCompletePercentage = () => {
    if (!pathshala) return 0;

    let percentage = 25;
    const contact = pathshala.contactInfo;

    const hasAnyContactInfo =
      !!contact &&
      (
        contact.primaryPhone ||
        contact.secondaryPhone ||
        contact.email ||
        contact.alternateEmail ||
        contact.faxNumber
      );

    if (hasAnyContactInfo) percentage = 50;

    const hasLeadershipInfo =
      !!contact &&
      !!contact.principalName &&
      !!contact.principalPhone &&
      !!contact.adminContactName &&
      !!contact.adminContactPhone;

    if (hasLeadershipInfo) percentage = 75;

    if (pathshala.logoDetails) percentage = 100;

    return percentage;
  };

  const progress = calculatePathshalaCompletePercentage();

  return (
    <div className="min-h-screen w-full bg-muted/30 p-6 space-y-8">
      <NavigationHeaders
        title={`Hi, ${user?.name}`}
        description="Welcome to your dashboard"
      />

      {user?.permissions?.includes(3) && progress < 100 && (
        <OnboardingBannerSettingpathshala
          progress={progress}
          username={user?.userName}
        />
      )}
    </div>
  );
};

export default Dashboard;
