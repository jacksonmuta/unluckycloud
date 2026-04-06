import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import heroImg from "@/assets/hero-floating-hoodie.jpg";

const Index = () => {
  return (
    <div>
      {/* Hero - Full screen floating hoodie */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Cloud Hoodie floating in the sky"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/40" />
        
        {/* Bottom text */}
        <div className="absolute bottom-12 left-0 right-0 text-center animate-fade-in">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground/70">
            ‹ drag to rotate ›
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
