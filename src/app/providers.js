"use client";

import StoreProvider from "@/store/providers/StoreProvider";
import { Toaster } from "sonner";

export default function Providers({ children }) {
  return (
    <StoreProvider>
      {children}
      <Toaster richColors position="bottom-right" />
    </StoreProvider>
  );
}