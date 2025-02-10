import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/providers/toast-provider";

export const metadata: Metadata = {
  title: "Bigs",
  description: "Bigs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
