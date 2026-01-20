import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://zerotime.kr/settings",
  },
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
