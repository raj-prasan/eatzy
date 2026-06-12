import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { RestaurantCard } from "../components/RestaurantCard";
import { Categories } from "../components/Categories";
import { FoodCard } from "../components/FoodCard";
import { FoodModal } from "../components/FoodModal";
import { Features } from "../components/Features";
import { Testimonials } from "../components/Testimonials";
import { Footer } from "../components/Footer";
import { RESTAURANTS, FOODS } from "../data/foods";
import type { Food } from "../types";
import { useAppData } from "../context/AppContext";
import { useSearchParams } from "react-router-dom";

const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  
  const {user, setUser, setIsAuth} = useAppData()

  // Cart Handlers - show toast and guide user to Cart page
  const handleAddToCart = (food: Food) => {
    toast.success(`${food.name} added to cart! View at Cart page.`, {
      style: {
        background: "#151515",
        color: "#fbfaf7",
        borderRadius: "16px",
      },
    });
  };

  const handleLogOut = () => {
    cookieStore.delete("token")
    setUser(null);
    setIsAuth(false);
    toast.success("Successfully logged out. Come back soon! 👋", {
      style: {
        background: "#151515",
        color: "#fbfaf7",
        borderRadius: "16px",
      },
    });
  };

  // Filter Foods
  const filteredFoods = FOODS.filter((food) => {
    const matchesRestaurant =
      !selectedRestaurantId || food.restaurantId === selectedRestaurantId;
    const matchesCategory =
      activeCategory === "All" || food.category === activeCategory;
    const matchesSearch =
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRestaurant && matchesCategory && matchesSearch;
  });

  const activeRestaurantName = selectedRestaurantId
    ? RESTAURANTS.find((r) => r.id === selectedRestaurantId)?.name
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Toast provider */}
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Navigation */}
      <Navbar
        cartCount={4}
        user={user}
        onLogOut={handleLogOut}
      />

      {/* Hero Header */}
      <Hero />

      {/* Restaurants Section */}
      <section id="restaurants" className="py-20 bg-cream mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center scroll-mt-20">
        <span className="text-xs font-bold uppercase tracking-widest text-terracotta mb-2.5 block">
          PARTNER KITCHENS
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-charcoal tracking-tight mb-4">
          Order from your favorite restaurants
        </h2>
        <p className="text-sm text-charcoal/65 font-light max-w-2xl mx-auto mb-12">
          Select an artisanal kitchen below to explore their exclusive gourmet dishes. We handle the delivery in temperature-sealed biodegradable boxes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {RESTAURANTS.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              isSelected={selectedRestaurantId === restaurant.id}
              onClick={() => {
                const nextSelection = selectedRestaurantId === restaurant.id ? null : restaurant.id;
                setSelectedRestaurantId(nextSelection);
                
                // Smooth scroll down to the Menu catalog section
                setTimeout(() => {
                  const menuSec = document.getElementById("menu");
                  if (menuSec) {
                    menuSec.scrollIntoView({ behavior: "smooth" });
                  }
                }, 100);
              }}
            />
          ))}
        </div>
      </section>

      {/* Menu Listing */}
      <section id="menu" className="py-20 mx-auto min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8 text-center scroll-mt-20 border-t border-cream-dark">
        <span className="text-xs font-bold uppercase tracking-widest text-terracotta mb-2.5 block">
          CURATED DELICACIES
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-charcoal tracking-tight mb-4">
          Explore our gourmet menu
        </h2>
        
        {activeRestaurantName ? (
          <div className="mb-8 inline-flex items-center justify-center space-x-3 bg-terracotta/10 px-4 py-2 rounded-full mx-auto transition-smooth animate-fade-in">
            <span className="text-xs font-bold text-terracotta uppercase">
              Showing dishes from: <span className="underline">{activeRestaurantName}</span>
            </span>
            <button
              onClick={() => setSelectedRestaurantId(null)}
              className="text-xs font-extrabold text-charcoal hover:text-terracotta underline cursor-pointer"
            >
              Show All Restaurants
            </button>
          </div>
        ) : (
          <p className="text-sm text-charcoal/50 font-light mb-8 max-w-lg mx-auto">
            Browse items from all kitchens, or select a kitchen above to filter.
          </p>
        )}

        {/* Categories filters */}
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Food Cards Grid */}
        {filteredFoods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                onAddToCart={handleAddToCart}
                onCardClick={setSelectedFood}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-charcoal/50 font-light">
              No gourmet delicacies found matching your search. Try adjusting filters or select another kitchen!
            </p>
          </div>
        )}
      </section>

      {/* Value Proposition */}
      <Features />

      {/* Customer Reviews */}
      <Testimonials />

      {/* Footer */}
      <Footer />

      {/* Modal Detail Dialog */}
      <FoodModal
        food={selectedFood}
        onClose={() => setSelectedFood(null)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
};

export default HomePage;