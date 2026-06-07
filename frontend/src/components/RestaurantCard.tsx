import React from "react";
import { Star, Clock, Bike } from "lucide-react";
import type { Restaurant } from "../types";

interface RestaurantCardProps {
  restaurant: Restaurant;
  isSelected: boolean;
  onClick: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group flex flex-col w-full min-w-0 overflow-hidden bg-white rounded-3xl border transition-smooth cursor-pointer ${
        isSelected
          ? "border-terracotta ring-2 ring-terracotta/20 shadow-[0_15px_30px_-5px_rgba(230,92,64,0.08)] scale-102"
          : "border-cream-dark shadow-[0_4px_20px_-5px_rgba(21,21,21,0.01)] hover:border-cream-dark hover:shadow-[0_15px_30px_-10px_rgba(21,21,21,0.05)] hover:-translate-y-1"
      }`}
    >
      {/* Cover Image */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-cream-dark">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover transition-smooth group-hover:scale-103 duration-700"
        />
        {/* Rating overlay badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-charcoal flex items-center space-x-1 shadow-sm">
          <Star className="h-3.5 w-3.5 text-gold fill-gold" />
          <span>{restaurant.rating}</span>
        </div>
      </div>

      {/* Details info */}
      <div className="p-6 text-left grow flex flex-col justify-between">
        <div>
          {/* Cuisine / Tags */}
          <span className="text-xs text-terracotta font-bold uppercase tracking-wider block mb-1.5">
            {restaurant.cuisine}
          </span>
          {/* Name */}
          <h3 className="text-lg font-bold text-charcoal group-hover:text-terracotta transition-smooth mb-2">
            {restaurant.name}
          </h3>
          {/* Description */}
          <p className="text-xs text-charcoal/60 font-light leading-relaxed mb-4 line-clamp-2">
            {restaurant.description}
          </p>
        </div>

        {/* Stats footer row */}
        <div className="flex items-center space-x-4 pt-4 border-t border-cream-dark text-xs text-charcoal/65 font-semibold mt-auto">
          <div className="flex items-center space-x-1">
            <Clock className="h-3.5 w-3.5 text-charcoal/40" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bike className="h-3.5 w-3.5 text-charcoal/40" />
            <span>
              {restaurant.deliveryFee === 0
                ? "FREE Del."
                : `$${restaurant.deliveryFee.toFixed(2)} Del.`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
