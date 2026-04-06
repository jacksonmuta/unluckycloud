import hoodie1 from "@/assets/hoodie-1.jpg";
import hoodie2 from "@/assets/hoodie-2.jpg";
import hoodie3 from "@/assets/hoodie-3.jpg";
import hoodie4 from "@/assets/hoodie-4.jpg";
import hoodie5 from "@/assets/hoodie-5.jpg";
import hoodie6 from "@/assets/hoodie-6.jpg";

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
    name: "Shadow Oversized Hoodie",
    price: 89.99,
    description: "Premium heavyweight cotton hoodie with a relaxed oversized fit. Features a kangaroo pocket, ribbed cuffs, and a drawstring hood. The ultimate streetwear essential.",
    images: [hoodie1],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
    category: "oversized",
    featured: true,
  },
  {
    id: "2",
    name: "Storm Cloud Pullover",
    price: 79.99,
    description: "Soft-washed fleece hoodie in a muted charcoal tone. Relaxed fit with dropped shoulders and a cozy brushed interior.",
    images: [hoodie2],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal"],
    category: "pullover",
    featured: true,
  },
  {
    id: "3",
    name: "Midnight Reign Hoodie",
    price: 99.99,
    description: "Deep purple premium hoodie crafted from 400gsm French terry. Features embossed logo detailing and an oversized silhouette.",
    images: [hoodie3],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Purple"],
    category: "premium",
    featured: true,
  },
  {
    id: "4",
    name: "Deep Dive Hoodie",
    price: 84.99,
    description: "Navy blue essential hoodie with a classic fit. Made from organic cotton blend with a smooth, durable finish.",
    images: [hoodie4],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy"],
    category: "essentials",
    featured: false,
  },
  {
    id: "5",
    name: "Ghost Protocol Hoodie",
    price: 94.99,
    description: "Crisp white heavyweight hoodie. Clean, minimal design with tonal stitching and a structured hood for a premium look.",
    images: [hoodie5],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White"],
    category: "essentials",
    featured: true,
  },
  {
    id: "6",
    name: "Tactical Moss Hoodie",
    price: 89.99,
    description: "Military-inspired olive hoodie with an oversized fit. Features reinforced seams and a heavyweight cotton construction.",
    images: [hoodie6],
    sizes: ["M", "L", "XL"],
    colors: ["Olive"],
    category: "oversized",
    featured: false,
  },
];
