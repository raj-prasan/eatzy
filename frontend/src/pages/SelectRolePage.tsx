import { useState } from "react";
import { ShoppingBag, Bike, Store, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authService } from "../main";
import { useAppData } from '../context/AppContext'

type Role = "customer" | "rider" | "restaurant";

const SelectRolePage = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const navigate = useNavigate();
  const {user, setUser} = useAppData();

  const handleContinue = async() => {
    try {
      if (!selectedRole) return;
      else{
        const token = await cookieStore.get("token");
        const {data} = await axios.put(`${authService}/api/v1/auth/add/role`,{
          role:selectedRole,
        },{
          headers:{
            Authorization: `Bearer ${token?.value}`
          }
        })
        setUser(data.user)
        navigate("/", {replace: true})
      }
    } catch (error) {
      alert("Something got wrong.")
      console.log(error)
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-cream relative overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] aspect-square rounded-full bg-terracotta/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] aspect-square rounded-full bg-sage/5 blur-[120px] pointer-events-none" />

      {/* Header Bar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between z-10">
        
        <span className="text-3xl font-extrabold tracking-tight text-charcoal">
          Eatzy<span className="text-terracotta text-4xl">.</span>
        </span>
      </header>

      {/* Main content */}
      <main className="w-full flex-grow flex items-center justify-center p-4 z-10 my-4">
        <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-cream-dark p-8 md:p-12 shadow-2xl transition-smooth flex flex-col text-left">
          {/* Header Title */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-charcoal tracking-tight mb-3">
              Choose Your Journey
            </h1>
            <p className="text-sm md:text-base text-charcoal/50 font-light max-w-md mx-auto">
              Select how you would like to experience Eatzy. You can always change this later in your profile.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Customer Option */}
            <button
              onClick={() => setSelectedRole("customer")}
              className={`group flex flex-col items-start p-6 rounded-[2rem] border text-left transition-smooth cursor-pointer relative h-full min-h-[200px] ${
                selectedRole === "customer"
                  ? "border-terracotta bg-white shadow-lg ring-1 ring-terracotta/20 scale-[1.02]"
                  : "border-cream-dark bg-white/40 hover:border-charcoal/20 hover:bg-white/60 hover:scale-[1.01]"
              }`}
            >
              {/* Radio Dot */}
              <div className="absolute top-5 right-5 w-5 h-5 rounded-full border border-cream-dark flex items-center justify-center bg-white group-hover:border-charcoal/30">
                {selectedRole === "customer" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-terracotta" />
                )}
              </div>

              {/* Icon Container */}
              <div
                className={`p-3 rounded-2xl mb-5 transition-smooth ${
                  selectedRole === "customer"
                    ? "bg-terracotta/10 text-terracotta"
                    : "bg-cream-dark text-charcoal/70 group-hover:bg-cream-dark/80 group-hover:text-charcoal"
                }`}
              >
                <ShoppingBag className="h-6 w-6" />
              </div>

              {/* Text content */}
              <h3 className="text-xl font-bold text-charcoal mb-2">Customer</h3>
              <p className="text-xs md:text-sm text-charcoal/60 font-light leading-relaxed">
                Order gourmet meals from local culinary hot spots and track your delivery in real-time.
              </p>
            </button>

            {/* Rider Option */}
            <button
              onClick={() => setSelectedRole("rider")}
              className={`group flex flex-col items-start p-6 rounded-[2rem] border text-left transition-smooth cursor-pointer relative h-full min-h-[200px] ${
                selectedRole === "rider"
                  ? "border-terracotta bg-white shadow-lg ring-1 ring-terracotta/20 scale-[1.02]"
                  : "border-cream-dark bg-white/40 hover:border-charcoal/20 hover:bg-white/60 hover:scale-[1.01]"
              }`}
            >
              {/* Radio Dot */}
              <div className="absolute top-5 right-5 w-5 h-5 rounded-full border border-cream-dark flex items-center justify-center bg-white group-hover:border-charcoal/30">
                {selectedRole === "rider" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-terracotta" />
                )}
              </div>

              {/* Icon Container */}
              <div
                className={`p-3 rounded-2xl mb-5 transition-smooth ${
                  selectedRole === "rider"
                    ? "bg-terracotta/10 text-terracotta"
                    : "bg-cream-dark text-charcoal/70 group-hover:bg-cream-dark/80 group-hover:text-charcoal"
                }`}
              >
                <Bike className="h-6 w-6" />
              </div>

              {/* Text content */}
              <h3 className="text-xl font-bold text-charcoal mb-2">Rider</h3>
              <p className="text-xs md:text-sm text-charcoal/60 font-light leading-relaxed">
                Deliver fresh, gourmet experiences to our customers and earn on your own schedule.
              </p>
            </button>

            {/* Restaurant Option */}
            <button
              onClick={() => setSelectedRole("restaurant")}
              className={`group flex flex-col items-start p-6 rounded-[2rem] border text-left transition-smooth cursor-pointer relative h-full min-h-[200px] ${
                selectedRole === "restaurant"
                  ? "border-terracotta bg-white shadow-lg ring-1 ring-terracotta/20 scale-[1.02]"
                  : "border-cream-dark bg-white/40 hover:border-charcoal/20 hover:bg-white/60 hover:scale-[1.01]"
              }`}
            >
              {/* Radio Dot */}
              <div className="absolute top-5 right-5 w-5 h-5 rounded-full border border-cream-dark flex items-center justify-center bg-white group-hover:border-charcoal/30">
                {selectedRole === "restaurant" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-terracotta" />
                )}
              </div>

              {/* Icon Container */}
              <div
                className={`p-3 rounded-2xl mb-5 transition-smooth ${
                  selectedRole === "restaurant"
                    ? "bg-terracotta/10 text-terracotta"
                    : "bg-cream-dark text-charcoal/70 group-hover:bg-cream-dark/80 group-hover:text-charcoal"
                }`}
              >
                <Store className="h-6 w-6" />
              </div>

              {/* Text content */}
              <h3 className="text-xl font-bold text-charcoal mb-2">Restaurant</h3>
              <p className="text-xs md:text-sm text-charcoal/60 font-light leading-relaxed">
                Partner with us to expand your culinary reach and manage orders seamlessly.
              </p>
            </button>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`w-full py-4 px-6 rounded-full font-bold flex items-center justify-center space-x-2 transition-smooth tracking-wide ${
              selectedRole
                ? "bg-charcoal hover:bg-terracotta text-white shadow-md cursor-pointer hover:scale-[1.01] active:scale-95"
                : "bg-charcoal/10 text-charcoal/40 cursor-not-allowed"
            }`}
          >
            <span>
              {selectedRole
                ? `Continue as ${
                    selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)
                  }`
                : "Select a Role to Continue"}
            </span>
            <ArrowRight className="h-4 w-4" />
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

export default SelectRolePage;