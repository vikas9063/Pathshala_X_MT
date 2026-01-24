import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import ErrorState from '~/components/error/error-comp';
import Loading from '~/components/loading/loading';
import { Toaster } from '~/components/ui/sonner';

import { useTenantOrPathshalaStore } from '~/store/useTenantStore';

/**
 * Utility to extract subdomain/tenant slug
 * Extracts 'tenant' from 'tenant.localhost' or 'tenant.domain.com'
 */
export const getTenantSlug = (hostname: string): string | null => {
  if (hostname === 'localhost') return null;
  const parts = hostname.split('.');

  if (parts.length >= 2) {
    // Handle www.tenant.com -> tenant
    return parts[0] === 'www' ? parts[1] : parts[0];
  }
  return null;
};

const TenantLayout: React.FC = () => {
  const navigate = useNavigate();

  // 1. Hydration Fix: Prevent mismatch between Server and Client
  const [isMounted, setIsMounted] = useState(false);

  const {
    pathshala,
    loading,
    error,
    fetchPathshalaBySubdomain,
  } = useTenantOrPathshalaStore();

  // 2. Identify the slug as soon as we hit the browser
  const slug = useMemo(() => {
    if (typeof window !== 'undefined') {
      return getTenantSlug(window.location.hostname);
    }
    return null;
  }, []);

  useEffect(() => {
    setIsMounted(true);
    if (slug) {
      fetchPathshalaBySubdomain(slug);
    }
  }, [slug, fetchPathshalaBySubdomain]);

  // --- RENDERING LOGIC ---

  // Step A: During Hydration, render a neutral shell (fixes your error)
  if (!isMounted) {
    return null;
  }

  // Step B: If there is no slug (e.g., accessed via main domain)
  if (!slug) {
    return (
      <div className="flex h-screen w-screen items-center justify-center p-10 text-center">
        <ErrorState
          title="Invalid Access"
          message="Please access the application through your school's specific subdomain."
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  // Step C: Show loading if fetching OR if we have a slug but haven't got data/error yet
  if (loading || (!pathshala && !error)) {
    return <Loading message="Syncing school data..." fullPage />;
  }

  // Step D: Show error if the fetch failed or school doesn't exist
  if (error || !pathshala) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <ErrorState
          title="Pathshala Not Found"
          message={error || "We couldn't verify this pathshala. It might be inactive or the URL is wrong."}
          onRetry={() => fetchPathshalaBySubdomain(slug)}
        />
      </div>
    );
  }

  // Step E: Success!
  return (
    <div className="min-h-screen bg-background">
      <Outlet context={{ pathshala, slug }} />
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default TenantLayout;