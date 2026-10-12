import { useState } from 'react';
import { XIcon, TrashIcon, WhatsappLogoIcon, CaretLeftIcon } from '@phosphor-icons/react';
import '../styles/components/_cartSideBar.scss';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onRemoveItem: (id: number) => void;
    onUpdateQuantity: (id: number, delta: number) => void;
}

const CartSidebar = ({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity }: CartSidebarProps) => {
    // Novos estados para o formulário
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');

    const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const formatPrice = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    // Nova função acionada ao enviar o formulário
    const handleSendOrder = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault(); // Impede a página de recarregar
        if (cartItems.length === 0) return;

        const phoneNumber = "5521983873080"; 
        
        // Mensagem formatada com os dados do cliente
        let message = `Olá! Meu nome é *${customerName}* (WhatsApp: ${customerPhone}) e gostaria de fazer o seguinte pedido:\n\n`;
        
        cartItems.forEach(item => {
            message += `${item.quantity}x ${item.name} - ${formatPrice(item.price * item.quantity)}\n`;
        });
        
        message += `\n*Total do Pedido: ${formatPrice(totalAmount)}*`;
        message += "\n\nQual é o tempo estimado de entrega?";

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    // Função para fechar o carrinho e resetar a vista para a lista de itens
    const handleClose = () => {
        setIsCheckingOut(false);
        onClose();
    };

    return (
        <>
            <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={handleClose}></div>

            <aside className={`cart-sidebar ${isOpen ? 'active' : ''}`}>
                <div className="cart-header">
                    {/* Muda o título se estiver na tela de checkout */}
                    {isCheckingOut ? (
                        <button className="back-btn" onClick={() => setIsCheckingOut(false)}>
                            <CaretLeftIcon size={24} weight="bold" />
                            <h3>Voltar</h3>
                        </button>
                    ) : (
                        <h3>Seu Pedido</h3>
                    )}
                    
                    <button className="close-btn" onClick={handleClose} aria-label="Fechar carrinho">
                        <XIcon size={24} weight="bold" />
                    </button>
                </div>

                <div className="cart-body">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <p>Seu carrinho está vazio.</p>
                            <button className="btn-continue" onClick={handleClose}>Continuar Comprando</button>
                        </div>
                    ) : isCheckingOut ? (
                        // VISTA DE FORMULÁRIO DE CHECKOUT
                        <form id="checkout-form" className="checkout-form" onSubmit={handleSendOrder}>
                            <h4>Dados do Cliente</h4>
                            <div className="form-group">
                                <label htmlFor="name">Seu Nome</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    required 
                                    placeholder="Como devemos chamá-lo?"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Seu Número (WhatsApp)</label>
                                <input 
                                    type="tel" 
                                    id="phone" 
                                    required 
                                    placeholder="(21) 99999-9999"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                />
                            </div>
                        </form>
                    ) : (
                        // VISTA DA LISTA DE ITENS
                        <ul className="cart-items-list">
                            {cartItems.map(item => (
                                <li key={item.id} className="cart-item">
                                    <div className="item-info">
                                        <h4>{item.name}</h4>
                                        <span className="item-price">{formatPrice(item.price)}</span>
                                    </div>
                                    
                                    <div className="item-controls">
                                        <div className="qty-wrapper">
                                            <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                                        </div>
                                        <button className="btn-remove" onClick={() => onRemoveItem(item.id)}>
                                            <TrashIcon size={20} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Total:</span>
                            <strong>{formatPrice(totalAmount)}</strong>
                        </div>
                        
                        {/* ALTERA OS BOTÕES DEPENDENDO DA VISTA */}
                        {isCheckingOut ? (
                            <button type="submit" form="checkout-form" className="btn-checkout">
                                <WhatsappLogoIcon size={24} weight="fill" />
                                Enviar Pedido
                            </button>
                        ) : (
                            <>
                                <button className="btn-checkout" onClick={() => setIsCheckingOut(true)}>
                                    Avançar para Finalizar
                                </button>
                                <button className="btn-continue-shopping" onClick={handleClose}>
                                    Continuar Comprando
                                </button>
                            </>
                        )}
                    </div>
                )}
            </aside>
        </>
    );
};

export default CartSidebar;