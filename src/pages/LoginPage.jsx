import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/login-form";
import { AuthContext } from "@/context/AuthContext.jsx";
import { checkIsAdmin } from "@/lib/isAdmin";

export default function LoginPage() {
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
    <div className="flex min-h-svh w-full items-center justify-center bg-slate-50 p-6 md:p-10 dark:bg-slate-950">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
