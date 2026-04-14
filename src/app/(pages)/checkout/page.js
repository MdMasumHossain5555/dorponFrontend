"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import useForm from "@/app/hooks/useFrom";
import { submitOrder } from "@/app/lib/order";
import PaymentModal from "@/app/components/PaymentModal";

const initialFormState = {
  userId: "",
  name: "",
  address: "",
  email: "",
  number: "",
  paymentMethod: "",
  products: {
    productId: [],
    quantity: [],
  },
  totalPrice: 0,
  shippingCost: 0,
  subtotal: 0,
};

function Chackout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { formData, handleChange, resetForm } = useForm(initialFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handlePaymentConfirm = async (method) => {
    setSelectedPaymentMethod(method);

    const Order = {
      userId: formData.userId,
      full_name: formData.name,
      email: formData.email,
      address: formData.address,
      number: formData.number,
      paymentMethod: method,
      products: checkoutItem.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      totalPrice: totalPrice,
      shippingCost: shippingCost,
      subtotal: subtotal,
    };

    try {
      const submit = await submitOrder(Order);

      if (submit?.success) {
        alert("Order submitted successfully");
        resetForm();
      } else {
        alert("Order submission failed");
      }
    } catch (err) {
      console.error("Error submitting order:", err);
      alert("Something went wrong!");
    }
  };

  const [checkoutItem, setCheckoutItem] = useState([]);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("checkoutItems")) || [];
    setCheckoutItem(item);
    if (item.length > 0 && item[0].userId) {
      handleChange({ target: { name: "userId", value: item[0].userId } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPrice = checkoutItem.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const shippingCost = totalPrice > 0 ? 4.99 : 0;
  const subtotal = totalPrice + shippingCost;

  return (
    <>
      <div className="mt-16.5 px-5">
        <h1 className="mb-10 text-center text-2xl font-bold text-base-content">
          Chack Out
        </h1>

        <div className="grid grid-cols-1 gap-6 md:mx-5 md:grid-cols-2 md:justify-between">
          <div className="w-full">
            {checkoutItem?.map((item) => {
              const productTotalPrice = item.price * item.quantity;
              return (
                <div
                  key={item.productId}
                  className="mb-6 flex max-w-full justify-between rounded-2xl border border-[#D4AF37]/12 bg-base-100 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.08)]"
                >
                  <Image
                    width={400}
                    height={70}
                    src={item.images[0]}
                    unoptimized
                    alt={item.name}
                    className="w-20 rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-base-content">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-xs text-base-content/70">
                        36EU - 4US
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between sm:mt-0 sm:block sm:space-x-6 sm:space-y-6">
                      <div className="items-center space-x-4">
                        <p className="text-sm text-base-content">
                          Tk. {productTotalPrice.toFixed(2)}
                        </p>
                        <p className="mt-4 text-sm text-base-content/80">
                          quantity : {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full space-y-6">
            <div className="mt-6 w-full max-w-full rounded-2xl border border-[#D4AF37]/12 bg-base-100 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.08)] md:mt-0">
              <div className="mb-2 flex justify-between">
                <p className="text-base-content">Subtotal</p>
                <p className="text-base-content">Tk. {subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-base-content">Shipping</p>
                <p className="text-base-content">Tk. {shippingCost}</p>
              </div>
              <hr className="my-4 border-[#D4AF37]/12" />
              <div className="flex justify-between">
                <p className="text-lg font-bold text-base-content">Total</p>
                <div>
                  <p className="mb-1 text-lg font-bold text-base-content">
                    Tk. {totalPrice.toFixed(2)}
                  </p>
                  <p className="text-sm text-base-content/70">including VAT</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#D4AF37]/12 bg-base-100 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
              <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm/6 font-medium text-base-content"
                  >
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      className="block w-full rounded-md border border-[#D4AF37]/15 bg-base-100 px-3 py-1.5 text-base text-base-content outline-none placeholder:text-base-content/40 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-base-content"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      onChange={handleChange}
                      value={formData.email}
                      autoComplete="email"
                      className="block w-full rounded-md border border-[#D4AF37]/15 bg-base-100 px-3 py-1.5 text-base text-base-content outline-none placeholder:text-base-content/40 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm/6 font-medium text-base-content"
                  >
                    Address (with area)
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="address"
                      name="address"
                      type="text"
                      required
                      onChange={handleChange}
                      value={formData.address}
                      autoComplete="address"
                      className="block w-full rounded-md border border-[#D4AF37]/15 bg-base-100 px-3 py-1.5 text-base text-base-content outline-none placeholder:text-base-content/40 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm/6 font-medium text-base-content"
                  >
                    Phone
                  </label>
                  <div className="mt-1">
                    <input
                      id="phone"
                      name="number"
                      type="tel"
                      required
                      onChange={handleChange}
                      value={formData.number}
                      autoComplete="tel"
                      className="block w-full rounded-md border border-[#D4AF37]/15 bg-base-100 px-3 py-1.5 text-base text-base-content outline-none placeholder:text-base-content/40 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-[#D4AF37] px-3 py-1.5 text-sm/6 font-semibold text-black shadow-lg transition hover:bg-[#c9a42f] hover:shadow-[#D4AF37]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
                  >
                    Order Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onPaymentConfirm={handlePaymentConfirm}
      />
    </>
  );
}

export default Chackout;