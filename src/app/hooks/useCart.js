import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { base44 } from '@/api/dataClient';

export function useCart() {
  const queryClient = useQueryClient();

  const { data: cartItems = [] } = useQuery({
    queryKey: ['cart'],
    // queryFn: () => base44.entities.CartItem.list(),
  });

  const addToCart = useMutation({
    mutationFn: async ({ product, variant }) => {
      const existing = cartItems.find(i => i.product_id === product.id && i.variant === (variant?.name || ''));
      if (existing) {
        return base44.entities.CartItem.update(existing.id, { quantity: existing.quantity + 1 });
      }
      return base44.entities.CartItem.create({
        product_id: product.id,
        product_name: product.name,
        product_image: product.image_url,
        price: variant?.price || product.price,
        quantity: 1,
        variant: variant?.name || '',
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const updateQuantity = useMutation({
    mutationFn: ({ id, quantity }) => quantity <= 0
      ? base44.entities.CartItem.delete(id)
      : base44.entities.CartItem.update(id, { quantity }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const removeItem = useMutation({
    mutationFn: (id) => base44.entities.CartItem.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const clearCart = useMutation({
    mutationFn: async () => {
      await Promise.all(cartItems.map(i => base44.entities.CartItem.delete(i.id)));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return { cartItems, cartCount, cartTotal, addToCart, updateQuantity, removeItem, clearCart };
}