import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductFormData } from '@/types/product';
import { mockProducts } from '@/services/api';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// TODO: Replace mock data with real API calls
// import { productAPI } from '@/services/api';

const CATEGORIES = ['Electronics', 'Books', 'Apparel', 'Home & Garden', 'Sports'];

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      fetchProduct(id);
    }
  }, [id, isEditMode]);

  const fetchProduct = async (productId: string) => {
    try {
      // TODO: Replace this with your real API call
      // const product = await productAPI.getProductById(productId);
      
      // Using mock data for now
      const product = mockProducts.find((p) => p._id === productId);
      
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          imageUrl: product.imageUrl,
        });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast({
        title: 'Error loading product',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.category || !formData.imageUrl) {
      toast({
        title: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    if (formData.price <= 0) {
      toast({
        title: 'Price must be greater than 0',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);

      if (isEditMode && id) {
        // TODO: Replace this with your real API call
        // await productAPI.updateProduct(id, formData);
        
        toast({
          title: 'Product updated successfully',
        });
      } else {
        // TODO: Replace this with your real API call
        // await productAPI.createProduct(formData);
        
        toast({
          title: 'Product created successfully',
        });
      }

      navigate('/');
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: `Error ${isEditMode ? 'updating' : 'creating'} product`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">
              {isEditMode ? 'Edit Product' : 'Add New Product'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter product description"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL *</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
                {formData.imageUrl && (
                  <div className="mt-2 aspect-video w-full overflow-hidden rounded-md border">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProductForm;
