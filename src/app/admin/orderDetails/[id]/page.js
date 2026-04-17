"use client";
import React from "react";
import Image from "next/image";
import { useGetOrderByIdQuery } from "@/redux/services/orderApi";
import { useParams } from "next/navigation";

function OrderDetails() {
  const params = useParams();
  const orderId = params.id;
  
  const { data: order, isLoading, error } = useGetOrderByIdQuery(orderId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading order details
      </div>
    );
  }

  return (
    <>
      <div className="header">
        <h1 className="text-3xl">Order Details</h1>
        <p className="flex gap-3">
          <span className="text-gray-500">Order number :</span>
          <span>{order._id || 'N/A'}</span> . <span>{new Date(order.createdAt).toLocaleDateString()}</span>
        </p>
      </div>

      <div className="flex gap-6 mt-15">
        <div className="w-1/3">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIeg0iei1GkiuII7VIfUWnKQES2qIsAYp4mw&s"
            alt="Order Image"
            width={500}
            height={300}
            unoptimized
            loading="lazy"
            className="w-full h-auto object-cover rounded-lg mb-4"
          />
        </div>
        <div className="w-2/3">
          <h3 className="text-2xl">Order Summary</h3>
          <p className="mt-2">Total: ${order.subtotal || '0'}</p>
          <p className="text-gray-600 mt-2">
            {order.paymentMethod && `Payment Method: ${order.paymentMethod}`}
          </p>
          <div className="flex gap-6 mt-8">
            <div className="w-1/2">
              <h3>Delivery address</h3>
              <p>{order.full_name || 'N/A'}</p>
              <p>{order.address || 'N/A'}</p>
              <p>ON N3Y 4H8</p>
            </div>
            <div className="w-1/2">
              <h3>Shipping updates</h3>
              <input
                className="block w-full mb-2"
                type="email"
                defaultValue={"mdmasumhossain1712@gmail.com"}
                disabled
              />
              <input
                className="block w-full mb-2"
                type="number"
                defaultValue={"01772423200"}
                disabled
              />
              <button className="text-blue-700" type="submit">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 mt-15">
        <div className="w-1/3">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIeg0iei1GkiuII7VIfUWnKQES2qIsAYp4mw&s"
            alt="Order Image"
            width={500}
            height={300}
            unoptimized
            loading="lazy"
            className="w-full h-auto object-cover rounded-lg mb-4"
          />
        </div>
        <div className="w-2/3">
          <h3 className="text-2xl">makeup Product</h3>
          <p className="mt-2">$500</p>
          <p className="text-gray-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex gap-6 mt-8">
            <div className="w-1/2">
              <h3>Delivery address</h3>
              <p>Floyd Miles </p>
              <p> 7363 Cynthia Pass Toronto,</p>
              <p>ON N3Y 4H8</p>
            </div>
            <div className="w-1/2">
              <h3>Shipping updates</h3>
              <input
                className="block w-full mb-2"
                type="email"
                defaultValue={"mdmasumhossain1712@gmail.com"}
                disabled
              />
              <input
                className="block w-full mb-2"
                type="number"
                defaultValue={"01772423200"}
                disabled
              />
              <button className="text-blue-700" type="submit">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 mt-15">
        <div className="w-1/3">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIeg0iei1GkiuII7VIfUWnKQES2qIsAYp4mw&s"
            alt="Order Image"
            width={500}
            height={300}
            unoptimized
            loading="lazy"
            className="w-full h-auto object-cover rounded-lg mb-4"
          />
        </div>
        <div className="w-2/3">
          <h3 className="text-2xl">makeup Product</h3>
          <p className="mt-2">$500</p>
          <p className="text-gray-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex gap-6 mt-8">
            <div className="w-1/2">
              <h3>Delivery address</h3>
              <p>Floyd Miles </p>
              <p> 7363 Cynthia Pass Toronto,</p>
              <p>ON N3Y 4H8</p>
            </div>
            <div className="w-1/2">
              <h3>Shipping updates</h3>
              <input
                className="block w-full mb-2"
                type="email"
                defaultValue={"mdmasumhossain1712@gmail.com"}
                disabled
              />
              <input
                className="block w-full mb-2"
                type="number"
                defaultValue={"01772423200"}
                disabled
              />
              <button className="text-blue-700" type="submit">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 mt-15">
        <div className="w-1/3">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIeg0iei1GkiuII7VIfUWnKQES2qIsAYp4mw&s"
            alt="Order Image"
            width={500}
            height={300}
            unoptimized
            loading="lazy"
            className="w-full h-auto object-cover rounded-lg mb-4"
          />
        </div>
        <div className="w-2/3">
          <h3 className="text-2xl">makeup Product</h3>
          <p className="mt-2">$500</p>
          <p className="text-gray-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex gap-6 mt-8">
            <div className="w-1/2">
              <h3>Delivery address</h3>
              <p>Floyd Miles </p>
              <p> 7363 Cynthia Pass Toronto,</p>
              <p>ON N3Y 4H8</p>
            </div>
            <div className="w-1/2">
              <h3>Shipping updates</h3>
              <input
                className="block w-full mb-2"
                type="email"
                defaultValue={"mdmasumhossain1712@gmail.com"}
                disabled
              />
              <input
                className="block w-full mb-2"
                type="number"
                defaultValue={"01772423200"}
                disabled
              />
              <button className="text-blue-700" type="submit">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full mt-8">
        <div className="flex gap-4">
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-2">Billing address</h3>
            <p className="text-gray-700">Floyd Miles</p>
            <p className="text-gray-700">7363 Cynthia Pass</p>
            <p className="text-gray-700">Toronto, ON N3Y 4H8</p>
          </div>
          <div className="w-1/4 flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Payment information
              </h3>
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                  VISA
                </div>
                <div>
                  <p className="text-gray-700">Ending with 4242</p>
                  <p className="text-gray-500 text-sm">Expires 02/24</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/4">
            <h3 className="text-lg font-semibold mb-2">Order summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Subtotal</span>
                <span className="text-gray-700">$72</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Shipping</span>
                <span className="text-gray-700">$5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Tax</span>
                <span className="text-gray-700">$6.16</span>
              </div>
              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-700">Order total</span>
                  <span className="text-gray-700">$83.16</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
