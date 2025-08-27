export interface Product {
  id: string;
  name: string;
  scientificName: string;
  price: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  size: string;
  habitat: string;
  lifespan: string;
}

export interface CartItem extends Product {
  quantity: number;
}