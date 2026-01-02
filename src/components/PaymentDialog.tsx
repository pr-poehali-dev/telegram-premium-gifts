import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  totalPrice: number;
}

export default function PaymentDialog({ isOpen, onClose, cartItems, totalPrice }: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('card');
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');

  return (
    <>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
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
                onClick={onClose}
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
    </>
  );
}
