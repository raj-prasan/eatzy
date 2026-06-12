import { useEffect, useState } from "react";
import { Search, Star, ShieldCheck, Flame } from "lucide-react";
import { useSearchParams } from "react-router-dom";


export const Hero = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search , setSearch]= useState(searchParams.get("search") || "");
  useEffect(()=>{
    const timer = setTimeout(()=>{
      if(search){
        setSearchParams({search})
      }
      else{
        setSearchParams({})
      }
    }, 400)
    return ()=> clearTimeout(timer)
  },[search])
  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20">
      {/* Background decoration elements */}
      <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-cream-dark opacity-40 blur-3xl" />
      <div className="absolute bottom-[10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-terracotta/5 opacity-30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Search */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Top Badge */}
            <div className="inline-flex self-start items-center space-x-2 px-4 py-1.5 bg-terracotta/10 text-terracotta rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <Flame className="h-3.5 w-3.5 fill-current" />
              <span>Gourmet Delivery Experience</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal leading-[1.15] mb-6">
              Epicurean dishes, <br />
              delivered to your <span className="text-terracotta italic font-normal font-serif">doorstep.</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-charcoal/70 font-light max-w-xl mb-8 leading-relaxed">
              Experience chef-crafted gourmet meals prepared with fresh, locally sourced organic ingredients. Eatzy brings the fine-dining restaurant experience to the comfort of your home.
            </p>

            {/* Search Input Box */}
            <div className="relative max-w-xl w-full bg-white rounded-2xl p-2 shadow-[0_15px_30px_-10px_rgba(21,21,21,0.08)] border border-cream-dark mb-10 transition-smooth focus-within:border-terracotta/50 focus-within:shadow-[0_15px_35px_-10px_rgba(230,92,64,0.12)]">
              <div className="flex items-center">
                <Search className="h-5 w-5 text-charcoal/40 ml-3.5 flex-shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search gourmet pasta, truffle burgers, green salad..."
                  className="w-full bg-transparent px-3 py-3.5 text-sm text-charcoal outline-none placeholder-charcoal/45 font-medium"
                />
                <a
                  href="#menu"
                  className="bg-charcoal hover:bg-terracotta text-white font-medium text-sm px-6 py-3.5 rounded-xl transition-smooth shadow-sm flex-shrink-0 hidden sm:block"
                >
                  Explore Menu
                </a>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 max-w-lg border-t border-cream-dark pt-8">
              <div>
                <span className="block text-3xl font-extrabold text-charcoal">4.9★</span>
                <span className="text-xs text-charcoal/60 uppercase tracking-wider font-semibold">12k+ Reviews</span>
              </div>
              <div>
                <span className="block text-3xl font-extrabold text-charcoal">18m</span>
                <span className="text-xs text-charcoal/60 uppercase tracking-wider font-semibold">Avg. Delivery</span>
              </div>
              <div>
                <span className="block text-3xl font-extrabold text-charcoal">100%</span>
                <span className="text-xs text-charcoal/60 uppercase tracking-wider font-semibold">Organic Produce</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Elements */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-square rounded-[2rem] bg-cream-dark overflow-hidden border-4 border-white shadow-2xl transition-smooth hover:rotate-1">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600"
                alt="Seared Salmon Grain Bowl"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
              
              {/* Overlay: Dish Label */}
              <div className="absolute bottom-6 left-6 text-white text-left">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold mb-1 block">TODAY'S SIGNATURE</span>
                <h3 className="text-lg font-bold">Salmon Avocado Grain Bowl</h3>
              </div>
            </div>

            {/* Floating Card 1: Fast delivery */}
            <div className="absolute -left-8 top-16 bg-white p-4 rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06)] border border-cream-dark flex items-center space-x-3 transition-smooth hover:scale-105">
              <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="text-left">
                <span className="block text-xs text-charcoal/50 font-semibold uppercase">Hygiene & Safety</span>
                <span className="text-sm font-bold text-charcoal">Double Sealed Box</span>
              </div>
            </div>

            {/* Floating Card 2: Chef signature */}
            <div className="absolute -right-6 bottom-10 bg-white p-4 rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06)] border border-cream-dark flex items-center space-x-3 transition-smooth hover:scale-105">
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=100"
                  alt="Chef"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=100"
                  alt="Chef Assistant"
                />
              </div>
              <div className="text-left">
                <span className="text-sm font-bold text-charcoal">Michelin Star Chefs</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-gold text-gold" />
                  <span className="text-xs font-semibold text-charcoal/70">5.0 (400+)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
