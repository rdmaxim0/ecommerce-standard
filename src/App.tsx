import { useState } from 'react';
import HeaderCatalog from './components/HeaderCatalog';
import ProductGrid from './components/ProductsGrid';
import CartSidebar, { type CartItem } from './components/CartSideBar';
import './styles/_main.scss';

function App() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState(''); // NOVO ESTADO DA PESQUISA
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + delta };
        }
        return item;
      }).filter(item => item.quantity > 0); 
    });
  };

  return (
    <>
      <HeaderCatalog 
        activeCategory={activeCategory} 
        onCategorySelect={setActiveCategory}
        cartItemsCount={totalItemsInCart}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery} // PASSA O TEXTO PARA O HEADER
        onSearchChange={setSearchQuery} // PASSA A FUNÇÃO DE ATUALIZAR O TEXTO
      />
      
      <ProductGrid 
        activeCategory={activeCategory}
        searchQuery={searchQuery} // PASSA O TEXTO PARA FILTRAR A GRADE
        onAddToCart={handleAddToCart}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </>
  );
}

export default App;