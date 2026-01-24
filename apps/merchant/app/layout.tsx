import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Merchant App",
  description: "Merchant application for managing products and orders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
