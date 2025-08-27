import React from 'react';
import { Product } from '../types/product';
import { useCart } from '../contexts/CartContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, MapPin, Clock, Ruler } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  if (!product) return null;

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
    onClose();
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <Badge variant="destructive" className="text-lg">
                  Agotado
                </Badge>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-sm">
                {product.category}
              </Badge>
              <Badge className={`text-sm ${getDifficultyColor(product.difficulty)}`}>
                {product.difficulty}
              </Badge>
              {product.inStock ? (
                <Badge className="bg-green-100 text-green-800">
                  En Stock
                </Badge>
              ) : (
                <Badge variant="destructive">
                  Agotado
                </Badge>
              )}
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Nombre Científico</h3>
              <p className="text-gray-600 italic">{product.scientificName}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Descripción</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Tamaño</p>
                  <p className="text-sm text-gray-600">{product.size}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Esperanza de vida</p>
                  <p className="text-sm text-gray-600">{product.lifespan}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 md:col-span-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium">Hábitat requerido</p>
                  <p className="text-sm text-gray-600">{product.habitat}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <span className="text-3xl font-bold text-green-600">
                €{product.price.toFixed(2)}
              </span>
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                size="lg"
                className="px-8"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Agregar al Carrito
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;