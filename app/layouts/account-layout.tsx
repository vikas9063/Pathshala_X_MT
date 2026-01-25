"use client";

import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import ErrorState from "~/components/error/error-comp";
import Loading from "~/components/loading/loading";
import { useLoggedInUserStore } from "~/store/useLoggedinUserStore";
import { useTenantOrPathshalaStore } from "~/store/useTenantStore";

const AccountLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);

  const { pathshala, loading: tenantLoading } = useTenantOrPathshalaStore();
  const { 
    user, 
    isLoggedIn, 
    loading: userLoading, 
    error, 
    getLoggedInUser,
    hasAttempted 
  } = useLoggedInUserStore();

  useEffect(() => { setIsMounted(true); }, []);

  // 1. Fetch User Logic
  useEffect(() => {
    if (isMounted && pathshala?.subdomain && !user && !userLoading && !hasAttempted) {
      getLoggedInUser(pathshala.subdomain);
    }
  }, [isMounted, pathshala?.subdomain, user, userLoading, hasAttempted, getLoggedInUser]);

  // 2. Redirect Logic - REFINED
  useEffect(() => {
    // Only proceed if all async operations have settled
    const isAuthResolutionFinished = isMounted && !tenantLoading && hasAttempted && !userLoading;

    if (isAuthResolutionFinished) {
      // CRITICAL: Only redirect if we definitely have no user and no login status
      if (!isLoggedIn && !user) {
        console.warn("Auth check finished: No user found. Redirecting...");
        navigate("/login", { replace: true, state: { from: location } });
      }
    }
  }, [isMounted, tenantLoading, userLoading, isLoggedIn, user, hasAttempted, navigate, location]);

  // ---------------- RENDER LADDER ----------------

  if (!isMounted) return null;

  // Level 1: Tenant Check
  if (tenantLoading || !pathshala) {
    return <Loading message="Syncing environment..." fullPage />;
  }

  // Level 2: Auth Check - Wait until we have attempted AND finished loading
  if (userLoading || (!hasAttempted && !error)) {
    return <Loading message="Loading your account..." fullPage />;
  }

  // Level 3: API Error (Network error, 500, etc.)
  if (error && !user && !isLoggedIn) {
     // If it's a 401, we let the useEffect above handle the redirect.
     // If it's a real error (like 500), we show the error state.
     if (!error.toLowerCase().includes("unauthorized") && !error.toLowerCase().includes("401")) {
        return (
          <div className="flex h-screen items-center justify-center p-6">
            <ErrorState
              title="Connection Error"
              message={error}
              onRetry={() => getLoggedInUser(pathshala.subdomain)}
            />
          </div>
        );
     }
  }

  // Level 4: Final Guard
  // If we have a user, render the UI. 
  // If we don't, show loading while the useEffect navigate() kicks in.
  if (!user || !isLoggedIn) {
    return <Loading message="Redirecting..." fullPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
       <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="font-bold text-slate-900 tracking-tight">Account Dashboard</h1>
          <p className="text-xs text-primary font-medium uppercase tracking-wider">
            {pathshala.pathshalaName}
          </p>
        </div>
        <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                <p className="text-[10px] text-muted-foreground uppercase">{user.role || 'Student'}</p>
            </div>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto animate-in fade-in duration-700">
        <Outlet context={{ user, pathshala }} />
      </main>
    </div>
  );
};

export default AccountLayout;