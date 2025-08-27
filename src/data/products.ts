import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Mantis Religiosa',
    scientificName: 'Mantis religiosa',
    price: 25.99,
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
    category: 'Mantis',
    description: 'Una mantis religiosa fascinante, perfecta para principiantes. Excelente cazadora y muy fácil de cuidar.',
    inStock: true,
    difficulty: 'Principiante',
    size: '5-7 cm',
    habitat: 'Terrario tropical',
    lifespan: '6-12 meses'
  },
  {
    id: '2',
    name: 'Escarabajo Hércules',
    scientificName: 'Dynastes hercules',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    category: 'Escarabajos',
    description: 'El escarabajo más fuerte del mundo. Impresionante espécimen para coleccionistas avanzados.',
    inStock: true,
    difficulty: 'Avanzado',
    size: '8-15 cm',
    habitat: 'Terrario húmedo',
    lifespan: '12-18 meses'
  },
  {
    id: '3',
    name: 'Tarántula Mexicana',
    scientificName: 'Brachypelma hamorii',
    price: 45.50,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    category: 'Arácnidos',
    description: 'Hermosa tarántula de colores vibrantes. Dócil y perfecta para entusiastas intermedios.',
    inStock: true,
    difficulty: 'Intermedio',
    size: '12-15 cm',
    habitat: 'Terrario seco',
    lifespan: '10-25 años'
  },
  {
    id: '4',
    name: 'Mariposa Morpho Azul',
    scientificName: 'Morpho peleides',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=400&h=300&fit=crop',
    category: 'Lepidópteros',
    description: 'Espectacular mariposa con alas azul iridiscente. Perfecta para mariposarios.',
    inStock: false,
    difficulty: 'Intermedio',
    size: '12-20 cm envergadura',
    habitat: 'Mariposario tropical',
    lifespan: '2-4 semanas'
  },
  {
    id: '5',
    name: 'Grillo Doméstico',
    scientificName: 'Acheta domesticus',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
    category: 'Ortópteros',
    description: 'Grillos cantores ideales para principiantes. Fáciles de mantener y muy activos.',
    inStock: true,
    difficulty: 'Principiante',
    size: '2-3 cm',
    habitat: 'Terrario básico',
    lifespan: '2-3 meses'
  },
  {
    id: '6',
    name: 'Insecto Palo Gigante',
    scientificName: 'Phobaeticus chani',
    price: 35.75,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    category: 'Fásmidos',
    description: 'El insecto palo más largo del mundo. Increíble capacidad de camuflaje.',
    inStock: true,
    difficulty: 'Intermedio',
    size: '35-56 cm',
    habitat: 'Terrario alto con plantas',
    lifespan: '12-18 meses'
  }
];

export const categories = [
  'Todos',
  'Mantis',
  'Escarabajos',
  'Arácnidos',
  'Lepidópteros',
  'Ortópteros',
  'Fásmidos'
];