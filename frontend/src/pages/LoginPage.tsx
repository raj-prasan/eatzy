import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authService } from "../main";
import axios from "axios";
import { useGoogleLogin } from '@react-oauth/google';
import{FcGoogle} from "react-icons/fc"
import { useAppData } from "../context/AppContext";

export const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {setIsAuth, setUser, user} = useAppData()
  const responseGoogle = async (authResult: any) => {
    setLoading(true);
    try {
      const result = await axios.post(`${authService}/api/v1/auth/login`, {
        code: authResult["code"],
      });
      cookieStore.set("token", result.data.token);
      setLoading(false);

      
      setLoading(false)
      setUser(result.data.user)
      setIsAuth(true)
      
      toast.success(`Welcome back, ${result.data.user.name}`, {
        duration: 4000,
        style: {
          background: "#151515",
          color: "#fbfaf7",
          borderRadius: "16px",
        },
      });
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code"
  })

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-cream relative overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] aspect-square rounded-full bg-terracotta/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] aspect-square rounded-full bg-sage/5 blur-[120px] pointer-events-none" />

      {/* Header Bar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between z-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 text-charcoal/70 hover:text-charcoal font-semibold text-sm transition-smooth cursor-pointer group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-smooth" />
          <span>Back to Menu</span>
        </button>
        <span className="text-3xl font-extrabold tracking-tight text-charcoal">
          Eatzy<span className="text-terracotta text-4xl">.</span>
        </span>
      </header>

      {/* Auth Container */}
      <main className="w-full flex-grow flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-cream-dark p-8 md:p-10 shadow-2xl transition-smooth flex flex-col text-left">
          {/* Header Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-charcoal tracking-tight mb-2">
              Sign In
            </h1>
            <p className="text-sm text-charcoal/50 font-light">
              Sign in to access your gourmet orders
            </p>
          </div>


          {/* Google Authentication Button */}
          <button
            onClick={googleLogin}
            disabled={loading}
            className="w-full py-3.5 border border-cream-dark hover:border-charcoal bg-white text-charcoal hover:bg-cream-dark/20 text-xs font-bold rounded-2xl flex items-center justify-center space-x-3 transition-smooth shadow-sm cursor-pointer hover:scale-[1.01] active:scale-95"
          >
            <FcGoogle size={20}/>
            <span>{!loading? "Continue with Google": "Signing In..."}</span>
          </button>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="w-full text-center py-6 text-[10px] text-charcoal/40 font-medium z-10 border-t border-cream-dark max-w-7xl mx-auto">
        &copy; {new Date().getFullYear()} Eatzy Inc. All rights reserved.
        Elegant gourmet delivery.
      </footer>
    </div>
  );
};
