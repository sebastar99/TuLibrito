"use client";

import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/contexts/auth.context";
import { ModalProvider } from "@/contexts/modal.context";

type AppProvidersProps = Readonly<{
  children: React.ReactNode;
}>;

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ModalProvider>{children}</ModalProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
