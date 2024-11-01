import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const fontMontserrat = localFont({
  src: [
    { path: "./fonts/Montserrat-Black.ttf", 
      weight: "900",
      style: "normal"
    },
    { path: "./fonts/Montserrat-Medium.ttf", 
      weight: "500",
      style: "normal"
    },
    { path: "./fonts/Montserrat-Regular.ttf", 
      weight: "400",
      style: "normal"
    },
    { path: "./fonts/Montserrat-Thin.ttf", 
      weight: "200",
      style: "normal"
    },
  ],
 variable:"--font-montserrat",

});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
    <html lang="en">
      <body
        className={`${fontMontserrat.variable} h-screen`}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
