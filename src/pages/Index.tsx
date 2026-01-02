import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import CartSheet from '@/components/CartSheet';
import PaymentDialog from '@/components/PaymentDialog';

interface Product {
  id: number;
  name: string;
  category: 'stars' | 'premium';
  price: number;
  description: string;
  icon: string;
  popular?: boolean;
}

const products: Product[] = [
  { id: 1, name: '100 Stars', category: 'stars', price: 99, description: 'Для поддержки авторов', icon: 'Star', popular: true },
  { id: 2, name: '500 Stars', category: 'stars', price: 449, description: 'Выгодный пакет', icon: 'Star' },
  { id: 3, name: '1000 Stars', category: 'stars', price: 849, description: 'Максимальная экономия', icon: 'Star' },
  { id: 4, name: 'Premium 1 месяц', category: 'premium', price: 399, description: 'Все возможности Telegram', icon: 'Crown', popular: true },
  { id: 5, name: 'Premium 3 месяца', category: 'premium', price: 999, description: 'Выгодная подписка', icon: 'Crown' },
  { id: 6, name: 'Premium 6 месяцев', category: 'premium', price: 1799, description: 'Максимальная выгода', icon: 'Crown' },
];

export default function Index() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'stars' | 'premium'>('all');
  const [cart, setCart] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const addToCart = (id: number) => {
    setCart([...cart, id]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const cartItems = cart.map(id => products.find(p => p.id === id)!);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsPaymentOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartCount={cart.length} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <Badge className="bg-secondary/20 text-secondary border-secondary/30 backdrop-blur">
              <Icon name="Sparkles" size={14} className="mr-1" />
              Цифровой маркетплейс
            </Badge>
            
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Telegram Stars
              </span>
              <br />
              & Premium
            </h2>
            
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Все цифровые товары для Telegram в одном месте. Быстрая доставка, безопасные платежи.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white gap-2">
                <Icon name="ShoppingBag" size={20} />
                Перейти в каталог
              </Button>
              <Button size="lg" variant="outline" className="gap-2 glass">
                <Icon name="Info" size={20} />
                Узнать больше
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-foreground/30" />
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {[
              { id: 'all', label: 'Все товары', icon: 'Grid3x3' },
              { id: 'stars', label: 'Telegram Stars', icon: 'Star' },
              { id: 'premium', label: 'Premium', icon: 'Crown' },
            ].map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? 'default' : 'outline'}
                className={activeCategory === cat.id 
                  ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                  : 'glass hover:bg-white/10'}
                onClick={() => setActiveCategory(cat.id as any)}
              >
                <Icon name={cat.icon as any} size={18} className="mr-2" />
                {cat.label}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="glass border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 overflow-hidden group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center ${
                      product.category === 'stars' ? 'from-amber-500 to-orange-500' :
                      product.category === 'premium' ? 'from-blue-500 to-purple-500' :
                      'from-pink-500 to-purple-500'
                    }`}>
                      <Icon name={product.icon as any} size={28} className="text-white" />
                    </div>
                    {product.popular && (
                      <Badge className="bg-accent text-white border-0">
                        Популярно
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm text-foreground/60">{product.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {product.price} ₽
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      onClick={() => addToCart(product.id)}
                    >
                      <Icon name="Plus" size={16} className="mr-1" />
                      В корзину
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Почему выбирают нас?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: 'Zap', title: 'Моментальная доставка', desc: 'Получайте товары сразу после оплаты' },
                { icon: 'Shield', title: 'Безопасные платежи', desc: 'Поддержка крипто и банковских карт' },
                { icon: 'Headphones', title: 'Поддержка 24/7', desc: 'Всегда на связи для решения вопросов' },
              ].map((feature, i) => (
                <Card key={i} className="glass border-border/50 p-6 text-center space-y-3 hover:scale-105 transition-transform">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary mx-auto flex items-center justify-center">
                    <Icon name={feature.icon as any} size={24} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-lg">{feature.title}</h4>
                  <p className="text-sm text-foreground/60">{feature.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      <PaymentDialog
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
      />

      <footer className="border-t border-border/50 py-8 glass">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Zap" size={18} className="text-white" />
              </div>
              <span className="font-semibold">StarShop</span>
            </div>
            <p className="text-sm text-foreground/60">
              © 2024 StarShop. Все права защищены.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Icon name="Send" size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Icon name="Twitter" size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Icon name="Github" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}