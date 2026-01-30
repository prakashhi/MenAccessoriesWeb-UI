import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | RockRoars",
  description:
    "Contact RockRoars for support, order queries, returns, or general inquiries. Reach us via email, phone, or our contact form.",
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
