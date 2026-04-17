"use client";

import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDown, ArrowUp, Box, Users } from "lucide-react";
import { useGetProductsQuery } from "@/redux/services/productApi";
import { useGetMyOrdersQuery } from "@/redux/services/orderApi";
import { useGetUsersQuery } from "@/redux/services/userApi";

export const EcommerceMetrics = () => {
  const { data: products = [] } = useGetProductsQuery();
  const { data: orders = [] } = useGetMyOrdersQuery();
  const { data: users = [] } = useGetUsersQuery();

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (Number(order.subtotal) || 0),
    0
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
          <Users className="size-6 text-gray-800 dark:text-white/90" />
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Customers
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {users.length}
            </h4>
          </div>
          <Badge color="success">
            <ArrowUp />
            Live
          </Badge>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
          <Box className="text-gray-800 dark:text-white/90" />
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Orders
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {orders.length}
            </h4>
          </div>

          <Badge color="success">
            <ArrowUp />
            Live
          </Badge>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
          <Box className="text-gray-800 dark:text-white/90" />
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Products
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {products.length}
            </h4>
          </div>

          <Badge color="error">
            <ArrowDown className="text-error-500" />
            {totalRevenue.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}
          </Badge>
        </div>
      </div>
    </div>
  );
};