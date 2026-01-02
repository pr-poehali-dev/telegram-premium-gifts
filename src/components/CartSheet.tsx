import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
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

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  totalPrice: number;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

export default function CartSheet({ 
  isOpen, 
  onClose, 
  cartItems, 
  totalPrice, 
  onRemoveItem,
  onCheckout 
}: CartSheetProps) {
  return (
    <>
      {isOpen && (
        <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent className="w-full sm:max-w-lg glass border-border/50">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-2xl">
                <Icon name="ShoppingCart" size={24} />
                Корзина
              </SheetTitle>
            </SheetHeader>

            <div className="py-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center">
                    <Icon name="ShoppingCart" size={40} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Корзина пуста</h3>
                    <p className="text-sm text-muted-foreground">Добавьте товары из каталога</p>
                  </div>
                  <Button 
                    onClick={onClose}
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
                            onClick={() => onRemoveItem(index)}
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
                      <span className="font-semibold">{cartItems.length}</span>
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
                      onClick={onCheckout}
                    >
                      <Icon name="CreditCard" size={20} />
                      Оформить заказ
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full glass"
                      onClick={onClose}
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
    </>
  );
}
