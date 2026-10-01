import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Entrelinhas | Psicologia com escuta e presença",
  description: "Psicoterapia online e presencial com escuta atenta e acolhedora. Um espaço para compreender o que você sente e começar no seu tempo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
