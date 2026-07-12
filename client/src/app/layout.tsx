import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { SiteAssets } from "@/components/layout/site-assets";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buddy Script",
  description: "Next.js conversion of the Buddy Script social feed kit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/logo-copy.svg" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <SiteAssets />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Script src="/assets/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/custom.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
