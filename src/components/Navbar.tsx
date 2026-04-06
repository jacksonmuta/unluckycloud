import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isHome ? "" : "glass border-b border-border/50"}`}>
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-sm font-semibold tracking-[0.15em] uppercase text-foreground">
          UC
        </Link>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-5">
          <Link to="/shop" className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300">
            Shop
          </Link>
          {isAuthenticated && user?.isAdmin && (
            <Link to="/admin" className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300">
              Admin
            </Link>
          )}
          <Link to="/cart" className="relative p-1 text-muted-foreground hover:text-foreground transition-colors duration-300">
            <ShoppingBag className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-foreground text-background text-[9px] font-medium flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <button onClick={logout} className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300">
              Logout
            </button>
          ) : (
            <Link to="/login" className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-300">
              <User className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 animate-fade-in">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            <Link to="/shop" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.15em] uppercase text-foreground py-2">
              Shop
            </Link>
            <Link to="/cart" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.15em] uppercase text-foreground py-2 flex items-center gap-2">
              Cart ({totalItems})
            </Link>
            {isAuthenticated ? (
              <>
                {user?.isAdmin && (
                  <Link to="/admin" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.15em] uppercase text-foreground py-2">
                    Admin
                  </Link>
                )}
                <button onClick={() => { logout(); setMobileOpen(false); }} className="text-xs tracking-[0.15em] uppercase text-muted-foreground py-2 text-left">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.15em] uppercase text-foreground py-2">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
