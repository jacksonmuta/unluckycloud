import productNight from "@/assets/product-night.jpg";
import productNoon from "@/assets/product-noon.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  category: string;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "CLOUD HOODIE | NIGHT",
    price: 176.00,
    description: "Premium heavyweight oversized hoodie in deep black. Crafted from 400gsm organic cotton French terry with a relaxed drop-shoulder silhouette. Features a structured hood, kangaroo pocket, and tonal embroidered UC logo on chest.",
    images: [productNight],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Night"],
    category: "cloud",
    featured: true,
  },
  {
    id: "2",
    name: "CLOUD HOODIE | NOON",
    price: 176.00,
    description: "Premium heavyweight oversized hoodie in sky blue. Crafted from 400gsm organic cotton French terry with a relaxed drop-shoulder silhouette. Features a structured hood, kangaroo pocket, and tonal embroidered UC logo on chest.",
    images: [productNoon],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Noon"],
    category: "cloud",
    featured: true,
  },
];
