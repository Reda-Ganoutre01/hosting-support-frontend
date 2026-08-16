import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/login-form";
import { AuthContext } from "@/context/AuthContext.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-slate-50 p-6 md:p-10 dark:bg-slate-950">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
