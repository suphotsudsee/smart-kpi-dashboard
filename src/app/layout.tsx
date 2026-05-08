import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart KPI Dashboard - รายงานตัวชี้วัด",
  description: "ระบบรายงานตัวชี้วัดระดับอำเภอ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="font-sarabun bg-[#f8fafc] min-h-screen">
        {children}
      </body>
    </html>
  );
}
