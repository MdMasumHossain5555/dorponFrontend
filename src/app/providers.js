"use client";

import StoreProvider from "@/store/providers/StoreProvider";

export default function Providers({ children }) {
  return <StoreProvider>{children}</StoreProvider>;
}