import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import AuthProvider from "./context/AuthProvider";

export const metadata = {
  title: "Home | ByondBeLeaf - Natural Healing & Wellness",
  description:
    "ByondBeLeaf offers organic, plant-based topical healing products including The Miracle Bundle to relieve suffering naturally and safely.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Header />
            <CartDrawer />
            <main>{children}</main>
            <Footer />
            <div className="chat-widget" aria-label="Open Live Chat">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
