import React, { useState } from "react";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed successfully! Welcome to the club. 💌", {
      style: {
        background: "#151515",
        color: "#fbfaf7",
        borderRadius: "16px",
      },
    });
    setEmail("");
  };

  return (
    <footer id="about" className="bg-charcoal text-white pt-20 pb-10 relative overflow-hidden">
      <div className="absolute bottom-[-10%] left-[-10%] h-[300px] w-[300px] rounded-full bg-terracotta/10 opacity-30 blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Logo column */}
          <div className="md:col-span-4 text-left">
            <span className="text-3xl font-extrabold tracking-tight text-white block mb-4">
              Eatzy<span className="text-terracotta text-4xl">.</span>
            </span>
            <p className="text-white/60 text-sm font-light leading-relaxed max-w-sm mb-6">
              Sourcing the finest local farm ingredients to cook premium gourmet meals, delivered straight to your door in plant-based containers.
            </p>
            {/* Socials */}
            <div className="flex space-x-3.5">
              <a href="#" className="h-10 w-10 bg-white/5 hover:bg-terracotta hover:text-white rounded-full flex items-center justify-center transition-smooth text-white/70">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="h-10 w-10 bg-white/5 hover:bg-terracotta hover:text-white rounded-full flex items-center justify-center transition-smooth text-white/70">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="h-10 w-10 bg-white/5 hover:bg-terracotta hover:text-white rounded-full flex items-center justify-center transition-smooth text-white/70">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-6">Company</h4>
            <ul className="space-y-3.5 text-sm text-white/60 font-light">
              <li><a href="#" className="hover:text-white transition-smooth">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Our Chefs</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Contact Us</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-6">Explore</h4>
            <ul className="space-y-3.5 text-sm text-white/60 font-light">
              <li><a href="#menu" className="hover:text-white transition-smooth">The Menu</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-smooth">How It Works</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-smooth">Testimonials</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-6">THE CHEF'S LETTER</h4>
            <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
              Subscribe to receive curated weekly gourmet recipes, secret discounts, and new menu item reveals.
            </p>
            <form onSubmit={handleSubscribe} className="relative bg-white/5 border border-white/10 rounded-2xl p-1.5 focus-within:border-white/30 transition-smooth">
              <div className="flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-transparent px-3.5 py-3 text-sm text-white outline-none placeholder-white/40 font-medium"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-terracotta text-charcoal hover:text-white p-3 rounded-xl transition-smooth shadow-sm cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/45 font-medium">
          <p>© {new Date().getFullYear()} Eatzy Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-smooth">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-smooth">Terms of Service</a>
            <a href="#" className="hover:text-white transition-smooth">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
