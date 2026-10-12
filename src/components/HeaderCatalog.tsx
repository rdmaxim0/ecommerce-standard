import { MagnifyingGlassIcon, ShoppingCartIcon } from '@phosphor-icons/react';
import '../styles/components/_headerCatalog.scss';

interface HeaderProps {
    activeCategory: string;
    onCategorySelect: (category: string) => void;
    cartItemsCount: number;
    onOpenCart: () => void;
    searchQuery: string; // NOVA PROP
    onSearchChange: (query: string) => void; // NOVA PROP
}

const HeaderCatalog = ({ activeCategory, onCategorySelect, cartItemsCount, onOpenCart, searchQuery, onSearchChange }: HeaderProps) => {
    const categories = ['Todos', 'Burgers', 'Combos', 'Porções', 'Bebidas', 'Sobremesas'];

    return (
        <header className="catalog-header">
            <div className="header-top container">
                <div className="brand">
                    <h2>Sua<span>Loja</span></h2> 
                </div>
                
                <button className="cart-btn" onClick={onOpenCart} aria-label="Ver Carrinho">
                    <ShoppingCartIcon size={28} weight="fill" />
                    {cartItemsCount > 0 && (
                        <span className="cart-badge">{cartItemsCount}</span>
                    )}
                </button>
            </div>

            <div className="search-bar container">
                <div className="search-input-wrapper">
                    <MagnifyingGlassIcon size={20} className="search-icon" />
                    {/* INPUT ATUALIZADO */}
                    <input 
                        type="text" 
                        placeholder="O que você está procurando?" 
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>

            <nav className="categories-nav">
                <ul className="categories-list">
                    {categories.map((cat, index) => (
                        <li key={index}>
                            <button 
                                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => onCategorySelect(cat)}
                            >
                                {cat}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default HeaderCatalog;