import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { authService } from "../main";
import type { AppContextType, LocationData, User } from "../types";
import toast from "react-hot-toast";
const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState<LocationData | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [city, setCity] = useState("Fetching Location");

  async function fetchUser() {
    try {
      const token = await cookieStore.get("token");
      console.log("TOKEN:", token);
      const { data } = await axios.get(`${authService}/api/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      });
      setUser(data.user);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setUser(null);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      toast.error("Please Allow location to continue.", {
        style: {
          background: "#151515",
          color: "#fbfaf7",
          borderRadius: "16px",
        },
      });
      return;
    } else {
      setLoadingLocation(true);
      const successCallback = async (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        try {
          console.log("Latitude:", latitude, "Longitude:", longitude);

          const response = await fetch(
            `http://localhost:5002/api/v1/location?lat=${latitude}&lon=${longitude}`,
          );

          const data = await response.json();
          setLocation({
            latitude,
            longitude,
            formattedAddress: data.display_name || "Current Location",
          });

          setCity(
              data.address?.town ||
              data.address?.village ||
              data.address?.suburb ||
              data.address?.municipality ||
              data.address?.county ||
              data.address?.neighbourhood ||
              "Your City",
          );
          setLoadingLocation(false);
        } catch (error) {
          console.error("Error fetching address:", error);
          setLocation({
            latitude,
            longitude,
            formattedAddress: "Current Location",
          });
          setCity("Failed to Load");
          setLoadingLocation(false);
        }
      };

      const errorCallback = (error: GeolocationPositionError) => {
        console.warn(
          `High accuracy geolocation failed (${error.code}): ${error.message}. Trying fallback low accuracy...`,
        );
        navigator.geolocation.getCurrentPosition(
          successCallback,
          (fallbackError) => {
            console.error("Fallback geolocation failed:", fallbackError);
            setLoadingLocation(false);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 60000, // Accept cached position up to 1 minute old
            timeout: 10000,
          },
        );
      };

      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
        enableHighAccuracy: true,
        maximumAge: 0, // Request fresh coordinates
        timeout: 5000, // Timeout after 5 seconds to fallback quickly
      });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAuth,
        loading,
        setIsAuth,
        setLoading,
        setUser,
        user,
        loadingLocation,
        location,
        city,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppData must be within AppProvider");
  }
  return context;
};
