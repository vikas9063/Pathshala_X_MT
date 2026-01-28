import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import ErrorState from '~/components/error/error-comp';
import Loading from '~/components/loading/loading';
import { Toaster } from '~/components/ui/sonner';
import { useTenantOrPathshalaStore } from '~/store/useTenantStore';

export const getTenantSlug = (hostname: string): string | null => {
  if (hostname === 'localhost') return null;
  const parts = hostname.split('.');
  if (parts.length >= 2) {
    return parts[0] === 'www' ? parts[1] : parts[0];
  }
  return null;
};

const TenantOrPathshalaLayout = () => {
  const { state, pathshala, loading, error, fetchPathshalaBySubdomain } = useTenantOrPathshalaStore();
  const [slug, setSlug] = useState<string | null>("");

  const loadTenantOrPathshala = async () => {
    if (typeof window === 'undefined') return;
    const hostname = window.location.hostname;
    const subdomain = getTenantSlug(hostname);

    if (subdomain) {
      setSlug(subdomain);
      await fetchPathshalaBySubdomain(subdomain);
    } else {
      setSlug(null);
    }
  };

  useEffect(() => {
    if (state === 'idle' || state === undefined) {
      loadTenantOrPathshala();
    }
  }, [state]);

  if (loading && state === 'loading') {
    return <Loading message="Loading Pathshala Details..." fullPage />;
  }

  if (error && state === 'error') {
    return (
      <ErrorState
        message="Invalid Pathshala or Tenant id, please check the URL"
        title="Invalid Tenant/SLUG"
      />
    );
  }

  if (pathshala && state === 'loaded') {
    return <>
      <Outlet />
      <Toaster position="top-right" richColors closeButton />
    </>;
  }

  return slug === null ? (
    <ErrorState message="No slug detected in the URL" title="No SLUG Detected" />
  ) : (
    <Loading message="Verifying Pathshala Details..." fullPage />
  );
};

export default TenantOrPathshalaLayout;
