import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/50 mt-20">
    <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="text-xs font-semibold tracking-[0.15em] uppercase text-foreground">
          unlucky.cloud
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/shop" className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300">Shop</Link>
          <span className="text-xs text-muted-foreground">Shipping</span>
          <span className="text-xs text-muted-foreground">Contact</span>
        </div>
        <p className="text-[10px] text-muted-foreground/60">© 2026 unlucky.cloud</p>
      </div>
    </div>
  </footer>
);

export default Footer;
