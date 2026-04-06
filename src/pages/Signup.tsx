import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cloud } from "lucide-react";

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
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm animate-fade-up">
        <div className="text-center mb-8">
          <Cloud className="w-8 h-8 text-primary mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground">Create account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join unlucky.cloud</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="bg-card border-border text-foreground placeholder:text-muted-foreground" />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-card border-border text-foreground placeholder:text-muted-foreground" />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-card border-border text-foreground placeholder:text-muted-foreground" />
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Create Account</Button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
