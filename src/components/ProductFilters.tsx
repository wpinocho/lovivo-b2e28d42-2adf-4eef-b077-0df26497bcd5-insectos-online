import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories } from '../data/products';
import { Filter, X } from 'lucide-react';

interface ProductFiltersProps {
  selectedCategory: string;
  selectedDifficulty: string;
  showInStock: boolean;
  onCategoryChange: (category: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onStockFilterChange: (showInStock: boolean) => void;
  onClearFilters: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedCategory,
  selectedDifficulty,
  showInStock,
  onCategoryChange,
  onDifficultyChange,
  onStockFilterChange,
  onClearFilters,
}) => {
  const hasActiveFilters = selectedCategory !== 'Todos' || selectedDifficulty !== 'Todos' || showInStock;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5" />
        <h3 className="font-semibold">Filtros</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="ml-auto text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4 mr-1" />
            Limpiar
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Categoría</label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Dificultad</label>
          <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar dificultad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              <SelectItem value="Principiante">Principiante</SelectItem>
              <SelectItem value="Intermedio">Intermedio</SelectItem>
              <SelectItem value="Avanzado">Avanzado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-end">
          <Button
            variant={showInStock ? "default" : "outline"}
            onClick={() => onStockFilterChange(!showInStock)}
            className="w-full"
          >
            Solo en Stock
          </Button>
        </div>
      </div>
      
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          <span className="text-sm text-gray-600">Filtros activos:</span>
          {selectedCategory !== 'Todos' && (
            <Badge variant="secondary" className="text-xs">
              {selectedCategory}
            </Badge>
          )}
          {selectedDifficulty !== 'Todos' && (
            <Badge variant="secondary" className="text-xs">
              {selectedDifficulty}
            </Badge>
          )}
          {showInStock && (
            <Badge variant="secondary" className="text-xs">
              En Stock
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductFilters;