import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signup(name, email, password)) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-xs animate-fade-up">
        <div className="text-center mb-10">
          <h1 className="text-sm tracking-[0.15em] uppercase text-foreground font-medium">Create Account</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="bg-card border-border text-foreground placeholder:text-muted-foreground text-xs rounded-sm" />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-card border-border text-foreground placeholder:text-muted-foreground text-xs rounded-sm" />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-card border-border text-foreground placeholder:text-muted-foreground text-xs rounded-sm" />
          <button type="submit" className="w-full py-3 text-xs tracking-[0.15em] uppercase bg-foreground text-background rounded-sm hover:bg-foreground/90 transition-colors">
            Create Account
          </button>
        </form>
        <p className="text-center text-[10px] text-muted-foreground mt-6">
          Already have an account? <Link to="/login" className="text-foreground hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
