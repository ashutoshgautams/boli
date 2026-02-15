import type { Metadata } from "next";
import AuthProvider from "./components/AuthProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Boli - Master English Through Conversation",
  description: "Learn, practice, and speak English with confidence",
   icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}