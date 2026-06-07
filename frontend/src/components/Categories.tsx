import React from "react";
import { CATEGORIES } from "../data/foods";

interface CategoriesProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <div className="w-full mb-10 overflow-x-hidden pb-4 scrollbar-none">
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 px-4">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap cursor-pointer transition-smooth ${
                isActive
                  ? "bg-terracotta text-white shadow-md shadow-terracotta/20 scale-105"
                  : "bg-cream-dark text-charcoal/70 hover:bg-cream-dark/80 hover:text-charcoal hover:scale-102"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
