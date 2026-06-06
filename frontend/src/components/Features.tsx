import React from "react";
import { UtensilsCrossed, Sparkles, Leaf, Map } from "lucide-react";

export const Features: React.FC = () => {
  const steps = [
    {
      icon: <UtensilsCrossed className="h-6 w-6 text-terracotta" />,
      title: "Chef-Curated Dishes",
      desc: "Browse a highly refined menu prepared by top Michelin-starred chefs in gourmet kitchens.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-terracotta" />,
      title: "Organic Freshness",
      desc: "100% of our products and vegetables are sourced daily from local organic family farms.",
    },
    {
      icon: <Map className="h-6 w-6 text-terracotta" />,
      title: "Swift Eco-Delivery",
      desc: "Delivered using carbon-neutral vehicles in insulated, sealed, biodegradable packaging.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-cream-dark/30 border-y border-cream-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta mb-2.5 block">
            HOW WE OPERATE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-charcoal tracking-tight mb-4">
            The gourmet food standard
          </h2>
          <p className="text-sm sm:text-base text-charcoal/65 font-light">
            We are redefining home food delivery by merging the convenience of app ordering with the strict standards of Michelin star cuisine.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group bg-white p-8 rounded-3xl border border-cream-dark shadow-[0_4px_20px_-5px_rgba(21,21,21,0.01)] hover:shadow-[0_15px_30px_-10px_rgba(21,21,21,0.05)] transition-smooth text-left hover:-translate-y-1"
            >
              <div className="h-12 w-12 rounded-2xl bg-cream-dark flex items-center justify-center mb-6 transition-smooth group-hover:bg-terracotta group-hover:text-white">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-2">{step.title}</h3>
              <p className="text-sm text-charcoal/60 font-light leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Highlighted Banner */}
        <div className="w-full bg-charcoal rounded-[2.5rem] p-8 md:p-14 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between text-left shadow-xl">
          <div className="absolute top-[-50%] right-[-10%] h-[350px] w-[350px] rounded-full bg-terracotta/20 opacity-40 blur-3xl" />
          
          <div className="max-w-xl mb-8 md:mb-0 relative z-10">
            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
              <Leaf className="h-3.5 w-3.5 text-green-400" />
              <span>100% Biodegradable Materials</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold mb-3">
              Zero plastic, zero compromises
            </h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Every delivery container, cup, and utensil we use is made from plant-based, biodegradable cornstarch. Enjoy gourmet dining that respects the earth.
            </p>
          </div>

          <div className="flex-shrink-0 relative z-10">
            <a
              href="#menu"
              className="inline-flex items-center justify-center px-8 py-4 bg-terracotta hover:bg-terracotta-hover text-white text-sm font-bold rounded-2xl shadow-lg transition-smooth hover:scale-102 cursor-pointer active:scale-98"
            >
              Order Carbon-Neutral Now
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
