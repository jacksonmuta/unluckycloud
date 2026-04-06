import { Cloud } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card/50 mt-20">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-foreground mb-3">
            <Cloud className="w-4 h-4 text-primary" />
            unlucky.cloud
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm">
            Premium streetwear hoodies designed for those who embrace the chaos. Every piece is crafted with intention.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3 text-sm">Shop</h4>
          <div className="flex flex-col gap-2">
            <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Hoodies</Link>
            <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">New Arrivals</Link>
            <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Best Sellers</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3 text-sm">Support</h4>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Shipping & Returns</span>
            <span className="text-sm text-muted-foreground">Size Guide</span>
            <span className="text-sm text-muted-foreground">Contact Us</span>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-8 text-center">
        <p className="text-xs text-muted-foreground">© 2026 unlucky.cloud. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
