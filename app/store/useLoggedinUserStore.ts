import { create } from "zustand";
import { api } from "~/lib/server/ApiClient";
import type { ApiResponse } from "~/lib/types/patshala";
import type { UserProfile } from "~/lib/types/user";

export type LoggedInUserStore = {
  user: UserProfile | null;
  isLoggedIn: boolean;
  loading: boolean;
  state: "loading" | "error" | "loaded" | "idle";
  error: string | null;

  getLoggedInUser: (subdomain: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  resetAuthState: () => void;
};

export const useLoggedInUserStore = create<LoggedInUserStore>((set, get) => ({
  user: null,
  isLoggedIn: false,
  loading: false,
  state: "idle",
  error: null,

  getLoggedInUser: async (subdomain: string) => {
    // Prevent duplicate calls if already loading or already logged in
    if (get().loading || (get().isLoggedIn && get().user)) return;

    set({ loading: true, error: null, state: "loading" });

    try {
      const res: ApiResponse<UserProfile> = await api.get("/user/loggedin-user", {
        headers: {
          "X-PATHSHALA-ID": subdomain,
        },
      });

      set({
        user: res.result as UserProfile,
        isLoggedIn: !!res.result,
        loading: false,
        state: "loaded",
        error: null,
      });
    } catch (err: any) {
      set({
        user: null,
        isLoggedIn: false,
        loading: false,
        state: "error",
        error: err?.response?.data?.message || err.message || "Session expired",
      });
    }
  },

  logoutUser: async () => {
    set({ loading: true });
    try {
      await api.post("/auth/logout");
    } finally {
      set({
        user: null,
        isLoggedIn: false,
        loading: false,
        state: "idle",
        error: null,
      });
    }
  },

  resetAuthState: () => set({ state: "idle", error: null, loading: false }),
}));