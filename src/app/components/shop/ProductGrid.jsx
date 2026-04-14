import ProductCard from '@/app/components/ui/ProductCard';

export default function ProductGrid({ products }) {
  if (!products?.length) {
    return <p>No products found.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}