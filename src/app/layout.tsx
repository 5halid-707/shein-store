import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";
import { ToastProvider } from "@/context/toast-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileTabBar } from "@/components/mobile-tab-bar";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Toaster } from "@/components/toaster";
import { CartDrawer } from "@/components/cart-drawer";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SHEIN | أزياء عصرية للجنسين والأطفال بأفضل الأسعار",
  description:
    "SHEIN - متجر الأزياء العصرية الأول في السعودية. ملابس رجالية ونسائية وأطفال، إكسسوارات، تجميل، ومنزل. شحن سريع، إرجاع مجاني خلال 35 يوم، وأكثر من 70% خصم.",
  keywords: [
    "SHEIN",
    "شين",
    "أزياء",
    "ملابس نسائية",
    "ملابس رجالية",
    "أطفال",
    "إكسسوارات",
    "تجميل",
    "السعودية",
    "تسوق اونلاين",
  ],
  openGraph: {
    title: "SHEIN | أزياء عصرية للجنسين والأطفال",
    description: "أزياء عصرية بأسعار منافسة وشحن سريع للسعودية",
    type: "website",
    locale: "ar_SA",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="min-h-screen bg-shein-bg font-sans text-shein-text antialiased">
        <ToastProvider>
          <WishlistProvider>
            <CartProvider>
              <div className="flex min-h-screen flex-col">
                <AnnouncementBar />
                <SiteHeader />
                <main className="flex-1 pb-20 md:pb-0">{children}</main>
                <SiteFooter />
                <MobileTabBar />
              </div>
              <CartDrawer />
              <Toaster />
            </CartProvider>
          </WishlistProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
