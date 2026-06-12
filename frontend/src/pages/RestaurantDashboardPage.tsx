import React, { useState } from "react";
import {
  Clock,
  MapPin,
  Phone,
  Sparkles,
  Plus,
  Trash,
  Check,
  X,
  PlusCircle,
  ToggleLeft,
  ToggleRight,
  Package,
  ListFilter,
  Utensils,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAppData } from "../context/AppContext";

// Interfaces for our mock local states
interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  prepTime: string;
  calories: number;
  description: string;
  image: string;
  available: boolean;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  timeReceived: string;
  instructions?: string;
}

export const RestaurantDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, setIsAuth } = useAppData();

  const handleLogOut = () => {
    cookieStore.delete("token");
    setUser(null);
    setIsAuth(false);
    toast.success("Successfully logged out. 👋", {
      style: {
        background: "#151515",
        color: "#fbfaf7",
        borderRadius: "16px",
      },
    });
    navigate("/");
  };

  // Mock Restaurant Details State
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: "Bella Italia",
    cuisine: "Italian, Gourmet Pasta, Pizza",
    rating: 4.8,
    reviews: 320,
    deliveryTime: "15-25 mins",
    deliveryFee: 2.99,
    address: "742 Evergreen Terrace, Springfield",
    phone: "+1 (555) 839-2001",
    description: "Traditional wood-fired Neapolitan pizzas and fresh house-made pasta tossed in rich sauces.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200",
    isOpen: true,
  });

  // Mock Menu Items State
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "m1",
      name: "Truffle Tagliatelle Pasta",
      category: "Gourmet",
      price: 24.50,
      prepTime: "20-25 mins",
      calories: 680,
      description: "House-made fresh tagliatelle tossed in a rich, creamy black truffle butter sauce, finished with aged Parmigiano-Reggiano and fresh shaved Umbrian truffles.",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600",
      available: true,
    },
    {
      id: "m2",
      name: "Wood-Fired Margherita Pizza",
      category: "Gourmet",
      price: 16.50,
      prepTime: "10-15 mins",
      calories: 790,
      description: "Traditional Neapolitan sourdough crust baked in our 900° wood fire oven, topped with San Marzano tomato sauce, fresh buffalo mozzarella, and aromatic sweet basil.",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600",
      available: true,
    },
    {
      id: "m3",
      name: "Rosemary Focaccia",
      category: "Gourmet",
      price: 8.00,
      prepTime: "5-10 mins",
      calories: 320,
      description: "Warm house-baked sourdough focaccia infused with extra virgin olive oil, fresh rosemary, and flaky sea salt.",
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=600",
      available: true,
    },
  ]);

  // Mock Orders State
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "o1",
      orderNumber: "#EAT-8291",
      customerName: "Sophia Thorne",
      customerPhone: "+1 (555) 234-5678",
      address: "12 Larchmont Ave, Apt 4B",
      items: [
        { name: "Truffle Tagliatelle Pasta", quantity: 2, price: 24.50 },
        { name: "Rosemary Focaccia", quantity: 1, price: 8.00 }
      ],
      total: 57.00,
      status: "pending",
      timeReceived: "5 mins ago",
      instructions: "Please leave at the door and ring the bell."
    },
    {
      id: "o2",
      orderNumber: "#EAT-8289",
      customerName: "Liam Vance",
      customerPhone: "+1 (555) 987-6543",
      address: "88 Pinehurst Blvd",
      items: [
        { name: "Wood-Fired Margherita Pizza", quantity: 1, price: 16.50 }
      ],
      total: 16.50,
      status: "preparing",
      timeReceived: "18 mins ago",
      instructions: "No dynamic modifications needed. Extra fresh basil please!"
    },
    {
      id: "o3",
      orderNumber: "#EAT-8270",
      customerName: "Emma Stone",
      customerPhone: "+1 (555) 789-0123",
      address: "344 Broadway Suite 12",
      items: [
        { name: "Wood-Fired Margherita Pizza", quantity: 2, price: 16.50 }
      ],
      total: 33.00,
      status: "completed",
      timeReceived: "2 hours ago"
    }
  ]);

  // UI State managers
  const [activeTab, setActiveTab] = useState<"orders" | "menu">("orders");
  const [orderFilter, setOrderFilter] = useState<"all" | "pending" | "preparing" | "completed">("all");
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  // New item form state
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Gourmet");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemPrepTime, setNewItemPrepTime] = useState("");
  const [newItemCalories, setNewItemCalories] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemImage, setNewItemImage] = useState("");

  // Interaction handlers
  const handleToggleStoreOpen = () => {
    setRestaurantInfo((prev) => {
      const nextState = !prev.isOpen;
      toast.success(
        nextState
          ? "Your kitchen is now OPEN and accepting orders! 🍕"
          : "Your kitchen is now CLOSED. Rest well! 😴",
        {
          style: {
            background: "#151515",
            color: "#fbfaf7",
            borderRadius: "16px",
          },
        }
      );
      return { ...prev, isOpen: nextState };
    });
  };

  const handleToggleItemAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.available;
          toast.success(
            `${item.name} is now ${nextState ? "Available" : "Sold Out"}`,
            {
              style: {
                background: "#151515",
                color: "#fbfaf7",
                borderRadius: "16px",
              },
            }
          );
          return { ...item, available: nextState };
        }
        return item;
      })
    );
  };

  const handleDeleteItem = (id: string, name: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
    toast.success(`Removed ${name} from your menu.`, {
      style: {
        background: "#151515",
        color: "#fbfaf7",
        borderRadius: "16px",
      },
    });
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          toast.success(`Order ${order.orderNumber} updated to ${newStatus}!`, {
            style: {
              background: "#151515",
              color: "#fbfaf7",
              borderRadius: "16px",
            },
          });
          return { ...order, status: newStatus };
        }
        return order;
      })
    );
  };

  const handleAddItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const createdItem: MenuItem = {
      id: `m-${Date.now()}`,
      name: newItemName,
      category: newItemCategory,
      price: parseFloat(newItemPrice) || 0,
      prepTime: newItemPrepTime || "15-20 mins",
      calories: parseInt(newItemCalories) || 450,
      description: newItemDescription || "Freshly made artisanal dish curated by our master chefs.",
      image: newItemImage || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
      available: true,
    };

    setMenuItems((prev) => [...prev, createdItem]);
    toast.success(`Successfully added "${newItemName}" to your menu! 🎉`, {
      style: {
        background: "#151515",
        color: "#fbfaf7",
        borderRadius: "16px",
      },
    });

    // Reset Form
    setNewItemName("");
    setNewItemCategory("Gourmet");
    setNewItemPrice("");
    setNewItemPrepTime("");
    setNewItemCalories("");
    setNewItemDescription("");
    setNewItemImage("");
    setIsAddItemModalOpen(false);
  };

  const filteredOrders = orders.filter((order) => {
    if (orderFilter === "all") return true;
    return order.status === orderFilter;
  });

  return (
    <div className="min-h-screen flex flex-col bg-cream font-sans">
      <Toaster position="bottom-right" reverseOrder={false} />

      

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Restaurant Header Section */}
        <div className="relative w-full h-[260px] rounded-[2.5rem] overflow-hidden shadow-lg border border-cream-dark mb-8">
          <img
            src={restaurantInfo.image}
            alt={restaurantInfo.name}
            className="w-full h-full object-cover filter brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/45 to-transparent flex flex-col justify-end p-8 md:p-10 text-left">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-terracotta/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider mb-2">
                  <Utensils className="h-3 w-3 text-terracotta" />
                  <span>Partner Kitchen Dashboard</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none mb-3 font-serif">
                  {restaurantInfo.name}
                </h1>
                <p className="text-white/80 text-sm font-light max-w-2xl leading-relaxed">
                  {restaurantInfo.description}
                </p>
              </div>

              {/* Toggle Switch */}
              <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20 self-start md:self-auto transition-smooth">
                <div className="text-left">
                  <span className="block text-[10px] uppercase font-bold tracking-widest text-white/50">
                    Store Status
                  </span>
                  <span
                    className={`text-sm font-extrabold tracking-wide uppercase ${
                      restaurantInfo.isOpen ? "text-emerald-400" : "text-terracotta"
                    }`}
                  >
                    {restaurantInfo.isOpen ? "Open for Orders" : "Closed"}
                  </span>
                </div>
                <button
                  onClick={handleToggleStoreOpen}
                  className="focus:outline-none transition-smooth transform active:scale-95 cursor-pointer"
                  title={restaurantInfo.isOpen ? "Close store" : "Open store"}
                >
                  {restaurantInfo.isOpen ? (
                    <div className="relative w-14 h-8 bg-emerald-500 rounded-full flex items-center justify-end px-1 transition-all">
                      <div className="w-6 h-6 bg-white rounded-full shadow-md" />
                    </div>
                  ) : (
                    <div className="relative w-14 h-8 bg-charcoal/40 rounded-full flex items-center justify-start px-1 transition-all">
                      <div className="w-6 h-6 bg-white rounded-full shadow-md" />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant Contact & Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
          <div className="bg-white rounded-[2rem] border border-cream-dark p-6 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-terracotta/10 rounded-2xl text-terracotta">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-[10px] font-bold text-charcoal/40 uppercase tracking-wider">
                Address
              </span>
              <span className="text-sm font-semibold text-charcoal leading-tight block mt-0.5">
                {restaurantInfo.address}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-cream-dark p-6 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-sage/10 rounded-2xl text-sage">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-[10px] font-bold text-charcoal/40 uppercase tracking-wider">
                Contact Phone
              </span>
              <span className="text-sm font-semibold text-charcoal leading-tight block mt-0.5">
                {restaurantInfo.phone}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-cream-dark p-6 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-gold/10 rounded-2xl text-gold">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-[10px] font-bold text-charcoal/40 uppercase tracking-wider">
                Rating & Feedback
              </span>
              <span className="text-sm font-semibold text-charcoal leading-tight block mt-0.5">
                {restaurantInfo.rating} ★ ({restaurantInfo.reviews} Reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Tabs navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-cream-dark pb-4 mb-8 gap-4">
          <div className="flex space-x-2 bg-cream-dark/50 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-smooth cursor-pointer ${
                activeTab === "orders"
                  ? "bg-white text-charcoal shadow-sm"
                  : "text-charcoal/50 hover:text-charcoal"
              }`}
            >
              Orders Dashboard
            </button>
            <button
              onClick={() => setActiveTab("menu")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-smooth cursor-pointer ${
                activeTab === "menu"
                  ? "bg-white text-charcoal shadow-sm"
                  : "text-charcoal/50 hover:text-charcoal"
              }`}
            >
              Manage Menu
            </button>
          </div>

          {activeTab === "orders" ? (
            <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <ListFilter className="h-4 w-4 text-charcoal/40 flex-shrink-0" />
              {(["all", "pending", "preparing", "completed"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setOrderFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-smooth cursor-pointer flex-shrink-0 ${
                    orderFilter === filter
                      ? "bg-charcoal text-white"
                      : "bg-white text-charcoal/65 hover:bg-cream-dark/40 border border-cream-dark"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={() => setIsAddItemModalOpen(true)}
              className="px-5 py-2.5 bg-charcoal hover:bg-terracotta text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-smooth flex items-center space-x-1.5 shadow-md hover:scale-[1.01] active:scale-95 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Item</span>
            </button>
          )}
        </div>

        {/* Tab Contents: Orders */}
        {activeTab === "orders" && (
          <div className="text-left space-y-6">
            {filteredOrders.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`bg-white rounded-[2.5rem] border border-cream-dark p-6 md:p-8 shadow-sm flex flex-col justify-between transition-smooth hover:shadow-md ${
                      order.status === "pending"
                        ? "border-amber-200/80 ring-1 ring-amber-100"
                        : order.status === "preparing"
                        ? "border-sage/40 ring-1 ring-sage/10"
                        : ""
                    }`}
                  >
                    <div>
                      {/* Order Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-extrabold text-charcoal font-serif">
                              {order.orderNumber}
                            </span>
                            <span
                              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                order.status === "pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : order.status === "preparing"
                                  ? "bg-sage/10 text-sage"
                                  : order.status === "ready"
                                  ? "bg-blue-50 text-blue-800"
                                  : "bg-cream-dark text-charcoal/50"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <span className="text-[11px] text-charcoal/40 font-medium block mt-0.5">
                            Received {order.timeReceived}
                          </span>
                        </div>
                        <span className="text-xl font-black text-charcoal">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>

                      {/* Customer Info */}
                      <div className="p-3 bg-cream/70 rounded-2xl mb-4 border border-cream-dark/30 space-y-1">
                        <p className="text-xs font-bold text-charcoal">
                          {order.customerName} •{" "}
                          <span className="font-light text-charcoal/60">
                            {order.customerPhone}
                          </span>
                        </p>
                        <p className="text-[11px] text-charcoal/60 font-light flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-charcoal/40 flex-shrink-0" />
                          <span className="truncate">{order.address}</span>
                        </p>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-2.5 mb-6">
                        <span className="block text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">
                          Items Ordered
                        </span>
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center text-xs font-semibold text-charcoal"
                          >
                            <div className="flex items-center space-x-2">
                              <span className="px-2 py-0.5 bg-cream-dark text-charcoal rounded-md text-[10px] font-extrabold">
                                {item.quantity}x
                              </span>
                              <span>{item.name}</span>
                            </div>
                            <span className="text-charcoal/60">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Instructions */}
                      {order.instructions && (
                        <div className="flex items-start space-x-2 p-3 bg-amber-50/40 border border-amber-100 rounded-2xl mb-6">
                          <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-[9px] font-bold text-amber-800 uppercase tracking-wider">
                              Kitchen Notes
                            </span>
                            <p className="text-xs text-amber-700/95 font-medium mt-0.5">
                              {order.instructions}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Order Action Buttons */}
                    <div className="flex items-center gap-2 pt-2 border-t border-cream-dark">
                      {order.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, "preparing")}
                            className="flex-1 py-3 px-4 bg-charcoal hover:bg-sage text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-smooth flex items-center justify-center space-x-1.5 cursor-pointer"
                          >
                            <Check className="h-4 w-4" />
                            <span>Accept Order</span>
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, "cancelled")}
                            className="py-3 px-4 border border-cream-dark hover:border-red-200 hover:bg-red-50 text-charcoal/70 hover:text-red-500 rounded-xl text-xs font-bold uppercase tracking-wider transition-smooth cursor-pointer"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}

                      {order.status === "preparing" && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, "ready")}
                          className="w-full py-3 px-4 bg-sage hover:bg-sage-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-smooth flex items-center justify-center space-x-1.5 cursor-pointer"
                        >
                          <Package className="h-4 w-4" />
                          <span>Mark as Ready for Pickup</span>
                        </button>
                      )}

                      {order.status === "ready" && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, "completed")}
                          className="w-full py-3 px-4 bg-gold hover:bg-gold/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-smooth flex items-center justify-center space-x-1.5 cursor-pointer"
                        >
                          <Check className="h-4 w-4" />
                          <span>Complete & Handover</span>
                        </button>
                      )}

                      {order.status === "completed" && (
                        <div className="w-full py-2.5 px-4 bg-cream-dark/60 text-charcoal/50 rounded-xl text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center space-x-1">
                          <Check className="h-4 w-4 text-sage" />
                          <span>Order Delivered</span>
                        </div>
                      )}

                      {order.status === "cancelled" && (
                        <div className="w-full py-2.5 px-4 bg-red-50 text-red-500 rounded-xl text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center space-x-1">
                          <X className="h-4 w-4" />
                          <span>Order Cancelled</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white rounded-[2.5rem] border border-cream-dark shadow-sm">
                <Package className="h-12 w-12 text-charcoal/20 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-charcoal mb-1">
                  No orders match this status
                </h3>
                <p className="text-xs text-charcoal/50 font-light max-w-sm mx-auto leading-relaxed">
                  Toggle filters above or wait for new orders to come in. Keep your store online to receive orders.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab Contents: Menu Management */}
        {activeTab === "menu" && (
          <div className="text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-[2.5rem] border border-cream-dark shadow-sm overflow-hidden flex flex-col justify-between transition-smooth hover:shadow-md"
                >
                  <div className="relative h-48 w-full">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-extrabold text-charcoal uppercase shadow-sm">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-charcoal font-serif tracking-tight leading-snug">
                          {item.name}
                        </h3>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-2.5 py-0.5 rounded-full">
                          {item.category}
                        </span>
                      </div>

                      <p className="text-xs text-charcoal/60 font-light leading-relaxed mb-4 line-clamp-3">
                        {item.description}
                      </p>

                      {/* Specs */}
                      <div className="flex items-center space-x-4 mb-6 border-y border-cream-dark py-3">
                        <div className="flex items-center space-x-1.5 text-xs text-charcoal/60">
                          <Clock className="h-3.5 w-3.5 text-charcoal/40" />
                          <span>{item.prepTime}</span>
                        </div>
                        <div className="h-3 w-[1px] bg-cream-dark" />
                        <div className="flex items-center space-x-1.5 text-xs text-charcoal/60">
                          <Utensils className="h-3.5 w-3.5 text-charcoal/40" />
                          <span>{item.calories} kcal</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                      {/* Availability status toggle */}
                      <div className="flex items-center space-x-2.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/40">
                          {item.available ? "In Stock" : "Sold Out"}
                        </span>
                        <button
                          onClick={() => handleToggleItemAvailability(item.id)}
                          className="focus:outline-none transition-smooth cursor-pointer"
                        >
                          {item.available ? (
                            <ToggleRight className="h-7 w-7 text-sage" />
                          ) : (
                            <ToggleLeft className="h-7 w-7 text-charcoal/30" />
                          )}
                        </button>
                      </div>

                      {/* Delete item */}
                      <button
                        onClick={() => handleDeleteItem(item.id, item.name)}
                        className="p-2.5 bg-cream hover:bg-red-50 text-charcoal/50 hover:text-red-500 rounded-xl transition-smooth cursor-pointer border border-cream-dark hover:border-red-100"
                        title="Delete item"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Add Item Slide-Over Modal */}
      {isAddItemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm">
          {/* Backdrop click to close */}
          <div
            onClick={() => setIsAddItemModalOpen(false)}
            className="absolute inset-0 cursor-default"
          />

          <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] border border-cream-dark p-6 sm:p-10 shadow-2xl z-10 text-left animate-fade-in transition-smooth max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsAddItemModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-cream-dark text-charcoal/40 hover:text-charcoal transition-smooth cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6 flex items-center space-x-3">
              <div className="p-3 bg-terracotta/10 rounded-2xl text-terracotta">
                <PlusCircle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-charcoal font-serif tracking-tight">
                  Add Food Item
                </h2>
                <p className="text-xs text-charcoal/50 font-light">
                  Introduce a gourmet delicacy to your menu catalog.
                </p>
              </div>
            </div>

            <form onSubmit={handleAddItemSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-charcoal/60 uppercase tracking-widest block">
                  Delicacy Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rosemary Infused Prime Rib"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full bg-cream-dark/30 border border-cream-dark rounded-2xl px-4 py-3 text-xs font-semibold text-charcoal outline-none focus:border-terracotta focus:bg-white transition-smooth"
                />
              </div>

              {/* Price & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-charcoal/60 uppercase tracking-widest block">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="24.50"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    className="w-full bg-cream-dark/30 border border-cream-dark rounded-2xl px-4 py-3 text-xs font-semibold text-charcoal outline-none focus:border-terracotta focus:bg-white transition-smooth"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-charcoal/60 uppercase tracking-widest block">
                    Category
                  </label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="w-full bg-cream-dark/30 border border-cream-dark rounded-2xl px-4 py-3 text-xs font-semibold text-charcoal outline-none focus:border-terracotta focus:bg-white transition-smooth appearance-none cursor-pointer"
                  >
                    <option value="Gourmet">Gourmet</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Fast-food">Fast-food</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>
              </div>

              {/* Prep Time & Calories */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-charcoal/60 uppercase tracking-widest block">
                    Prep Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 15-20 mins"
                    value={newItemPrepTime}
                    onChange={(e) => setNewItemPrepTime(e.target.value)}
                    className="w-full bg-cream-dark/30 border border-cream-dark rounded-2xl px-4 py-3 text-xs font-semibold text-charcoal outline-none focus:border-terracotta focus:bg-white transition-smooth"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-charcoal/60 uppercase tracking-widest block">
                    Calories (kcal)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 520"
                    value={newItemCalories}
                    onChange={(e) => setNewItemCalories(e.target.value)}
                    className="w-full bg-cream-dark/30 border border-cream-dark rounded-2xl px-4 py-3 text-xs font-semibold text-charcoal outline-none focus:border-terracotta focus:bg-white transition-smooth"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-charcoal/60 uppercase tracking-widest block">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your dish, key ingredients, special preparation styles..."
                  value={newItemDescription}
                  onChange={(e) => setNewItemDescription(e.target.value)}
                  className="w-full bg-cream-dark/30 border border-cream-dark rounded-2xl px-4 py-3 text-xs font-semibold text-charcoal outline-none focus:border-terracotta focus:bg-white transition-smooth resize-none font-sans"
                />
              </div>

              {/* Image URL Mock */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-charcoal/60 uppercase tracking-widest block">
                  Image URL
                </label>
                <input
                  type="url"
                  placeholder="e.g. https://images.unsplash.com/..."
                  value={newItemImage}
                  onChange={(e) => setNewItemImage(e.target.value)}
                  className="w-full bg-cream-dark/30 border border-cream-dark rounded-2xl px-4 py-3 text-xs font-semibold text-charcoal outline-none focus:border-terracotta focus:bg-white transition-smooth"
                />
                <span className="text-[9px] text-charcoal/40 font-light block mt-0.5">
                  Leave blank to use our high-quality placeholder culinary image.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-charcoal hover:bg-terracotta text-white rounded-full text-xs font-bold uppercase tracking-wider transition-smooth flex items-center justify-center space-x-1.5 cursor-pointer shadow-md hover:scale-[1.01] active:scale-95"
                >
                  <Plus className="h-4.5 w-4.5" />
                  <span>Add Delicacy</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(false)}
                  className="px-6 py-4 bg-cream-dark text-charcoal rounded-full text-xs font-bold uppercase tracking-wider transition-smooth hover:bg-cream-dark/80 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default RestaurantDashboardPage;
