import React, { useState, useMemo } from 'react';
import { CartProvider } from '../contexts/CartContext';
import { AppSidebar } from '../components/AppSidebar';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import ProductFilters from '../components/ProductFilters';
import Cart from '../components/Cart';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products } from '../data/products';
import { Product } from '../types/product';
import { Bug, Star, Shield, Heart, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todos');
  const [showInStock, setShowInStock] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'Todos' || product.difficulty === selectedDifficulty;
      const matchesStock = !showInStock || product.inStock;
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesDifficulty && matchesStock && matchesSearch;
    });
  }, [selectedCategory, selectedDifficulty, showInStock, searchTerm]);

  const handleViewDetails = (product: Product) => {
    console.log('Viewing product details:', product.name);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const clearFilters = () => {
    setSelectedCategory('Todos');
    setSelectedDifficulty('Todos');
    setShowInStock(false);
    setSearchTerm('');
  };

  const featuredProducts = products.filter(p => p.inStock).slice(0, 3);

  return (
    <CartProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50">
          <AppSidebar />
          
          <main className="flex-1">
            {/* Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-40">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <SidebarTrigger />
                  <div className="flex items-center gap-2">
                    <Bug className="w-6 h-6 text-green-600" />
                    <h1 className="text-xl font-bold">InsectoShop</h1>
                  </div>
                </div>
                <Cart />
              </div>
            </header>

            <div className="p-6 space-y-8">
              {/* Hero Section */}
              <section id="home" className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-8 text-center">
                <h2 className="text-4xl font-bold mb-4">Bienvenido a InsectoShop</h2>
                <p className="text-xl mb-6">Descubre el fascinante mundo de los insectos</p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span>Especies certificadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    <span>Cuidado experto</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    <span>Calidad garantizada</span>
                  </div>
                </div>
              </section>

              {/* Featured Products */}
              <section id="featured" className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-2">Productos Destacados</h2>
                  <p className="text-gray-600">Los insectos más populares de nuestra colección</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </section>

              {/* Search and Filters */}
              <section id="catalog" className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-2">Catálogo Completo</h2>
                  <p className="text-gray-600">Explora nuestra amplia selección de insectos</p>
                </div>

                {/* Search Bar */}
                <div className="max-w-md mx-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Buscar insectos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <ProductFilters
                  selectedCategory={selectedCategory}
                  selectedDifficulty={selectedDifficulty}
                  showInStock={showInStock}
                  onCategoryChange={setSelectedCategory}
                  onDifficultyChange={setSelectedDifficulty}
                  onStockFilterChange={setShowInStock}
                  onClearFilters={clearFilters}
                />

                {/* Products Grid */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">
                      Mostrando {filteredProducts.length} de {products.length} productos
                    </p>
                    {filteredProducts.length === 0 && (
                      <Button onClick={clearFilters} variant="outline">
                        Ver todos los productos
                      </Button>
                    )}
                  </div>

                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                      <Bug className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        No se encontraron productos
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Intenta ajustar tus filtros o términos de búsqueda
                      </p>
                      <Button onClick={clearFilters}>
                        Limpiar filtros
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onViewDetails={handleViewDetails}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* About Section */}
              <section id="about" className="bg-white rounded-xl p-8">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-6">Acerca de InsectoShop</h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Somos especialistas en la venta de insectos fascinantes para coleccionistas, 
                    educadores y entusiastas de la naturaleza. Cada uno de nuestros especímenes 
                    es cuidadosamente seleccionado y mantenido bajo las mejores condiciones.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center">
                      <Shield className="w-12 h-12 mx-auto text-green-600 mb-3" />
                      <h3 className="font-semibold mb-2">Calidad Garantizada</h3>
                      <p className="text-sm text-gray-600">
                        Todos nuestros insectos son criados éticamente y certificados
                      </p>
                    </div>
                    <div className="text-center">
                      <Heart className="w-12 h-12 mx-auto text-red-600 mb-3" />
                      <h3 className="font-semibold mb-2">Cuidado Experto</h3>
                      <p className="text-sm text-gray-600">
                        Nuestro equipo de entomólogos asegura el bienestar de cada espécimen
                      </p>
                    </div>
                    <div className="text-center">
                      <Star className="w-12 h-12 mx-auto text-yellow-600 mb-3" />
                      <h3 className="font-semibold mb-2">Experiencia Única</h3>
                      <p className="text-sm text-gray-600">
                        Ofrecemos una experiencia educativa y fascinante para todos
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="bg-gray-100 rounded-xl p-8">
                <div className="max-w-2xl mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-6">Contacto</h2>
                  <p className="text-gray-700 mb-6">
                    ¿Tienes preguntas sobre nuestros insectos? ¡Estamos aquí para ayudarte!
                  </p>
                  <div className="space-y-4">
                    <p className="text-lg">
                      <strong>Email:</strong> info@insectoshop.com
                    </p>
                    <p className="text-lg">
                      <strong>Teléfono:</strong> +34 123 456 789
                    </p>
                    <p className="text-lg">
                      <strong>Horario:</strong> Lunes a Viernes, 9:00 - 18:00
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </main>

          <ProductModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </div>
      </SidebarProvider>
    </CartProvider>
  );
};

export default Index;