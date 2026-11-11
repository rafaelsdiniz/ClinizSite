import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsappFloat } from "@/components/whatsapp-float";
import { MotionProvider } from "@/components/motion-provider";
import { SITE } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Cliniz Odontologia | Dentista em Palmas, TO",
    template: "%s | Cliniz Odontologia",
  },
  description: SITE.descricao,
  applicationName: SITE.nomeCompleto,
  keywords: [
    "dentista em Palmas",
    "clínica odontológica Palmas TO",
    "implante dentário Palmas",
    "lentes de contato dental",
    "clareamento dental",
    "ortodontia",
    "alinhadores invisíveis",
    "odontopediatria",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE.url,
    siteName: SITE.nomeCompleto,
    title: "Cliniz Odontologia | Dentista em Palmas, TO",
    description: SITE.descricao,
  },
  twitter: {
    card: "summary_large_image",
    title: "Cliniz Odontologia | Dentista em Palmas, TO",
    description: SITE.descricao,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1e4fd8",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} ${instrument.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
          <WhatsappFloat />
        </MotionProvider>
      </body>
    </html>
  );
}
