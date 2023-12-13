// layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import { metadata } from "./metadata"; // import metadata from the new file

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
