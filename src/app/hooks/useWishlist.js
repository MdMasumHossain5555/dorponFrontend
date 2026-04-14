import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { base44 } from '@/api/dataClient';

export function useWishlist() {
  const queryClient = useQueryClient();

  const { data: wishlistItems = [] } = useQuery({
    queryKey: ['wishlist'],
    // queryFn: () => base44.entities.WishlistItem.list(),
  });

  const addToWishlist = useMutation({
    mutationFn: (product) => {
      const existing = wishlistItems.find(i => i.product_id === product.id);
      if (existing) return Promise.resolve(existing);
      return base44.entities.WishlistItem.create({
        product_id: product.id,
        product_name: product.name,
        product_image: product.image_url,
        price: product.price,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });

  const removeFromWishlist = useMutation({
    mutationFn: (productId) => {
      const item = wishlistItems.find(i => i.product_id === productId);
      if (item) return base44.entities.WishlistItem.delete(item.id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });

  const isInWishlist = (productId) => wishlistItems.some(i => i.product_id === productId);

  return { wishlistItems, wishlistCount: wishlistItems.length, addToWishlist, removeFromWishlist, isInWishlist };
}