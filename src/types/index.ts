export interface Category {
  slug: string;
  name: string;
  nameEn: string;
  icon: string;
  subcategories?: string[];
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
  category: string;
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
  isBigDeal?: boolean;
  isBrand?: boolean;
  isTrending?: boolean;
  trendingTag?: string;
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
