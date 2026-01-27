import React, { useEffect, useState } from "react";
import {
  GraduationCap, Loader2, Lock, Mail, ArrowRight, ShieldCheck,
  BookOpen, Library, School, Microscope, Pi
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useTenantOrPathshalaStore } from "~/store/useTenantStore";
import api from "~/lib/server/ApiClient";
import type { LoginResponse } from "~/lib/types/user";
import type { ApiResponse } from "~/lib/types/patshala";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useLoggedInUserStore } from "~/store/useLoggedinUserStore";

const LoginPage = () => {
  const pathshala = useTenantOrPathshalaStore((state) => state.pathshala);
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { resetAuthState } = useLoggedInUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call your login service
      const res: ApiResponse<LoginResponse> = await api.post("/auth/login", {
        userName: formData.userName,
        password: formData.password,
      }, { headers: { 'X-PATHSHALA-ID': pathshala?.subdomain || '' } });

      if (res.success) {
        toast.success("Welcome back!", {
          description: "You have successfully logged in to the portal."
        });
        localStorage.setItem("accessToken", res.result.accessToken);
        localStorage.setItem("refreshToken", res.result.refreshToken);
        localStorage.setItem("userName", res.result.userName);

        navigate(`/${res.result.userName}/dashboard`);
        return;
      }
      toast.error("Access Denied", {
        description: "Please check your credentials and try again."
      });
      return;
    } catch (err: any) {
      console.error("Login failed:", err.message || err);
      toast.error("Login Error", { description: err.message || "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resetAuthState();
  }, [resetAuthState]);

  return (
    <div className="min-h-screen w-full flex bg-background">

      {/* LEFT SIDE: Educational Branding */}
      <div className="hidden lg:flex flex-col relative w-1/2 bg-primary overflow-hidden text-primary-foreground p-16 justify-between">

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-4 gap-12 p-8 transform -rotate-12 scale-110">
            {[...Array(20)].map((_, i) => (
              <React.Fragment key={i}>
                <BookOpen className="w-16 h-16" />
                <Pi className="w-16 h-16" />
                <Microscope className="w-16 h-16" />
                <GraduationCap className="w-16 h-16" />
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20">
            <School className="h-6 w-6 text-primary-foreground/80" />
          </div>
          <span className="text-xl font-bold tracking-wide uppercase text-primary-foreground/90">Student Portal</span>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-8">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
            Shape Your <br />
            <span className="text-primary-foreground/80">Future Today.</span>
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-md leading-relaxed">
            Connect with your classes, track your progress, and unlock your potential with {pathshala?.pathshalaName || "our advanced learning platform"}.
          </p>
        </div>

        {/* Footer badges */}
        <div className="relative z-10 flex gap-6 text-sm font-medium text-primary-foreground/60">
          <div className="flex items-center gap-2">
            <Library className="w-4 h-4" />
            <span>Digital Library</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Access</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-card md:p-16">
        <div className="w-full max-w-[420px] space-y-10">

          {/* Header for Form */}
          <div className="text-center lg:text-left space-y-2">
            <div className="inline-flex lg:hidden h-12 w-12 rounded-xl bg-primary items-center justify-center mb-6 shadow-xl shadow-primary/20">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Welcome Back</h2>
            <p className="text-muted-foreground">Please sign in to your institutional account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Username or Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="text"
                    className="h-12 pl-11 bg-muted/50 border-input rounded-xl focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                    placeholder="student@example.com"
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <a href="#" className="text-sm font-semibold text-primary hover:text-primary/80 hover:underline">Forgot password?</a>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="password"
                    className="h-12 pl-11 bg-muted/50 border-input rounded-xl focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 rounded-xl font-bold text-base shadow-lg shadow-primary/20 active:scale-[0.99] transition-all"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" /> Verifying...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Access Portal <ArrowRight className="h-5 w-5" />
                </span>
              )}
            </Button>
          </form>

          <div className="pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              Having trouble? <span className="font-semibold text-primary cursor-pointer hover:underline">Contact Administration</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
