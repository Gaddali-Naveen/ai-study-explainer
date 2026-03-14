import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Study Explainer",
  description: "Enter any study topic and get a simple, student-friendly explanation powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
