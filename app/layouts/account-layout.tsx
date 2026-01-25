import React, { useEffect, useState } from 'react';
import ErrorState from '~/components/error/error-comp';
import Loading from '~/components/loading/loading';
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
    return <div>AccountLayout - {user.name}</div>;
  }

  // Fallback: if no slug or still verifying
  return <Loading message="Verifying User Details..." fullPage />;
};

export default AccountLayout;
