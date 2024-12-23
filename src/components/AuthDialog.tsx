import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthDialog = ({ isOpen, onClose }: AuthDialogProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent, role: 'user' | 'salon_owner') => {
    e.preventDefault();
    if (isLogin) {
      await login(email, password, role);
    } else {
      await signup(name, email, password, role);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isLogin ? "Login" : "Sign Up"}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="user">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">Customer</TabsTrigger>
            <TabsTrigger value="salon_owner">Salon Owner</TabsTrigger>
          </TabsList>
          
          <TabsContent value="user">
            <form onSubmit={(e) => handleSubmit(e, 'user')} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name-user">Name</Label>
                  <Input
                    id="name-user"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {isLogin ? "Login as Customer" : "Sign Up as Customer"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="salon_owner">
            <form onSubmit={(e) => handleSubmit(e, 'salon_owner')} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name-owner">Name</Label>
                  <Input
                    id="name-owner"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email-owner">Email</Label>
                <Input
                  id="email-owner"
                  type="email"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {isLogin ? "Login as Salon Owner" : "Sign Up as Salon Owner"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-4">
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};