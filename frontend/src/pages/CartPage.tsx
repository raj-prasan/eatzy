import React, { useState } from "react";
import { ShoppingBag, ArrowLeft, Minus, Plus, Trash2, Truck, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import type { User } from "../types";

export const CartPage: React.FC = () => {
  const navigate = useNavigate();

  // Read user from localStorage
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Successfully logged out. Come back soon! 👋", {
      style: {
        background: "#151515",
        color: "#fbfaf7",
        borderRadius: "16px",
      },
    });
  };

  // Mock static items
  const mockCartItems = [
    {
      food: {
        id: "1",
        name: "Truffle Tagliatelle Pasta",
        category: "Gourmet",
        price: 24.50,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600",
        restaurantName: "Bella Italia",
      },
      quantity: 1,
    },
    {
      food: {
        id: "2",
        name: "Salmon Avocado Grain Bowl",
        category: "Wellness",
        price: 18.75,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
        restaurantName: "Green Lotus",
      },
      quantity: 2,
    },
    {
      food: {
        id: "4",
        name: "Truffle Bistro Burger",
        category: "Fast-food",
        price: 19.50,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600",
        restaurantName: "Bistro Wagyu",
      },
      quantity: 1,
    },
  ];

  const subtotal = mockCartItems.reduce(
    (total, item) => total + item.food.price * item.quantity,
    0
  );
  
  const deliveryThreshold = 299.0;
  const deliveryFee = subtotal >= deliveryThreshold || subtotal === 0 ? 0.0 : 40.0;
  const grandTotal = subtotal + deliveryFee;
  const neededForFreeDelivery = deliveryThreshold - subtotal;

  const showDisabledNotice = (action: string) => {
    toast.error(`${action} is disabled. This is a static visual prototype.`, {
      style: {
        background: "#151515",
        color: "#fbfaf7",
        borderRadius: "16px",
      },
    });
  };

  const handleCheckout = () => {
    toast.success("Order Placed! (Prototype Checkout Simulation) 👨‍🍳🔥", {
      duration: 4000,
      style: {
        background: "#e65c40",
        color: "#fbfaf7",
        borderRadius: "20px",
        padding: "16px",
        fontWeight: "bold",
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream font-sans">
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Navbar with mock count of 4 items total */}
      <Navbar
        cartCount={4}
        user={user}
        onLogOut={handleLogOut}
      />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Link */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-charcoal/70 hover:text-charcoal font-semibold text-sm transition-smooth cursor-pointer group"
          >
            <ArrowLeft className="h-4.5 w-4.5 group-hover:-translate-x-1 transition-smooth" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Page Title */}
        <div className="flex items-center space-x-3.5 mb-10 text-left">
          <div className="p-3 bg-terracotta/10 rounded-2xl">
            <ShoppingBag className="h-7 w-7 text-terracotta" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-sm text-charcoal/50 font-light">
              Review and finalize your curated gourmet selection
            </p>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Items List */}
          <div className="lg:col-span-2 space-y-6 text-left">
            {/* Free Delivery progress */}
            <div className="p-5 bg-white rounded-3xl border border-cream-dark shadow-sm">
              <div className="flex justify-between font-bold text-xs text-charcoal/70 mb-2.5">
                <span className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-terracotta" />
                  <span>Add ${neededForFreeDelivery.toFixed(2)} more for FREE delivery</span>
                </span>
                <span>{Math.round((subtotal / deliveryThreshold) * 100)}%</span>
              </div>
              <div className="w-full bg-cream-dark rounded-full h-2 overflow-hidden border border-cream-dark/60">
                <div
                  className="bg-terracotta h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((subtotal / deliveryThreshold) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* List Box */}
            <div className="bg-white rounded-[2rem] border border-cream-dark p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-extrabold text-charcoal mb-4">Cart Items ({mockCartItems.length})</h2>
              <div className="divide-y divide-cream-dark/80">
                {mockCartItems.map((item) => (
                  <div
                    key={item.food.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-6 first:pt-0 last:pb-0 gap-4"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Image */}
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-cream-dark border border-cream-dark/60">
                        <img
                          src={item.food.image}
                          alt={item.food.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      {/* Details */}
                      <div>
                        <span className="bg-cream-dark px-2.5 py-0.5 rounded text-[10px] text-sage font-bold uppercase tracking-wider">
                          {item.food.category}
                        </span>
                        <h3 className="text-base font-bold text-charcoal mt-1.5 mb-0.5">
                          {item.food.name}
                        </h3>
                        <p className="text-[11px] text-terracotta font-semibold uppercase tracking-wider mb-2">
                          {item.food.restaurantName}
                        </p>
                        <span className="text-sm font-extrabold text-charcoal sm:hidden">
                          ${item.food.price.toFixed(2)} each
                        </span>
                      </div>
                    </div>

                    {/* Controls & Total */}
                    <div className="flex items-center justify-between sm:justify-end sm:space-x-8">
                      {/* Quantity Toggles */}
                      <div className="flex items-center bg-cream-dark border border-cream-dark rounded-xl p-1">
                        <button
                          onClick={() => showDisabledNotice("Decrease quantity")}
                          className="p-1.5 rounded-lg hover:bg-white text-charcoal/60 hover:text-charcoal transition-smooth cursor-pointer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-bold text-charcoal px-3">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => showDisabledNotice("Increase quantity")}
                          className="p-1.5 rounded-lg hover:bg-white text-charcoal/60 hover:text-charcoal transition-smooth cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <div className="text-right min-w-[70px]">
                        <span className="text-base font-extrabold text-charcoal block">
                          ${(item.food.price * item.quantity).toFixed(2)}
                        </span>
                        <span className="text-[10px] text-charcoal/40 font-medium hidden sm:block">
                          ${item.food.price.toFixed(2)} each
                        </span>
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={() => showDisabledNotice("Remove item")}
                        className="p-2 text-charcoal/30 hover:text-red-500 rounded-xl hover:bg-red-50 transition-smooth cursor-pointer"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Summary */}
          <div className="text-left">
            <div className="bg-white rounded-[2rem] border border-cream-dark p-6 sm:p-8 shadow-sm sticky top-28">
              <h2 className="text-xl font-extrabold text-charcoal mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 border-b border-cream-dark pb-6">
                <div className="flex justify-between text-sm font-medium text-charcoal/60">
                  <span>Subtotal</span>
                  <span className="text-charcoal font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-charcoal/60">
                  <span>Estimated Delivery</span>
                  <span className="text-charcoal font-bold">
                    {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium text-charcoal/60">
                  <span>Tax (Included)</span>
                  <span className="text-charcoal font-bold">$0.00</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-extrabold text-charcoal mb-8">
                <span>Total Bill</span>
                <span className="text-2xl text-terracotta">${grandTotal.toFixed(2)}</span>
              </div>

              {/* Promo input mockup */}
              <div className="mb-6">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-2">
                  Have a Promo Code?
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="EATZYGIFT"
                    disabled
                    className="flex-1 bg-cream-dark/50 border border-cream-dark rounded-xl px-3 py-2 text-xs font-semibold text-charcoal/40 placeholder-charcoal/35 outline-none font-sans"
                  />
                  <button
                    onClick={() => showDisabledNotice("Applying promo")}
                    className="px-4 py-2 bg-cream-dark border border-cream-dark hover:border-charcoal text-xs font-bold text-charcoal rounded-xl transition-smooth cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-charcoal hover:bg-terracotta text-white font-bold text-sm rounded-2xl transition-smooth shadow-lg shadow-charcoal/5 hover:shadow-terracotta/15 flex items-center justify-center space-x-2.5 cursor-pointer active:scale-98"
              >
                <CreditCard className="h-4.5 w-4.5" />
                <span>Place Your Order</span>
              </button>

              <p className="text-[10px] text-charcoal/40 text-center font-light mt-4">
                Secure checkout encrypted by Eatzy Security protocols.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
