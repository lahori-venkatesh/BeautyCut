import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scissors, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'user' | 'salon_owner';
  onSuccess?: (role: 'user' | 'salon_owner') => void;
}

export const AuthDialog = ({ isOpen, onClose, defaultRole = 'user', onSuccess }: AuthDialogProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<'user' | 'salon_owner'>(defaultRole);
  const { login, signup } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent, selectedRole: 'user' | 'salon_owner') => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password, selectedRole);
        toast({
          title: `Welcome back!`,
          description: selectedRole === 'user' ? 'You can now book salon services.' : 'You can now manage your salon.',
        });
        onSuccess?.(selectedRole);
      } else {
        await signup(name, email, password, selectedRole);
        toast({
          title: "Account created successfully!",
          description: "Please sign in to continue.",
        });
        // After successful signup, switch to login form
        setIsLogin(true);
        setPassword("");
        return; // Don't close dialog yet
      }
      onClose();
      // Reset form
      setName("");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.error("Auth error:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRoleChange = (newRole: string) => {
    setRole(newRole as 'user' | 'salon_owner');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {isLogin ? "Welcome Back!" : "Create an Account"}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {isLogin ? "Sign in to continue" : "Sign up to get started"}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={role} className="mt-4" onValueChange={handleRoleChange}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="user" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Customer
            </TabsTrigger>
            <TabsTrigger value="salon_owner" className="flex items-center gap-2">
              <Scissors className="w-4 h-4" />
              Salon Owner
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="user">
            <div className="text-center mb-6 text-muted-foreground">
              {isLogin ? "Login to book salon services" : "Sign up to start booking salon services"}
            </div>
            <form onSubmit={(e) => handleSubmit(e, 'user')} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name-user">Full Name</Label>
                  <Input
                    id="name-user"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email-user">Email</Label>
                <Input
                  id="email-user"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-user">Password</Label>
                <Input
                  id="password-user"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <Button type="submit" className="w-full">
                {isLogin ? "Login as Customer" : "Sign Up as Customer"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="salon_owner">
            <div className="text-center mb-6 text-muted-foreground">
              {isLogin ? "Login to manage your salon" : "Sign up to list your salon"}
            </div>
            <form onSubmit={(e) => handleSubmit(e, 'salon_owner')} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name-owner">Salon Name</Label>
                  <Input
                    id="name-owner"
                    placeholder="Enter your salon name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email-owner">Business Email</Label>
                <Input
                  id="email-owner"
                  type="email"
                  placeholder="Enter your business email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-owner">Password</Label>
                <Input
                  id="password-owner"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <Button type="submit" className="w-full">
                {isLogin ? "Login as Salon Owner" : "Sign Up as Salon Owner"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-6">
          <Button
            variant="link"
            onClick={() => {
              setIsLogin(!isLogin);
              setName("");
              setEmail("");
              setPassword("");
            }}
            className="text-sm"
          >
            {isLogin
              ? "New to BeautyCut? Create an account"
              : "Already have an account? Login"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};