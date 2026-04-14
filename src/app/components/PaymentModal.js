"use client";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import Image from "next/image";

const paymentOptions = [
  { value: "bkash", label: "bKash", logo: "/logos/bkash.png" },
  { value: "nagad", label: "Nagad", logo: "/logos/nagad.png" },
  { value: "rocket", label: "Rocket", logo: "/logos/rocket.png" },
  { value: "islami", label: "Islami Bank Card", logo: "/logos/islami.png" },
  { value: "dbbl", label: "Dutch-Bangla Bank Card", logo: "/logos/dbbl.png" },
  { value: "credit", label: "Credit Card", logo: "/logos/credit.png" },
  { value: "master", label: "MasterCard", logo: "/logos/mastercard.png" },
  { value: "cash", label: "Cash on Delivery", logo: "/logos/cash.png" },
];

export default function PaymentModal({ isOpen, setIsOpen, onPaymentConfirm }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");

  const handleConfirm = () => {
    if (!paymentMethod) return alert("Please select a payment method.");
    if (!paymentDetails) return alert("Enter payment info to continue.");

    onPaymentConfirm({ method: paymentMethod, details: paymentDetails });
    setIsOpen(false);
    setPaymentDetails("");
    setPaymentMethod("");
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded-2xl border border-[#D4AF37]/12 bg-base-100 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.18)]">
          <Dialog.Title className="mb-5 text-center text-xl font-semibold text-base-content">
            Select Payment Method
          </Dialog.Title>

          <div className="mb-4 grid grid-cols-2 gap-4">
            {paymentOptions.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-2 transition ${
                  paymentMethod === option.value
                    ? "border-[#D4AF37] bg-[#D4AF37]/10"
                    : "border-[#D4AF37]/15 bg-base-100 hover:border-[#D4AF37]/35 hover:bg-[#D4AF37]/5"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={option.value}
                  checked={paymentMethod === option.value}
                  onChange={() => setPaymentMethod(option.value)}
                  className="hidden"
                />
                <Image
                  src={option.logo}
                  alt={option.label}
                  width={32}
                  height={32}
                />
                <span className="text-sm font-medium text-base-content">
                  {option.label}
                </span>
              </label>
            ))}
          </div>

          {paymentMethod && (
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-base-content">
                {paymentMethod === "cash"
                  ? "No info needed for Cash on Delivery"
                  : "Enter Payment Details"}
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-[#D4AF37]/15 bg-base-100 px-3 py-2 text-sm text-base-content outline-none placeholder:text-base-content/40 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                placeholder={
                  paymentMethod === "bkash"
                    ? "bKash Transaction ID"
                    : paymentMethod === "nagad"
                    ? "Nagad Transaction ID"
                    : paymentMethod.includes("card")
                    ? "Card Number"
                    : "Payment Reference"
                }
                value={paymentDetails}
                onChange={(e) => setPaymentDetails(e.target.value)}
              />
            </div>
          )}

          <button
            onClick={handleConfirm}
            className="mt-2 w-full rounded-md bg-[#D4AF37] py-2 font-semibold text-black transition hover:bg-[#c9a42f] hover:shadow-[#D4AF37]/20"
          >
            Confirm Payment
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}