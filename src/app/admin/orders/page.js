"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetMyOrdersQuery } from "@/redux/services/orderApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../compoments/ui/table";
import Badge from "../compoments/ui/badge/Badge";

function Orders() {
  const { data: orders = [], isLoading, error } = useGetMyOrdersQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading orders. Please try again later.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              All Orders
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
              <svg
                className="stroke-current fill-white dark:fill-gray-800"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.29004 5.90393H17.7067"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.7075 14.0961H2.29085"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                  strokeWidth="1.5"
                />
                <path
                  d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                  strokeWidth="1.5"
                />
              </svg>
              Filter
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
              See all
            </button>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Nmae
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Order Item
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Total Price
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Order Quantity
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {orders.map((order) => (
                <TableRow key={order._id}>
                    <Link href={`/admin/orderDetails/${order._id}`}>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                          <Image
                            width={50}
                            height={50}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIeg0iei1GkiuII7VIfUWnKQES2qIsAYp4mw&s"
                            className="h-[50px] w-[50px]"
                            loading="lazy"
                            unoptimized
                            alt="makeup product"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {order.full_name}
                          </p>
                          <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                            {order.address}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      5
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {order.subtotal}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <Badge size="sm" color="warming">
                        15
                      </Badge>
                    </TableCell>
                </Link>
                  </TableRow>
              ))}

              {/* <TableRow>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <Image
                        width={50}
                        height={50}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIeg0iei1GkiuII7VIfUWnKQES2qIsAYp4mw&s"
                        className="h-[50px] w-[50px]"
                        loading="lazy"
                        unoptimized
                        alt="makeup product"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        Md Masum Hossain
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        Dhaka, Bangladesh
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  5
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  500$
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge size="sm" color="warming">
                    15
                  </Badge>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <Image
                        width={50}
                        height={50}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIeg0iei1GkiuII7VIfUWnKQES2qIsAYp4mw&s"
                        className="h-[50px] w-[50px]"
                        loading="lazy"
                        unoptimized
                        alt="makeup product"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        Md Masum Hossain
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        Dhaka, Bangladesh
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  5
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  500$
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge size="sm" color="warming">
                    15
                  </Badge>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <Image
                        width={50}
                        height={50}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIeg0iei1GkiuII7VIfUWnKQES2qIsAYp4mw&s"
                        className="h-[50px] w-[50px]"
                        loading="lazy"
                        unoptimized
                        alt="makeup product"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        Md Masum Hossain
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        Dhaka, Bangladesh
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  5
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  500$
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge size="sm" color="warming">
                    15
                  </Badge>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <Image
                        width={50}
                        height={50}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIeg0iei1GkiuII7VIfUWnKQES2qIsAYp4mw&s"
                        className="h-[50px] w-[50px]"
                        loading="lazy"
                        unoptimized
                        alt="makeup product"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        Md Masum Hossain
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        Dhaka, Bangladesh
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  5
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  500$
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge size="sm" color="warming">
                    15
                  </Badge>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <Image
                        width={50}
                        height={50}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIeg0iei1GkiuII7VIfUWnKQES2qIsAYp4mw&s"
                        className="h-[50px] w-[50px]"
                        loading="lazy"
                        unoptimized
                        alt="makeup product"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        Md Masum Hossain
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        Dhaka, Bangladesh
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  5
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  500$
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge size="sm" color="warming">
                    15
                  </Badge>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <Image
                        width={50}
                        height={50}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIeg0iei1GkiuII7VIfUWnKQES2qIsAYp4mw&s"
                        className="h-[50px] w-[50px]"
                        loading="lazy"
                        unoptimized
                        alt="makeup product"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        Md Masum Hossain
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        Dhaka, Bangladesh
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  5
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  500$
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge size="sm" color="warming">
                    15
                  </Badge>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <Image
                        width={50}
                        height={50}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIeg0iei1GkiuII7VIfUWnKQES2qIsAYp4mw&s"
                        className="h-[50px] w-[50px]"
                        loading="lazy"
                        unoptimized
                        alt="makeup product"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        Md Masum Hossain
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        Dhaka, Bangladesh
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  5
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  500$
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge size="sm" color="warming">
                    15
                  </Badge>
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Orders;
