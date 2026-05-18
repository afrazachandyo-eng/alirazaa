export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subCategory: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isSale?: boolean;
  isBestSeller?: boolean;
  sizes?: string[];
  colors?: string[];
  stock: number;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: CartItem[];
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
}
