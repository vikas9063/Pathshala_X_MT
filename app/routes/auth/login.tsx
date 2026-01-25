import React, { useState } from "react";
import { GraduationCap, Loader2, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useTenantOrPathshalaStore } from "~/store/useTenantStore";
import api from "~/lib/server/ApiClient";
import type { LoginResponse } from "~/lib/types/user";
import type { ApiResponse } from "~/lib/types/patshala";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const pathshala = useTenantOrPathshalaStore((state) => state.pathshala);
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formData);

      // Call your login service
      const res: ApiResponse<LoginResponse> = await api.post("/auth/login", {
        userName: formData.userName,
        password: formData.password,
      }, { headers: { 'X-PATHSHALA-ID': pathshala?.subdomain || '' } });

      if (res.success) {
        toast.success("Login successful");
        localStorage.setItem("accessToken", res.result.accessToken);
        localStorage.setItem("refreshToken", res.result.refreshToken);
        localStorage.setItem("userName", res.result.userName);
        // Redirect or update UI as needed
        navigate(`/${res.result.userName}/dashboard`);
        return;
      }
      toast.error("Login failed");
      return;
    } catch (err: any) {
      console.error("Login failed:", err.message || err);
      alert(err.message || "Login failed");
    } finally {
      setLoading(false); // always stop loading
    }
  };


  return (
    <div className="relative min-h-[90vh] w-full flex items-center justify-center bg-[#f8fafc] overflow-hidden px-4">

      {/* Dynamic Background Blobs */}
      <div className="absolute -top-24 -left-24 h-125 w-125 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 h-125 w-125 rounded-full bg-blue-400/10 blur-[120px]" />

      <div className="relative z-10 grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* LEFT SIDE: Visual Section */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-slate-900 text-white relative">
          {/* Abstract Grid Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-size-[30px_30px]" />

          <div className="relative z-10 flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">{pathshala?.pathshalaName || "-"}</span>
          </div>

          <div className="relative z-10 space-y-6 mb-6">
            <h1 className="text-4xl font-extrabold leading-tight">
              The smart way to <br />
              <span className="text-primary-foreground">manage education.</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xs">
              Join 5,000+ students and teachers today in a seamless learning experience.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 py-3 px-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium text-slate-300">Secure AES-256 encrypted portal</p>
          </div>
        </div>

        {/* RIGHT SIDE: Login Form */}
        <div className="flex flex-col justify-center p-8 md:p-12 bg-white">
          <div className="mx-auto w-full max-w-md space-y-8">

            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-3xl font-bold text-slate-900">Sign In</h2>
              <p className="text-slate-500 font-medium">Welcome back! Please enter your details.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Username or email"
                    className="h-12 pl-10 rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/10 text-base"
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-slate-700">Password</label>
                  <a href="#" className="text-sm font-bold text-primary hover:text-primary/80">Forgot?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-12 pl-10 rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/10 text-base"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 rounded-xl text-base font-bold shadow-md shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <span className="flex items-center gap-2 justify-center">
                    Sign in to Portal <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>

            </form>

            <div className="text-center pt-4 text-sm text-slate-500">
              Need help accessing your account? <br />
              <span className="text-slate-900 font-bold cursor-pointer hover:underline">Contact IT Support</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
