import { EcommerceMetrics } from "../compoments/ecommerce/EcommerceMetrics";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
          Dashboard
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Live store metrics pulled with RTK Query.
        </p>
      </div>

      <EcommerceMetrics />
    </div>
  );
}