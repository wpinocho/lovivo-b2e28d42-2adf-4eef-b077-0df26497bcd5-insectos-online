import React from 'react';
import { Product } from '../types/product';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ShoppingCart, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast({
        title: "Producto no disponible",
        description: "Este producto está agotado actualmente.",
        variant: "destructive",
      });
      return;
    }

    addItem(product);
    toast({
      title: "¡Agregado al carrito!",
      description: `${product.name} ha sido agregado a tu carrito.`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Principiante':
        return 'bg-green-100 text-green-800';
      case 'Intermedio':
        return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
              <Badge variant="destructive" className="text-sm">
                Agotado
              </Badge>
            </div>
          )}
          <Badge 
            className={`absolute top-2 right-2 ${getDifficultyColor(product.difficulty)}`}
          >
            {product.difficulty}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow p-4">
        <h3 className="font-bold text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 italic mb-2">{product.scientificName}</p>
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="space-y-1 text-xs text-gray-600">
          <p><span className="font-medium">Tamaño:</span> {product.size}</p>
          <p><span className="font-medium">Vida útil:</span> {product.lifespan}</p>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex flex-col gap-3">
        <div className="flex justify-between items-center w-full">
          <span className="text-2xl font-bold text-green-600">
            €{product.price.toFixed(2)}
          </span>
          <Badge variant="outline">{product.category}</Badge>
        </div>
        
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(product)}
            className="flex-1"
          >
            <Info className="w-4 h-4 mr-1" />
            Detalles
          </Button>
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            size="sm"
            className="flex-1"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Agregar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;