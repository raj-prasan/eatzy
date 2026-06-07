import { useState } from "react";
import {
  ArrowLeft,
  User as UserIcon,
  MapPin,
  Edit2,
  Save,
  X,
  ShoppingBag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAppData } from "../context/AppContext";

export const Accountpage = () => {
  const navigate = useNavigate();
  const { user, setUser, setIsAuth } = useAppData();

  const handleLogOut = () => {
    cookieStore.delete("token");
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

  const displayUser = {
    name: user?.name || "User",
    email: user?.email || "No email provided",
    role: user?.role || "Customer",
    image: user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
  };

  // Address State
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    suite: "",
    city: "",
    state: "",
    zip: "",
  });
  const [tempAddress, setTempAddress] = useState({ ...address });

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setAddress({ ...tempAddress });
    setIsEditingAddress(false);
    toast.success("Delivery address updated successfully!", {
      style: {
        background: "#151515",
        color: "#fbfaf7",
        borderRadius: "16px",
      },
    });
  };

  const handleCancelEdit = () => {
    setTempAddress({ ...address });
    setIsEditingAddress(false);
  };

  // Orders data
  const orders: any[] = [];

  return (
    <div className="min-h-screen flex flex-col bg-cream font-sans">
      <Toaster position="bottom-right" reverseOrder={false} />

      <Navbar cartCount={4} user={user} onLogOut={handleLogOut} />

      <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back navigation */}
        <div className="mb-8 text-left">
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
            <UserIcon className="h-7 w-7 text-terracotta" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-charcoal tracking-tight">
              My Account
            </h1>
            <p className="text-sm text-charcoal/50 font-light">
              Manage your delivery details and view your orders
            </p>
          </div>
        </div>

        {/* Unified Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          {/* Column 1: Unified Profile & Address Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-[2rem] border border-cream-dark p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Profile info */}
              <div className="flex items-center space-x-4">
                <img
                  src={displayUser.image}
                  alt={displayUser.name}
                  className="h-14 w-14 rounded-full object-cover border-2 border-terracotta"
                />
                <div>
                  <h2 className="text-lg font-extrabold text-charcoal leading-tight">
                    {displayUser.name}
                  </h2>
                  <p className="text-xs text-charcoal/50 font-light truncate max-w-[150px]">
                    {displayUser.email}
                  </p>
                  <span className="inline-block mt-1.5 bg-sage/10 text-sage px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                    {displayUser.role}
                  </span>
                </div>
              </div>

              <div className="h-[1px] bg-cream-dark" />

              {/* Delivery Address */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal/60 flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-terracotta" />
                    <span>Delivery Address</span>
                  </h3>
                  {!isEditingAddress && (
                    <button
                      onClick={() => setIsEditingAddress(true)}
                      className="p-1.5 text-charcoal/50 hover:text-terracotta hover:bg-cream rounded-lg transition-smooth cursor-pointer"
                      title="Edit Address"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {isEditingAddress ? (
                  <form onSubmit={handleSaveAddress} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Street Address"
                        required
                        value={tempAddress.street}
                        onChange={(e) =>
                          setTempAddress({
                            ...tempAddress,
                            street: e.target.value,
                          })
                        }
                        className="w-full bg-cream-dark/50 border border-cream-dark rounded-xl px-3 py-2 text-xs font-semibold text-charcoal outline-none focus:border-terracotta transition-smooth"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Apt, Suite, Unit (Optional)"
                        value={tempAddress.suite}
                        onChange={(e) =>
                          setTempAddress({
                            ...tempAddress,
                            suite: e.target.value,
                          })
                        }
                        className="w-full bg-cream-dark/50 border border-cream-dark rounded-xl px-3 py-2 text-xs font-semibold text-charcoal outline-none focus:border-terracotta transition-smooth"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="City"
                        required
                        value={tempAddress.city}
                        onChange={(e) =>
                          setTempAddress({
                            ...tempAddress,
                            city: e.target.value,
                          })
                        }
                        className="w-full bg-cream-dark/50 border border-cream-dark rounded-xl px-3 py-2 text-xs font-semibold text-charcoal outline-none focus:border-terracotta transition-smooth"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="State"
                        required
                        value={tempAddress.state}
                        onChange={(e) =>
                          setTempAddress({
                            ...tempAddress,
                            state: e.target.value,
                          })
                        }
                        className="w-full bg-cream-dark/50 border border-cream-dark rounded-xl px-3 py-2 text-xs font-semibold text-charcoal outline-none focus:border-terracotta transition-smooth"
                      />
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        required
                        value={tempAddress.zip}
                        onChange={(e) =>
                          setTempAddress({
                            ...tempAddress,
                            zip: e.target.value,
                          })
                        }
                        className="w-full bg-cream-dark/50 border border-cream-dark rounded-xl px-3 py-2 text-xs font-semibold text-charcoal outline-none focus:border-terracotta transition-smooth"
                      />
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-charcoal hover:bg-terracotta text-white rounded-lg text-[11px] font-bold transition-smooth flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <Save className="h-3 w-3" />
                        <span>Save</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="flex-1 py-2 bg-cream-dark border border-cream-dark hover:border-charcoal text-charcoal rounded-lg text-[11px] font-bold transition-smooth flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-3">
                    {address.street || address.city ? (
                      <div className="p-4 bg-cream-dark/40 rounded-2xl border border-cream-dark/30 space-y-1">
                        <p className="text-xs font-semibold text-charcoal">
                          {address.street}
                        </p>
                        {address.suite && (
                          <p className="text-[11px] text-charcoal/70">
                            {address.suite}
                          </p>
                        )}
                        <p className="text-[11px] text-charcoal/70">
                          {address.city}
                          {address.state ? `, ${address.state}` : ""}{" "}
                          {address.zip}
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 bg-cream-dark/20 rounded-2xl border border-dashed border-cream-dark text-center py-4">
                        <p className="text-xs text-charcoal/50 font-light">
                          No address provided yet. Click the edit icon to add one.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Unified Orders Card */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-[2rem] border border-cream-dark p-6 sm:p-8 shadow-sm h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-charcoal mb-6 flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5 text-terracotta" />
                  <span>My Orders</span>
                </h3>

                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {/* Orders listing */}
                  </div>
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <ShoppingBag className="h-10 w-10 text-charcoal/20 mb-3" />
                    <h4 className="text-base font-bold text-charcoal mb-1">
                      No orders yet
                    </h4>
                    <p className="text-xs text-charcoal/55 font-light max-w-xs leading-relaxed">
                      Once you place an order from our curated kitchens, you will be able to track and view it here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Accountpage;
