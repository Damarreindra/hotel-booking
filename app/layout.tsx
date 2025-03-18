import { Outfit } from "next/font/google";
import "./globals.css";
import Provider from "./components/Provider";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} dark:bg-gray-900`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
