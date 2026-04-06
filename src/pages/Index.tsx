import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const featured = products.filter((p) => p.featured);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="unlucky.cloud collection" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-background/60" />
        <div className="relative z-10 text-center px-4 animate-fade-up">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Premium Streetwear</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Embrace the<br />
            <span className="text-gradient">Chaos</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 text-base">
            Heavyweight hoodies crafted for those who don't follow the rules.
          </p>
          <Link to="/shop">
            <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8">
              Shop Now <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-2xl font-bold text-foreground">Featured</h2>
          <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-2xl bg-card border border-border p-12 md:p-20 text-center">
          <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4">New Season</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">The Unlucky Collection</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Six essential silhouettes. Premium construction. Zero compromise.
          </p>
          <Link to="/shop">
            <Button variant="outline" size="lg" className="px-8 border-border text-foreground hover:bg-secondary">
              Explore
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
