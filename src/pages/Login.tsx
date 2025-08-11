import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('superadmin@stocktrack.cl');
  const [password, setPassword] = useState('Demo2025!');
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Por favor, ingrese email y contraseña.');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Inicio de sesión exitoso');
      // La navegación es manejada por AuthContext
    } catch (error: any) {
      toast.error('Error al iniciar sesión', {
        description: 'Credenciales inválidas. Por favor, intente de nuevo.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative w-full max-w-4xl h-[500px] md:h-[600px] overflow-hidden">
        <img
          src="/vecteezy_isometric-illustration-concept-man-analyzing-goods-in_5647959.png"
          alt="Isometric illustration of a man analyzing goods"
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 flex items-center justify-center z-10 p-4">
          <Card className="w-full max-w-sm bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-institutional-blue">Control de Inventario</CardTitle>
              <CardDescription>Duoc UC - San Bernardo</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ej: superadmin@stocktrack.cl"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-institutional-blue hover:bg-blue-800" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Iniciar Sesión
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;