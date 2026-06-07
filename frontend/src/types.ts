export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  description: string;
}

export interface Food {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  prepTime: string;
  calories: number;
  tags: string[];
  ingredients: string[];
  restaurantId: string;
  restaurantName: string;
}

export interface CartItem {
  food: Food;
  quantity: number;
}

export interface User {
  _id : string,
  name: string;
  email: string;
  image: string;
  role: string
}

export interface LocationData{
  latitude: number,
  longitude : number,
  formattedAddress : string
}
export interface AppContextType{
  user:User | null;
  loading: boolean,
  isAuth: boolean,
  setUser: React.Dispatch<React.SetStateAction<User| null>>
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  location : LocationData|null
  loadingLocation : boolean
  city: string
}