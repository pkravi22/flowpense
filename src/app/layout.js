import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/redux/providers";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ← Import toastify styles

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata = {
  title: "Flowpense",
  description: "Company Expense Management ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          {/* 👇 Add ToastContainer once globally */}
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            transition={Slide}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
          />
        </Providers>
      </body>
    </html>
  );
}
