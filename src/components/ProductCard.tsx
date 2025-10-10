import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product._id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="mb-2">
            <Badge variant="secondary">{product.category}</Badge>
          </div>
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
