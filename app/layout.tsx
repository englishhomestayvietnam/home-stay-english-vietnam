import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from 'next/font/google';
import { Toaster } from "sonner";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
  variable: '--font-montserrat',
});

// Use your actual domain
const siteUrl = 'https://www.englishhomestayvietnam.com';

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: 'Teach English & Live Free in Vietnam | English Homestay',
      template: '%s | English Homestay Vietnam',
    },

    description:
      'Volunteer to teach English in Vietnam for 15 hours/week. Get free homestay accommodation, immerse in local culture, and make meaningful connections!',

    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      siteName: 'English Homestay Vietnam',
      title: 'Teach. Travel. Connect. Live with Vietnamese Learners',
      description:
        'Free homestay for volunteer English teachers! Teach locals 15 hrs/wk, immerse in culture, and explore Vietnam. Apply now!',
    },

    twitter: {
      card: 'summary_large_image',
      title: 'Teach English & Live Free in Vietnam | English Homestay',
      description:
        'Free homestay for international English accommodation, cultural exchange, 15 hrs/week teaching. 2 weeks–3 months. Apply now!',
      creator: '@EnglishHomestayVN',
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    verification: {
      google: 'your-google-site-verification',
    },

    alternates: {
      canonical: siteUrl,
    },

    manifest: '/site.webmanifest',

    other: {
      'application-ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'English Homestay Vietnam',
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        description:
          'Cultural exchange program offering free homestay for volunteer English teachers in Hanoi, Vietnam.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Trâu Quỳ, Gia Lâm',
          addressLocality: 'Hà Nội',
          addressCountry: 'VN',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'info@englishhomestayvietnam.com',
          telephone: '+84 968 199 900',
          contactType: 'Customer Service',
        },
        sameAs: [
          'https://www.facebook.com/profile.php?id=61566361055605',
          'https://www.instagram.com/englishhomestayvietnam',
        ],
      }),
    },

    keywords: [
      // Primary search keywords
      'volunteer in vietnam',
      'volunteer opportunities in vietnam',
      'volunteer in hanoi',
      'volunteer opportunities in hanoi',
      'teach english in vietnam volunteer',
      'volunteer english teacher vietnam',
      'english homestay vietnam',
      'vietnam volunteer programs',
      'cultural exchange vietnam volunteer',
      'best volunteer programs in vietnam',
      'volunteer opportunities in hanoi vietnam',
      'volunteer in vietnam hanoi',
      'teaching english volunteers in vietnam',
      
      // Target programs & experiences
      'free homestay vietnam volunteer',
      'teach english vietnam free accommodation',
      'volunteer teaching vietnam',
      'volunteer travel vietnam',
      'gap year volunteer vietnam',
      'esl volunteer vietnam',
      'teach abroad vietnam volunteer',
      'free volunteer work exchange vietnam',
      'volunteer work with accommodation vietnam',
      
      // Hanoi localized search keywords
      'volunteer hanoi english',
      'teaching volunteer hanoi',
      'cultural immersion volunteer hanoi',
      'hanoi homestay volunteer program',
      'work exchange hanoi vietnam',
      'volunteer teacher programs hanoi',
      'hanoi volunteer opportunity',
      'esl hanoi teaching volunteer',
      
      // Secondary search keywords
      'learn vietnamese culture volunteer',
      'backpack vietnam volunteer teach',
      'budget travel vietnam volunteering',
      'meaningful travel vietnam',
      'homestay exchange teach english vietnam',
      'vietnam volunteer visa guide',
      'volunteer in southeast asia',
      'teach english in southeast asia free accommodation',
      'vietnam homestay teaching program',
      'teaching assistant volunteer vietnam',
      
      // Vietnamese localization search keywords
      'homestay tiếng anh việt nam',
      'tình nguyện viên nước ngoài dạy tiếng anh',
      'dạy tiếng anh miễn phí ở việt nam',
      'tình nguyện dạy tiếng anh hà nội',
      'trao đổi văn hóa homestay',
      'ở miễn phí dạy tiếng anh',
      'trải nghiệm văn hóa việt nam',
      'giáo viên tiếng anh tình nguyện',
      'homestay gia lâm hà nội',
    ],
  };
}

import { LazyMotion, domAnimation } from "framer-motion";
import FloatingActionButtons from "@/components/FloatingActionButtons";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta property="og:logo" content="https://www.englishhomestayvietnam.com/logo.png" />
      </head>
      <body className={`${montserrat.className} antialiased`} suppressHydrationWarning>
        <LazyMotion features={domAnimation}>
          {children}
        </LazyMotion>
        <FloatingActionButtons />
        <Toaster />
      </body>
    </html>
  );
}
