import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/components/AuthProvider";

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
          <div className="pt-16 md:pt-4">
            <AuthProvider>{children}</AuthProvider>
          </div>
        </Navbar>
      </body>
    </html>
  );
}
