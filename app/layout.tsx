import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "전북대 공지 알리미",
  description: "JBNU & CSAI 공지사항",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      {/* 배경색(bg-gray-50) 적용 확인 */}
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
