import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignupForm } from "@/components/signup-form";
import { AuthContext } from "@/context/AuthContext.jsx";
import { checkIsAdmin } from "@/lib/isAdmin";
import { BackButton } from "@/components/ui/BackButton.jsx";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      const isAdmin = checkIsAdmin(user);
      if (isAdmin) {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 bg-slate-50 p-6 md:p-10 dark:bg-slate-950">
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
        <BackButton />
      </div>

      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}

export { RegisterPage as SignupPage };
