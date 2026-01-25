import { create } from "zustand";
import { api } from "~/lib/server/ApiClient";
import type { ApiResponse, Pathshala } from "~/lib/types/patshala";

export type TenantOrPathshalaState = {
  pathshala: Pathshala | null;
  loading: boolean;
  error: string | null;
  state: "loading" | "error" | "loaded" | "idle";
  fetchPathshalaBySubdomain: (subdomain: string) => Promise<void>;
  clearPathshala: () => void;
};

export const useTenantOrPathshalaStore = create<TenantOrPathshalaState>((set) => ({
  pathshala: null,
  loading: false,
  error: null,
  state: "idle",

  fetchPathshalaBySubdomain: async (subdomain: string) => {
    set({ loading: true, error: null, state: "loading" });

    try {
      const res: ApiResponse<Pathshala> = await api.get(
        `/pathshala/verify/${subdomain}`
      );

      if (!res.success) {
        throw new Error(res.message);
      }

      localStorage.setItem("pathshala_subdomain", subdomain);

      set({
        pathshala: res.result,
        loading: false,
        error: null,
        state: "loaded",
      });
    } catch (err: any) {
      set({
        pathshala: null,
        loading: false,
        error: err?.response?.data?.message || err.message || "Failed to load pathshala",
        state: "error"
      });
    }
  },

  clearPathshala: () =>
    set({
      pathshala: null,
      error: null,
      loading: false,
      state: "idle"
    }),
}));
