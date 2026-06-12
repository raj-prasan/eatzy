import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Store,
  Phone,
  MapPin,
  AlignLeft,
  Utensils,
  Upload,
  Compass,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAppData } from "../context/AppContext";
import axios from "axios";
import { restaurantService } from "../main";

export const AddRestaurantPage: React.FC = () => {
  const navigate = useNavigate();
  const { location, loadingLocation } = useAppData();

  // Form states
  const [restaurantName, setRestaurantName] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [restaurantLocation, setRestaurantLocation] = useState(
    location?.formattedAddress ?? "",
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Drag and drop mock file state
  const [fileName, setFileName] = useState<string | null>(null);

  const handleUseCurrentLocation = () => {
    if (location?.formattedAddress) {
      setRestaurantLocation(location.formattedAddress);
      return;
    }

    toast.error("Current location is not available yet.", {
      style: {
        background: "#151515",
        color: "#fbfaf7",
        borderRadius: "16px",
      },
    });
  };

  const handleMockUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      toast.success(`Upload: ${file.name} received! 📸`, {
        style: {
          background: "#151515",
          color: "#fbfaf7",
          borderRadius: "16px",
        },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please upload a restaurant image.");
      return;
    }

    try {
      const token = await cookieStore.get("token");
      const formData = new FormData();
      formData.append("name", restaurantName);
      formData.append("description", description);
      formData.append("latitude", String(location?.latitude ?? ""));
      formData.append("longitude", String(location?.longitude ?? ""));
      formData.append("formattedAddress", restaurantLocation);
      formData.append("phone", phoneNumber);
      formData.append("file", selectedFile);

      const result = await axios.post(
        `${restaurantService}/api/v1/restaurant/new`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        },
      );
      toast.success(
        "Welcome aboard! Onboarding completed successfully. 🎉",
        {
          duration: 5000,
          style: {
            background: "#151515",
            color: "#fbfaf7",
            borderRadius: "16px",
          },
        },
      );
      setTimeout(() => {
        navigate("/restaurant");
      }, 2000);
      console.log(result)
    } catch (error) {
      toast.error("Something went wrong!!!");
      console.log(error)
    }
    
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-cream relative overflow-x-hidden font-sans">
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] aspect-square rounded-full bg-terracotta/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] aspect-square rounded-full bg-sage/5 blur-[120px] pointer-events-none" />

      {/* Header Bar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between z-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 text-charcoal/70 hover:text-charcoal font-semibold text-sm transition-smooth cursor-pointer group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-smooth" />
          <span>Back to Menu</span>
        </button>
        <span className="text-3xl font-extrabold tracking-tight text-charcoal">
          Eatzy<span className="text-terracotta text-4xl">.</span>
        </span>
      </header>

      {/* Onboarding Form Container */}
      <main className="w-full grow flex items-center justify-center p-4 z-10 my-6">
        <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-cream-dark p-8 md:p-12 shadow-2xl transition-smooth flex flex-col text-left">
          {/* Header Title */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-terracotta/10 rounded-full text-xs font-bold text-terracotta uppercase tracking-wider mb-3">
              <Utensils className="h-3.5 w-3.5" />
              <span>Partner Kitchen Onboarding</span>
            </span>
            <h1 className="text-4xl font-extrabold text-charcoal tracking-tight mb-3">
              Onboard Your Restaurant
            </h1>
            <p className="text-sm text-charcoal/50 font-light max-w-md mx-auto">
              Ready to serve gourmet culinary experiences? Provide your kitchen
              details to create your digital storefront.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Grid for basic details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Restaurant Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-charcoal/60 uppercase tracking-wider block">
                  Restaurant Name
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-charcoal/40">
                    <Store className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Le Petit Bistro"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    className="w-full bg-cream-dark/30 border border-cream-dark/80 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-medium text-charcoal placeholder-charcoal/30 outline-none focus:border-terracotta focus:bg-white transition-smooth shadow-sm"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-charcoal/60 uppercase tracking-wider block">
                  Contact Phone Number
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-charcoal/40">
                    <Phone className="h-4 w-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +1 (555) 019-2834"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-cream-dark/30 border border-cream-dark/80 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-medium text-charcoal placeholder-charcoal/30 outline-none focus:border-terracotta focus:bg-white transition-smooth shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Location (with Autofill helper) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-charcoal/60 uppercase tracking-wider block">
                  Restaurant Location
                </label>
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={loadingLocation}
                  className="flex items-center space-x-1 px-3 py-1 bg-sage/10 text-sage hover:bg-sage/20 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-smooth cursor-pointer"
                >
                  <Compass className="h-3 w-3" />
                  <span>
                    {loadingLocation ? "Locating..." : "Use Current Location"}
                  </span>
                </button>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-charcoal/40">
                  <MapPin className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Street address, City, ZIP code"
                  value={restaurantLocation}
                  onChange={(e) => setRestaurantLocation(e.target.value)}
                  className="w-full bg-cream-dark/30 border border-cream-dark/80 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-medium text-charcoal placeholder-charcoal/30 outline-none focus:border-terracotta focus:bg-white transition-smooth shadow-sm"
                />
              </div>
            </div>

            {/* Grid for cuisine & mock details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6"></div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-charcoal/60 uppercase tracking-wider block">
                Restaurant Description
              </label>
              <div className="relative">
                <div className="absolute left-4 top-4 text-charcoal/40">
                  <AlignLeft className="h-4 w-4" />
                </div>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell customers about your kitchen's unique concept, signature ingredients, and culinary philosophy..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-cream-dark/30 border border-cream-dark/80 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-medium text-charcoal placeholder-charcoal/30 outline-none focus:border-terracotta focus:bg-white transition-smooth shadow-sm resize-none"
                />
              </div>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-charcoal/60 uppercase tracking-wider block">
                Restaurant Cover Banner & Logo
              </label>
              <div className="relative border-2 border-dashed border-cream-dark hover:border-terracotta/40 bg-white/40 hover:bg-white/70 transition-smooth rounded-2xl p-6 text-center group cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMockUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="p-3 bg-cream rounded-full text-charcoal/40 group-hover:text-terracotta group-hover:bg-terracotta/10 transition-smooth">
                    {fileName ? (
                      <CheckCircle className="h-6 w-6 text-sage" />
                    ) : (
                      <Upload className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-charcoal block">
                      {fileName ? fileName : "Upload cover photo"}
                    </span>
                    <span className="text-[10px] text-charcoal/40 font-light block mt-0.5">
                      PNG, JPG up to 5MB (16:9 ratio recommended)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-charcoal hover:bg-terracotta text-white rounded-full font-bold flex items-center justify-center space-x-2 transition-smooth tracking-wide shadow-md cursor-pointer hover:scale-[1.01] active:scale-95 text-sm uppercase"
            >
              <span>Onboard My Restaurant</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="w-full text-center py-6 text-[10px] text-charcoal/40 font-medium z-10 border-t border-cream-dark max-w-7xl mx-auto">
        &copy; {new Date().getFullYear()} Eatzy Inc. All rights reserved.
        Elegant gourmet delivery.
      </footer>
    </div>
  );
};

export default AddRestaurantPage;
