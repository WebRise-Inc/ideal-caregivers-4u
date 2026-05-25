import type { Metadata } from "next";
import { Lato, Nunito_Sans } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-display",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seniorcare.idealcaregivers4u.com"),
  title: "Senior Home Care Ottawa | Ideal Caregivers 4u",
  description:
    "Book a free care assessment with Ideal Caregivers 4u for trusted in-home senior care, dementia care, overnight support, and 24/7 care in Ottawa.",
  icons: {
    icon: "/brand/logo.png",
  },
  openGraph: {
    title: "Senior Home Care in Ottawa | Ideal Caregivers 4u",
    description:
      "Certified, insured caregivers for Ottawa families needing dementia care, companionship, overnight support, personal care, and palliative care at home.",
    images: ["/brand/hero-care.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${nunitoSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
