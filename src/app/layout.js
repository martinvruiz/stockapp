import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const roboto = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Stock app",
  description: "Stock app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <Navbar>
          <div className="mt-16 md:mt0">{children}</div>
        </Navbar>
      </body>
    </html>
  );
}
