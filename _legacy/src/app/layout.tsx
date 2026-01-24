import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Стоматология Татьяна Вакалова | Современная стоматологическая клиника в Праге",
  description:
    "Профессиональная стоматологическая помощь в Праге. Опытные врачи, современное оборудование, безболезненное лечение. Запишитесь на бесплатную консультацию!",
  keywords: [
    "стоматология Прага",
    "зубной врач Прага",
    "лечение зубов",
    "имплантация зубов",
    "отбеливание зубов",
    "детский стоматолог",
    "стоматологическая клиника",
  ],
  authors: [{ name: "Татьяна Вакалова" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://vakalova-dental.cz",
    title: "Стоматология Татьяна Вакалова",
    description:
      "Современная стоматологическая клиника в Праге. Безболезненное лечение, опытные врачи, доступные цены.",
    siteName: "Стоматология Татьяна Вакалова",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Data for Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "Стоматологическая клиника Татьяна Вакалова",
    "image": "https://vakalova-dental.cz/logo.jpg",
    "@id": "https://vakalova-dental.cz",
    "url": "https://vakalova-dental.cz",
    "telephone": "+420-XXX-XXX-XXX",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Václavské náměstí 123/45",
      "addressLocality": "Praha",
      "addressRegion": "Prague",
      "postalCode": "110 00",
      "addressCountry": "CZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.0755,
      "longitude": 14.4378
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/clinic-vakalova",
      "https://www.instagram.com/clinic_vakalova"
    ]
  };

  return (
    <html lang="ru" className={inter.variable}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        
        {/* Vercel Analytics - Privacy-first, no cookies */}
        {process.env.NODE_ENV === "production" && (
          <script
            defer
            src="/_vercel/insights/script.js"
            data-endpoint="/_vercel/insights/events"
          />
        )}
      </body>
    </html>
  );
}
