import React from "react";
import { Star } from "lucide-react";

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Seraphina Vance",
      role: "Gastronomy Blogger",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      quote: "Eatzy completely blew my mind. The Truffle Tagliatelle tasted just as rich and delicate as it does in standard fine-dining restaurants. The packaging was stunning!",
      stars: 5,
    },
    {
      name: "Marcus Thorne",
      role: "Creative Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      quote: "A regular order for my office meetings. The Salmon Bowls are consistently fresh, healthy, and healthy. Speed and presentation are unmatched in the city.",
      stars: 5,
    },
    {
      name: "Evelyn Sterling",
      role: "Wellness Coach",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
      quote: "Finding high-quality organic grain bowls with eco-friendly packaging is usually a chore. Eatzy is a game-changer for my meal preps and organic nutrition.",
      stars: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 overflow-hidden relative">
      <div className="absolute top-[20%] left-[-15%] h-[400px] w-[400px] rounded-full bg-cream-dark opacity-30 blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta mb-2.5 block">
            CUSTOMER VOICE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-charcoal tracking-tight mb-4">
            Highly recommended by foodies
          </h2>
          <p className="text-sm sm:text-base text-charcoal/65 font-light">
            Don't just take our word for it. Here is what leading food bloggers and health advocates think of the Eatzy experience.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-cream-dark shadow-[0_4px_20px_-5px_rgba(21,21,21,0.01)] hover:shadow-[0_15px_30px_-10px_rgba(21,21,21,0.05)] hover:-translate-y-1 transition-smooth flex flex-col justify-between text-left"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center space-x-0.5 mb-5">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gold fill-gold" />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-charcoal/75 text-sm font-light leading-relaxed mb-6 italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* User Identity */}
              <div className="flex items-center space-x-3.5 pt-5 border-t border-cream-dark/60">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-charcoal">{rev.name}</h4>
                  <span className="text-xs text-charcoal/50 font-semibold">{rev.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
