import { Link } from 'react-router-dom';
import { ShoppingBag, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">E-Shop</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost">Products</Button>
            </Link>
            <Link to="/add-product">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
