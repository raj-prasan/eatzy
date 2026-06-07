import React from "react";
import { Star, Clock, Plus, Flame } from "lucide-react";
import type { Food } from "../types";

interface FoodCardProps {
  food: Food;
  onAddToCart: (food: Food) => void;
  onCardClick: (food: Food) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  food,
  onAddToCart,
  onCardClick,
}) => {
  const primaryTag = food.tags && food.tags[0];

  return (
    <div
      onClick={() => onCardClick(food)}
      className="group flex flex-col justify-between min-w-0 overflow-hidden bg-white rounded-3xl border border-cream-dark shadow-[0_4px_20px_-5px_rgba(21,21,21,0.02)] transition-smooth hover:shadow-[0_20px_40px_-15px_rgba(21,21,21,0.06)] hover:-translate-y-1.5 cursor-pointer"
    >
      {/* Food Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-cream-dark">
        <img
          src={food.image}
          alt={food.name}
          className="h-full w-full object-cover transition-smooth group-hover:scale-105 duration-700"
        />
        {/* Top Overlay Badge */}
        {primaryTag && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-charcoal uppercase tracking-widest flex items-center space-x-1 shadow-sm">
            <Flame className="h-3 w-3 text-terracotta fill-current" />
            <span>{primaryTag}</span>
          </div>
        )}
      </div>

      {/* Details Area */}
      <div className="p-6 grow flex flex-col justify-between text-left">
        <div>
          {/* Metadata Row */}
          <div className="flex items-center justify-between text-xs text-charcoal/50 font-medium mb-2.5">
            <span className="bg-cream-dark px-2.5 py-0.5 rounded-md text-sage font-semibold">
              {food.category}
            </span>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Star className="h-3.5 w-3.5 text-gold fill-gold" />
                <span className="font-bold text-charcoal/85">{food.rating}</span>
                <span className="text-charcoal/40 font-normal">({food.reviews})</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3.5 w-3.5 text-charcoal/30" />
                <span>{food.prepTime}</span>
              </div>
            </div>
          </div>

          {/* Name & Description */}
          <span className="text-[11px] font-bold text-terracotta/90 uppercase tracking-wider block mb-1">
            {food.restaurantName}
          </span>
          <h3 className="text-lg font-bold text-charcoal group-hover:text-terracotta transition-smooth mb-2 line-clamp-1">
            {food.name}
          </h3>
          <p className="text-sm text-charcoal/60 font-light mb-5 line-clamp-2 leading-relaxed">
            {food.description}
          </p>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between pt-4 border-t border-cream-dark">
          <div>
            <span className="text-xs text-charcoal/45 block font-semibold">PRICE</span>
            <span className="text-xl font-extrabold text-charcoal">
              ${food.price.toFixed(2)}
            </span>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent modal trigger
              onAddToCart(food);
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-charcoal hover:bg-terracotta text-white transition-smooth shadow-sm cursor-pointer hover:scale-105 active:scale-95"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
