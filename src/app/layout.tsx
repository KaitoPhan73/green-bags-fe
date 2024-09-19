import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from "@/components/theme-provider";
import ReactQueryClientProvider from "@/provider/queryClient";
export const metadata: Metadata = {
  title: "Green Bag",
  description: "Túi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="mt-20">{children}</main>
            <Footer />
          </ThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
