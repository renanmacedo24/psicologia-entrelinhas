import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Entrelinhas Psicologia | Escuta no seu tempo",
  description: "Psicoterapia online e presencial com escuta atenta, respeito à sua história e um processo construído com você.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
