import { Bell } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { AppSidebar } from '~/components/app-sidebar';
import ErrorState from '~/components/error/error-comp';
import Loading from '~/components/loading/loading';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '~/components/ui/breadcrumb';
import { Button } from '~/components/ui/button';
import { NotificationButton } from '~/components/ui/notification-button';
import { Separator } from '~/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import { useLoggedInUserStore } from '~/store/useLoggedinUserStore';
import { useTenantOrPathshalaStore } from '~/store/useTenantStore';

const AccountLayout = () => {
  const { pathshala } = useTenantOrPathshalaStore();
  const [slug, setSlug] = useState<string | null>(null);
  const { state, loading, error, isLoggedIn, getLoggedInUser, user } = useLoggedInUserStore();

  // Update document title and slug when pathshala changes
  useEffect(() => {
    if (pathshala) {
      document.title = `${pathshala.pathshalaName} - Account`;
      setSlug(pathshala.subdomain);
    } else {
      document.title = 'Account';
      setSlug(null);
    }
  }, [pathshala]);

  // Fetch logged-in user when slug is available
  useEffect(() => {
    if (slug && state === 'idle') {
      getLoggedInUser(slug);
    }
  }, [slug, state, getLoggedInUser]);

  if (loading && state === 'loading') {
    return <Loading message="Loading User Details..." fullPage />;
  }

  if (error && state === 'error') {
    return <ErrorState message={error} title="Error Loading User" />;
  }

  if (isLoggedIn && user && state === 'loaded') {
    return <SidebarProvider>
      <AppSidebar username={user.userName} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-[2%] mr-[1%] justify-between w-full">
            <div className='flex items-center gap-2'>
              <SidebarTrigger className="-ml-1" />
              {/* <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
               <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb> */}
            </div>
            <div className='flex items-center gap-2'>
              <NotificationButton hasNotification={false} />
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <main className="flex min-h-screen px-5 py-2 bg-background">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>;
  }

  // Fallback: if no slug or still verifying
  return <Loading message="Verifying User Details..." fullPage />;
};

export default AccountLayout;
