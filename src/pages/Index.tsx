import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: 'stars' | 'premium' | 'nft';
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
  { id: 7, name: 'Cosmic Cat NFT', category: 'nft', price: 2499, description: 'Уникальный цифровой подарок', icon: 'Sparkles' },
  { id: 8, name: 'Cyber Dragon NFT', category: 'nft', price: 4999, description: 'Эксклюзивная коллекция', icon: 'Sparkles', popular: true },
  { id: 9, name: 'Galaxy Bird NFT', category: 'nft', price: 1999, description: 'Редкая находка', icon: 'Sparkles' },
];

export default function Index() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'stars' | 'premium' | 'nft'>('all');
  const [cart, setCart] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('card');
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');

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

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                StarShop
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="text-foreground/80 hover:text-foreground transition-colors">Каталог</a>
              <a href="#stars" className="text-foreground/80 hover:text-foreground transition-colors">Stars</a>
              <a href="#premium" className="text-foreground/80 hover:text-foreground transition-colors">Premium</a>
              <a href="#nft" className="text-foreground/80 hover:text-foreground transition-colors">NFT</a>
            </nav>

            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent">
                    {cart.length}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

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
              Telegram Stars,
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Premium & NFT
              </span>
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
              { id: 'nft', label: 'NFT Подарки', icon: 'Sparkles' },
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

      {isCartOpen && (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetContent className="w-full sm:max-w-lg glass border-border/50">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-2xl">
              <Icon name="ShoppingCart" size={24} />
              Корзина
            </SheetTitle>
          </SheetHeader>

          <div className="py-6 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center">
                  <Icon name="ShoppingCart" size={40} className="text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Корзина пуста</h3>
                  <p className="text-sm text-muted-foreground">Добавьте товары из каталога</p>
                </div>
                <Button 
                  onClick={() => setIsCartOpen(false)}
                  className="bg-gradient-to-r from-primary to-secondary"
                >
                  Перейти в каталог
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                  {cartItems.map((item, index) => (
                    <Card key={index} className="glass border-border/50 p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br flex-shrink-0 flex items-center justify-center ${
                          item.category === 'stars' ? 'from-amber-500 to-orange-500' :
                          item.category === 'premium' ? 'from-blue-500 to-purple-500' :
                          'from-pink-500 to-purple-500'
                        }`}>
                          <Icon name={item.icon as any} size={20} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <p className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mt-1">
                            {item.price} ₽
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(index)}
                          className="flex-shrink-0 hover:bg-destructive/20 hover:text-destructive"
                        >
                          <Icon name="Trash2" size={18} />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-muted-foreground">Товаров:</span>
                    <span className="font-semibold">{cart.length}</span>
                  </div>
                  <div className="flex justify-between items-center text-2xl font-bold">
                    <span>Итого:</span>
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {totalPrice} ₽
                    </span>
                  </div>
                </div>

                <SheetFooter className="flex-col sm:flex-col gap-2 pt-4">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white gap-2"
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsPaymentOpen(true);
                    }}
                  >
                    <Icon name="CreditCard" size={20} />
                    Оформить заказ
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full glass"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Продолжить покупки
                  </Button>
                </SheetFooter>
              </>
            )}
          </div>
        </SheetContent>
        </Sheet>
      )}

      {isPaymentOpen && (
        <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
          <DialogContent className="sm:max-w-2xl glass border-border/50">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <Icon name="CreditCard" size={28} />
                Оформление заказа
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="glass p-4 rounded-xl space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Icon name="ShoppingBag" size={18} />
                  Ваш заказ
                </h3>
                <div className="space-y-2">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-foreground/70">{item.name}</span>
                      <span className="font-semibold">{item.price} ₽</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Итого:</span>
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {totalPrice} ₽
                  </span>
                </div>
              </div>

              <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as any)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 glass">
                  <TabsTrigger value="card" className="gap-2">
                    <Icon name="CreditCard" size={18} />
                    Банковская карта
                  </TabsTrigger>
                  <TabsTrigger value="crypto" className="gap-2">
                    <Icon name="Coins" size={18} />
                    Криптовалюта
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="card" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Номер карты</Label>
                    <Input 
                      id="cardNumber" 
                      placeholder="0000 0000 0000 0000" 
                      className="glass border-border/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Срок действия</Label>
                      <Input 
                        id="expiry" 
                        placeholder="ММ/ГГ" 
                        className="glass border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input 
                        id="cvv" 
                        placeholder="123" 
                        type="password"
                        maxLength={3}
                        className="glass border-border/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardHolder">Имя владельца</Label>
                    <Input 
                      id="cardHolder" 
                      placeholder="IVAN IVANOV" 
                      className="glass border-border/50"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/20 p-3 rounded-lg">
                    <Icon name="Shield" size={16} />
                    <span>Безопасная оплата через защищенное соединение</span>
                  </div>
                </TabsContent>

                <TabsContent value="crypto" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label>Выберите криптовалюту</Label>
                    <RadioGroup value={selectedCrypto} onValueChange={setSelectedCrypto}>
                      {[
                        { id: 'BTC', name: 'Bitcoin', icon: '₿', color: 'from-orange-500 to-orange-600' },
                        { id: 'ETH', name: 'Ethereum', icon: 'Ξ', color: 'from-blue-500 to-purple-600' },
                        { id: 'USDT', name: 'Tether', icon: '₮', color: 'from-green-500 to-green-600' },
                        { id: 'TON', name: 'Toncoin', icon: '💎', color: 'from-blue-400 to-cyan-500' },
                      ].map((crypto) => (
                        <Card 
                          key={crypto.id} 
                          className={`glass border-border/50 p-4 cursor-pointer transition-all ${
                            selectedCrypto === crypto.id ? 'border-primary ring-2 ring-primary/50' : ''
                          }`}
                          onClick={() => setSelectedCrypto(crypto.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${crypto.color} flex items-center justify-center text-white font-bold`}>
                                {crypto.icon}
                              </div>
                              <div>
                                <p className="font-semibold">{crypto.name}</p>
                                <p className="text-sm text-muted-foreground">{crypto.id}</p>
                              </div>
                            </div>
                            <RadioGroupItem value={crypto.id} />
                          </div>
                        </Card>
                      ))}
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="walletAddress">Ваш кошелек</Label>
                    <Input 
                      id="walletAddress" 
                      placeholder="Введите адрес кошелька" 
                      className="glass border-border/50 font-mono text-sm"
                    />
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground bg-accent/10 p-3 rounded-lg">
                    <Icon name="Info" size={16} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Инструкция по оплате</p>
                      <p>После нажатия кнопки оплаты вы получите адрес для перевода. Товары будут доставлены после подтверждения транзакции.</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                className="glass"
                onClick={() => setIsPaymentOpen(false)}
              >
                Отмена
              </Button>
              <Button 
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white gap-2"
              >
                <Icon name="Lock" size={18} />
                Оплатить {totalPrice} ₽
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

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