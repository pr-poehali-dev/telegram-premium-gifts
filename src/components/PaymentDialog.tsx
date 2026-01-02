import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  return (
    <>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-2xl glass border-border/50">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <Icon name="Smartphone" size={28} />
                Оплата через СБП
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

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sbpPhone" className="text-base">Номер телефона</Label>
                  <Input 
                    id="sbpPhone" 
                    type="tel"
                    placeholder="+7 (999) 123-45-67" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="glass border-border/50 h-12 text-lg"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base">Выберите ваш банк</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: 'Сбербанк', color: 'from-green-600 to-green-700', icon: 'Building2' },
                      { name: 'Тинькофф', color: 'from-yellow-500 to-yellow-600', icon: 'Landmark' },
                      { name: 'Альфа-Банк', color: 'from-red-600 to-red-700', icon: 'Building' },
                      { name: 'ВТБ', color: 'from-blue-600 to-blue-700', icon: 'University' },
                    ].map((bank) => (
                      <Card 
                        key={bank.name}
                        className={`glass p-4 cursor-pointer hover:scale-105 transition-all ${
                          selectedBank === bank.name ? 'border-primary ring-2 ring-primary/50' : 'border-border/50'
                        }`}
                        onClick={() => setSelectedBank(bank.name)}
                      >
                        <div className="flex flex-col items-center gap-2 text-center">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${bank.color} flex items-center justify-center`}>
                            <Icon name={bank.icon as any} size={28} className="text-white" />
                          </div>
                          <span className="font-semibold text-sm">{bank.name}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm bg-primary/10 p-4 rounded-xl">
                  <Icon name="Zap" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Моментальная оплата</p>
                    <p className="text-foreground/70">Введите номер телефона, выберите банк и нажмите "Оплатить". Откроется приложение банка для подтверждения платежа.</p>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                size="lg"
                className="glass w-full sm:w-auto"
                onClick={onClose}
              >
                Отмена
              </Button>
              <Button 
                size="lg"
                disabled={!phoneNumber || !selectedBank}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white gap-2 w-full sm:flex-1"
              >
                <Icon name="Smartphone" size={20} />
                Оплатить {totalPrice} ₽
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}