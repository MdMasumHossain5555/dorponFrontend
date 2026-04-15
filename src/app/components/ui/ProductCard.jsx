'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingCart, Star, Eye, Zap } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { useCart } from '@/app/hooks/useCart';
import { useWishlist } from '@/app/hooks/useWishlist';
import { toast } from 'sonner';
import { formatPrice } from '@/app/lib/formatPrice';

export default function ProductCard({ product }) {
  const inWishlist = false;
  const router = useRouter();

  const handleAddToCart = (e) => {
    e.preventDefault();
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    router.push('/checkout');
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    if (false) {
      toast.success('Removed from wishlist');
    } else {
      toast.success('Added to wishlist!');
    }
  };

  const priceDisplay = product.price_max
    ? `${formatPrice(product.price)} – ${formatPrice(product.price_max)}`
    : formatPrice(product.price);

  return (
    <div className="group bg-white rounded-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      
      <div className="relative overflow-hidden">
        <Link href={`/product/${product._id}`}>
          <img
            src={product.images || 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=400&fit=crop'}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Top right icons */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <button
            onClick={handleWishlist}
            className={`w-8 h-8 rounded-full bg-white shadow flex items-center justify-center transition-colors ${
              inWishlist
                ? 'text-red-500'
                : 'text-gray-400 hover:bg-[#D4AF37] hover:text-black'
            }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>

          <Link
            href={`/product/${product._id}`}
            className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-gray-400 transition-colors hover:bg-[#D4AF37] hover:text-black"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>

        {/* Badges */}
        {product.slug && (
          <Badge className="absolute top-2 left-2 bg-[#D4AF37] text-black text-xs">
            {product.slug}
          </Badge>
        )}

        {/* {product.is_featured && !product.is_best_seller && (
          <Badge className="absolute top-2 left-2 bg-[#b89220] text-black text-xs">
            Featured
          </Badge>
        )} */}

        {/* Hover buttons */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex">
          
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#D4AF37] hover:bg-[#c9a42f] text-black text-xs font-semibold py-2.5 flex items-center justify-center gap-1 transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="flex-1 bg-[#b89220] hover:bg-[#a7821b] text-black text-xs font-semibold py-2.5 flex items-center justify-center gap-1 transition-colors"
          >
            <Zap className="w-3.5 h-3.5" />
            Buy Now
          </button>

        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <Link
          href={`/product/${product._id}`}
          className="font-medium text-gray-800 hover:text-[#D4AF37] transition-colors line-clamp-2 text-sm leading-tight flex-1"
        >
          {product.name}
        </Link>

        {product.rating > 0 && (
          <div className="flex items-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-3 h-3 ${
                  s <= product.rating
                    ? 'text-[#D4AF37] fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-xs text-gray-500">
              ({product.reviews_count || 0})
            </span>
          </div>
        )}

        <div className="text-[#D4AF37] font-semibold text-sm mt-1">
          {priceDisplay}
        </div>
      </div>
    </div>
  );
}