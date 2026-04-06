import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Menu, X, Cloud } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground tracking-tight">
          <Cloud className="w-5 h-5 text-primary" />
          unlucky.cloud
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(link.to)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/cart" className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {user?.isAdmin && (
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="text-xs">Admin</Button>
                </Link>
              )}
              <span className="text-sm text-muted-foreground">{user?.name}</span>
              <Button variant="ghost" size="sm" onClick={logout} className="text-xs text-muted-foreground">
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                <User className="w-4 h-4" />
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-foreground py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/cart" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-foreground py-2 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Cart ({totalItems})
            </Link>
            {isAuthenticated ? (
              <>
                {user?.isAdmin && (
                  <Link to="/admin" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-foreground py-2">
                    Admin Panel
                  </Link>
                )}
                <button onClick={() => { logout(); setMobileOpen(false); }} className="text-sm text-muted-foreground py-2 text-left">
                  Logout ({user?.name})
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-foreground py-2">
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
