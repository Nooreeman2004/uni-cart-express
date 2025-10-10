import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { mockProducts } from '@/services/api';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// TODO: Replace mock data with real API call
// import { productAPI } from '@/services/api';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      
      // TODO: Replace this with your real API call
      // const data = await productAPI.getProductById(productId);
      
      // Using mock data for now
      const data = mockProducts.find((p) => p._id === productId);
      
      if (data) {
        setProduct(data);
      } else {
        toast({
          title: 'Product not found',
          variant: 'destructive',
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast({
        title: 'Error loading product',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      // TODO: Replace this with your real API call
      // await productAPI.deleteProduct(id);
      
      toast({
        title: 'Product deleted successfully',
      });
      navigate('/');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: 'Error deleting product',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Loading product...</p>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Product not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <Badge className="mb-3">{product.category}</Badge>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-primary mb-6">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            <div className="flex gap-3 mt-auto">
              <Link to={`/edit-product/${product._id}`} className="flex-1">
                <Button className="w-full gap-2" variant="secondary">
                  <Pencil className="h-4 w-4" />
                  Edit Product
                </Button>
              </Link>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the product.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
