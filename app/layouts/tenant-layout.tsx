import React, { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router";
import ErrorState from "~/components/error/error-comp";
import Loading from "~/components/loading/loading";
import { Toaster } from "~/components/ui/sonner";
import { useTenantOrPathshalaStore } from "~/store/useTenantStore";

export const getTenantSlug = (hostname: string): string | null => {
  if (hostname === "localhost") return null;
  const parts = hostname.split(".");
  if (parts.length >= 2) {
    return parts[0] === "www" ? parts[1] : parts[0];
  }
  return null;
};

const TenantLayout: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { pathshala, loading, error, fetchPathshalaBySubdomain } =
    useTenantOrPathshalaStore();

  const slug = useMemo(() => {
    if (typeof window !== "undefined") {
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

  if (!isMounted) return null;

  if (!slug) {
    return (
      <ErrorState
        title="Invalid Access"
        message="Please use your school's subdomain."
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (loading || (!pathshala && !error)) {
    return <Loading message="Syncing school data..." fullPage />;
  }

  if (error || !pathshala) {
    return (
      <ErrorState
        title="Pathshala Not Found"
        message={error || "Invalid school"}
        onRetry={() => fetchPathshalaBySubdomain(slug)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Outlet context={{ pathshala, slug }} />
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default TenantLayout;
