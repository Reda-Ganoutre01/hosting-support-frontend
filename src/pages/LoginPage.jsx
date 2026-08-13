import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, AlertCircle, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button.jsx";
import { AuthContext } from "@/context/AuthContext.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error, isAuthenticated, clearError } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (clearError) clearError();

    const result = await login({ email, username: email, password, rememberMe });

    if (result?.type?.endsWith("/fulfilled")) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 bg-white text-slate-900">
          <div className="max-w-xl mx-auto w-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Espace Client</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight">Connexion</h1>
              </div>
            </div>

            <p className="mb-8 text-slate-600 sm:text-lg">
              Veuillez vous connecter pour accéder à votre espace client. Si vous n’avez pas encore de compte, créez-en un gratuitement.
            </p>

            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm font-medium">
                <AlertCircle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
                <div>
                  <p className="font-bold">Échec de connexion</p>
                  <p className="text-red-600 mt-0.5">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Adresse Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemple.com"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex items-center justify-between gap-3 text-sm text-slate-600">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    disabled={loading}
                  />
                  Se souvenir de moi
                </label>
                <a href="#" className="font-semibold text-blue-600 hover:text-blue-700">
                  Mot de passe oublié ?
                </a>
              </div>

              <Button type="submit" variant="orange" size="lg" className="w-full flex items-center justify-center gap-2" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Connexion en cours...</span>
                  </>
                ) : (
                  <span>Se connecter</span>
                )}
              </Button>
            </form>
          </div>
        </div>

        <div className="relative hidden lg:flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(248,113,113,0.25),_transparent_30%),#030b16]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.18),_transparent_22%)]" />
          <div className="relative z-10 max-w-md px-10 py-12 text-white">
            <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Vala Creative Internet Solutions</p>
            <h2 className="mt-6 text-4xl font-black tracking-tight">Bienvenue dans votre espace client</h2>
            <p className="mt-5 text-base leading-7 text-slate-300">
              Connectez-vous pour acheter nos produits et services, gérer vos domaines et surveiller votre hébergement avec un tableau de bord moderne.
            </p>

            <div className="mt-10 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-3xl bg-blue-500/15 text-blue-200">
                  <span className="text-lg font-bold">01</span>
                </div>
                <div>
                  <h3 className="font-semibold">Accès sécurisé</h3>
                  <p className="text-sm text-slate-300">Authentification rapide et contrôle d’accès sécurisé.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-3xl bg-orange-500/15 text-orange-200">
                  <span className="text-lg font-bold">02</span>
                </div>
                <div>
                  <h3 className="font-semibold">Gestion complète</h3>
                  <p className="text-sm text-slate-300">Suivez vos commandes, votre facturation et votre support en un seul endroit.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-3xl bg-emerald-500/15 text-emerald-200">
                  <span className="text-lg font-bold">03</span>
                </div>
                <div>
                  <h3 className="font-semibold">Support réactif</h3>
                  <p className="text-sm text-slate-300">Assistance disponible pour vous aider dès que nécessaire.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
