import React, { useState } from "react";
import { ShoppingBag, User as UserIcon, MapPin, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { User } from "../types";
import { useAppData } from "../context/AppContext";

interface NavbarProps {
  cartCount: number;
  user: User | null;
  onLogOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onLogOut,
}) => {
  const {isAuth, user} = useAppData()
  const currLocation = useLocation()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-cream-dark glass-effect transition-smooth">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-3xl font-extrabold tracking-tight text-charcoal">
              Eatzy<span className="text-terracotta text-4xl">.</span>
            </span>
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1 bg-cream-dark rounded-full text-xs text-sage font-medium">
              <MapPin className="h-3.5 w-3.5 text-terracotta" />
              <span>India</span>
            </div>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/#restaurants"
              className="text-sm font-medium text-charcoal/80 hover:text-terracotta transition-smooth relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-terracotta after:transition-all"
            >
              Kitchens
            </a>
            <a
              href="/#menu"
              className="text-sm font-medium text-charcoal/80 hover:text-terracotta transition-smooth relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-terracotta after:transition-all"
            >
              The Menu
            </a>
            <a
              href="/#how-it-works"
              className="text-sm font-medium text-charcoal/80 hover:text-terracotta transition-smooth relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-terracotta after:transition-all"
            >
              How It Works
            </a>
            <a
              href="/#testimonials"
              className="text-sm font-medium text-charcoal/80 hover:text-terracotta transition-smooth relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-terracotta after:transition-all"
            >
              Reviews
            </a>
            <a
              href="/#about"
              className="text-sm font-medium text-charcoal/80 hover:text-terracotta transition-smooth relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-terracotta after:transition-all"
            >
              Our Story
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 relative">
            
            {/* User Login/Dropdown Trigger */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center focus:outline-none cursor-pointer"
                >
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover border-2 border-terracotta hover:scale-105 transition-smooth"
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <>
                    {/* Backdrop to close dropdown on outer click */}
                    <div
                      onClick={() => setIsDropdownOpen(false)}
                      className="fixed inset-0 z-10"
                    />
                    
                    <div className="absolute right-0 mt-3.5 w-56 rounded-2xl bg-white border border-cream-dark p-3.5 shadow-xl z-20 transition-smooth text-left">
                      <div className="px-2 py-1.5 mb-2">
                        <span className="block text-sm font-bold text-charcoal">
                          {user.name}
                        </span>
                        <span className="block text-xs text-charcoal/50 truncate">
                          {user.email}
                        </span>
                      </div>
                      
                      <div className="h-[1px] bg-cream-dark my-2" />
                      
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          onLogOut();
                        }}
                        className="w-full flex items-center space-x-2.5 px-2 py-2.5 rounded-xl text-xs font-semibold text-charcoal/70 hover:text-red-500 hover:bg-red-50 transition-smooth cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="p-2 rounded-full hover:bg-cream-dark text-charcoal/80 transition-smooth cursor-pointer"
              >
                <UserIcon className="h-5.5 w-5.5" />
              </button>
            )}

            {/* Shopping Cart Button */}
            <button
              onClick={() => navigate("/cart")}
              className="group relative flex items-center justify-center p-2.5 bg-charcoal hover:bg-terracotta text-white rounded-full shadow-md transition-smooth active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-terracotta text-[10px] font-bold text-white ring-2 ring-cream group-hover:bg-charcoal group-hover:ring-terracotta transition-smooth">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
};


