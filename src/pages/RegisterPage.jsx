import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GalleryVerticalEnd } from "lucide-react";
import { SignupForm } from "@/components/signup-form";
import { AuthContext } from "@/context/AuthContext.jsx";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-slate-50 p-6 md:p-10 dark:bg-slate-950">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="flex items-center gap-2 self-center font-medium text-slate-900 dark:text-slate-50">
          <div className="flex size-6 items-center justify-center rounded-md bg-blue-600 text-white">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Vala Hosting
        </a>
        <SignupForm />
      </div>
    </div>
  );
}

export { RegisterPage as SignupPage };
