export type CategoryName =
  | "women"
  | "men"
  | "kids"
  | "beauty"
  | "home"
  | "accessories";

export interface Category {
  slug: CategoryName;
  name: string;
  nameEn: string;
  icon: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  title: string;
  category: CategoryName;
  subcategory: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  description: string;
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  isFlashSale?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  stock: number;
  brand: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}
