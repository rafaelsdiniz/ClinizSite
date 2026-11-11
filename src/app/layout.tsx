import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsappFloat } from "@/components/whatsapp-float";
import { MotionProvider } from "@/components/motion-provider";
import { Preloader } from "@/components/preloader";
import { CookieNotice } from "@/components/cookie-notice";
import { SITE } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Cliniz Odontologia | Dentista na Savassi, BH",
    template: "%s | Cliniz Odontologia",
  },
  description: SITE.descricao,
  applicationName: SITE.nomeCompleto,
  keywords: [
    "dentista em Belo Horizonte",
    "dentista na Savassi",
    "clínica odontológica BH",
    "implante dentário Belo Horizonte",
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
    title: "Cliniz Odontologia | Dentista na Savassi, BH",
    description: SITE.descricao,
  },
  twitter: {
    card: "summary_large_image",
    title: "Cliniz Odontologia | Dentista na Savassi, BH",
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
    <html lang="pt-BR" className={`${jakarta.variable} ${fraunces.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script
          // Antes da pintura: pula a abertura se já foi vista nesta sessão ou se a pessoa prefere menos movimento
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("cliniz-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("intro-vista")}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <Preloader />
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
          <WhatsappFloat />
          <CookieNotice />
        </MotionProvider>
      </body>
    </html>
  );
}
