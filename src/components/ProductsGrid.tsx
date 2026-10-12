import { PlusIcon, MinusIcon } from '@phosphor-icons/react'; 
import type { CartItem } from './CartSideBar'; 
import '../styles/components/_productGrid.scss';

interface ProductGridProps {
    activeCategory: string;
    searchQuery: string; // NOVA PROP
    onAddToCart: (product: any) => void;
    cartItems: CartItem[];
    onUpdateQuantity: (id: number, delta: number) => void;
}

const products = [
    { id: 1, category: 'Burgers', name: 'Smash Burger Duplo', description: 'Pão brioche artesanal, 2x carnes smash 90g, muito cheddar e molho da casa.', price: 28.90, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80' },
    { id: 2, category: 'Burgers', name: 'Onion Rings Burger', description: 'Pão australiano, blend 160g, anéis de cebola empanados e molho barbecue.', price: 34.50, image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=500&q=80' },
    { id: 3, category: 'Burgers', name: 'Classic Salada', description: 'Pão gergelim, hambúrguer 160g, queijo prato, alface americana e tomate.', price: 24.90, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80' },
    { id: 4, category: 'Combos', name: 'Combo Casal Smash', description: '2x Smash Duplos + 1 Porção de Batata Rústica + 2 Refrigerantes lata.', price: 69.90, image: 'https://images.unsplash.com/photo-1594212699903-ef8a3fee99ea?auto=format&fit=crop&w=500&q=80' },
    { id: 5, category: 'Combos', name: 'Combo Individual', description: '1 Classic Salada + Batata Frita Pequena + Coca-Cola lata.', price: 38.00, image: 'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?auto=format&fit=crop&w=500&q=80' },
    { id: 6, category: 'Porções', name: 'Batata Rústica c/ Cheddar', description: 'Porção de 400g coberta com cheddar derretido e farofa de bacon crocante.', price: 26.00, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=500&q=80' },
    { id: 7, category: 'Porções', name: 'Nuggets Artesanais', description: '10 unidades de frango empanado crocante. Acompanha maionese verde.', price: 22.00, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80' },
    { id: 8, category: 'Bebidas', name: 'Coca-Cola Lata', description: 'Refrigerante lata 350ml (Normal ou Zero).', price: 6.50, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80' },
    { id: 9, category: 'Bebidas', name: 'Suco de Laranja Natural', description: 'Suco feito na hora 400ml.', price: 9.00, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=80' },
    { id: 10, category: 'Sobremesas', name: 'Brownie c/ Sorvete', description: 'Brownie de chocolate belga aquecido com bola de sorvete de creme.', price: 18.00, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80' },
    { id: 11, category: 'Sobremesas', name: 'Milkshake de Morango', description: 'Milkshake cremoso 400ml com chantilly e calda de morango.', price: 20.00, image: 'https://images.unsplash.com/photo-1579954115545-a95711fe5635?auto=format&fit=crop&w=500&q=80' }
];

const ProductGrid = ({ activeCategory, searchQuery, onAddToCart, cartItems, onUpdateQuantity }: ProductGridProps) => {
    
    // LÓGICA DE FILTRO ATUALIZADA
    const filteredProducts = products.filter(product => {
        // Verifica a categoria
        const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory;
        
        // Verifica a pesquisa (ignorando maiúsculas e minúsculas)
        const lowerCaseQuery = searchQuery.toLowerCase();
        const matchesSearch = product.name.toLowerCase().includes(lowerCaseQuery) || 
                              product.description.toLowerCase().includes(lowerCaseQuery);

        return matchesCategory && matchesSearch;
    });

    const formatPrice = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const getProductQuantity = (productId: number) => {
        const item = cartItems.find(cartItem => cartItem.id === productId);
        return item ? item.quantity : 0;
    };

    return (
        <section className="product-section">
            <div className="container">
                <h3 className="section-title">
                    {searchQuery 
                        ? `Resultados para "${searchQuery}"` 
                        : (activeCategory === 'Todos' ? 'Cardápio Completo' : activeCategory)}
                </h3>
                
                <div className="product-grid">
                    {filteredProducts.length === 0 ? (
                        <p className="empty-message">Nenhum produto encontrado.</p>
                    ) : (
                        filteredProducts.map((product) => {
                            const quantity = getProductQuantity(product.id);

                            return (
                                <div className="product-card" key={product.id}>
                                    <div className="product-image">
                                        <img src={product.image} alt={product.name} loading="lazy" />
                                    </div>
                                    
                                    <div className="product-content">
                                        <h4>{product.name}</h4>
                                        <p className="description">{product.description}</p>
                                        
                                        <div className="product-footer">
                                            <span className="price">{formatPrice(product.price)}</span>
                                            
                                            {quantity > 0 ? (
                                                <div className="grid-qty-wrapper">
                                                    <button 
                                                        className="qty-btn" 
                                                        onClick={() => onUpdateQuantity(product.id, -1)}
                                                        aria-label="Diminuir quantidade"
                                                    >
                                                        <MinusIcon size={14} weight="bold" />
                                                    </button>
                                                    <span className="qty-count">{quantity}</span>
                                                    <button 
                                                        className="qty-btn add" 
                                                        onClick={() => onUpdateQuantity(product.id, 1)}
                                                        aria-label="Aumentar quantidade"
                                                    >
                                                        <PlusIcon size={14} weight="bold" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button 
                                                    className="add-btn" 
                                                    onClick={() => onAddToCart(product)}
                                                    aria-label="Adicionar ao carrinho"
                                                >
                                                    <PlusIcon size={20} weight="bold" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;