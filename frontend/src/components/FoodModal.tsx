import React from "react";
import { X, Star, Clock, Flame, ShieldAlert } from "lucide-react";
import type { Food } from "../types";

interface FoodModalProps {
  food: Food | null;
  onClose: () => void;
  onAddToCart: (food: Food) => void;
}

export const FoodModal: React.FC<FoodModalProps> = ({
  food,
  onClose,
  onAddToCart,
}) => {
  if (!food) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-charcoal/65 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl rounded-[2.5rem] bg-white overflow-hidden shadow-2xl border border-cream-dark z-10 transition-smooth scale-100 flex flex-col md:flex-row max-h-[90vh] md:max-h-none">
        
        {/* Close Button Mobile/Global */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/95 border border-cream-dark text-charcoal/80 hover:text-terracotta hover:bg-white shadow-sm transition-smooth cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Side: Photo */}
        <div className="w-full md:w-1/2 aspect-video md:aspect-auto md:h-inherit relative bg-cream-dark">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
          />
          {/* Accent bottom overlay for image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Right Side: Copy/Actions */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between overflow-y-auto text-left">
          
          {/* Scrollable details container */}
          <div>
            {/* Header tags */}
            <div className="flex items-center space-x-2.5 mb-4">
              <span className="bg-cream-dark px-3 py-1 rounded-full text-xs font-bold text-sage">
                {food.category}
              </span>
              {food.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-terracotta/10 px-3 py-1 rounded-full text-xs font-bold text-terracotta"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <span className="text-xs font-bold text-terracotta uppercase tracking-wider block mb-1">
              Prepared by {food.restaurantName}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal mb-3 pr-8">
              {food.name}
            </h2>

            {/* Ratings & Prep */}
            <div className="flex items-center space-x-6 text-sm text-charcoal/60 font-semibold mb-6">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-gold fill-gold" />
                <span className="text-charcoal font-bold">{food.rating}</span>
                <span>({food.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock className="h-4 w-4 text-charcoal/40" />
                <span>{food.prepTime}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Flame className="h-4 w-4 text-charcoal/40" />
                <span>{food.calories} kcal</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-charcoal/70 text-sm font-light leading-relaxed mb-6">
              {food.description}
            </p>

            {/* Ingredients */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-3">
                KEY INGREDIENTS
              </h4>
              <div className="flex flex-wrap gap-2">
                {food.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="bg-cream-dark border border-cream-dark px-3 py-1 rounded-lg text-xs font-medium text-charcoal/80"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Info notice */}
            <div className="flex items-start space-x-2.5 p-3 rounded-2xl bg-cream-dark border border-cream-dark/60 text-xs text-charcoal/60 font-medium mb-8">
              <ShieldAlert className="h-4 w-4 text-terracotta flex-shrink-0 mt-0.5" />
              <span>We prepare gourmet meals with organic products. Please contact us for allergy customisations.</span>
            </div>
          </div>

          {/* Checkout/Add logic */}
          <div className="flex items-center justify-between pt-6 border-t border-cream-dark mt-auto">
            <div>
              <span className="text-xs text-charcoal/45 block font-bold uppercase">TOTAL PRICE</span>
              <span className="text-2xl font-extrabold text-charcoal">
                ${food.price.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => {
                onAddToCart(food);
                onClose();
              }}
              className="px-8 py-4 bg-charcoal hover:bg-terracotta text-white text-sm font-bold rounded-2xl transition-smooth shadow-lg shadow-charcoal/10 hover:shadow-terracotta/20 cursor-pointer hover:scale-102 active:scale-98"
            >
              Add to Order
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
