import type { Metadata } from "next";
import "./../styles/globals.css";
import Header from "@/components/Header/Header";
import { Manrope } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "simplebar-react/dist/simplebar.min.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "RentalCar",
  description: "Car rental service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Toaster toastOptions={{ duration: 5000 }} position="top-right" />
      </body>
    </html>
  );
}
