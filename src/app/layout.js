import './globals.scss';
import Head from 'next/head';
import Header from '@/components/Header/Header';
import { SiteProvider } from '@/context/SiteContext';
import dynamic from 'next/dynamic';

// import CallBtnFloating from '@/components/CallBtnFloating/CallBtnFloating';

// const lato = Lato({
//   weight: ['100', '300', '400', '700', '900'],
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font--lato',
// });

// const cormorantInfant = Cormorant_Infant({
//   weight: ['300', '400', '500', '600', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font--cormorantInfant',
// });

const DynamicFooter = dynamic(() => import('@/components/Footer/Footer'));
const DynamicToastProvider = dynamic(() => import('@/context/ToastProvider'));
const DynamicTranslatorProvider = dynamic(() => import('@/translator/i18Provider'));
const DynamicAuthProvider = dynamic(() => import('@/components/AuthProvider/AuthProvider'));


export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SEO_URL),
  title: 'Sofia Rent Kyiv - оренда квартири Київ. Квартири подобово.',
  description:
    'Київ квартири ⭐ Зняти квартиру Київ ✔️ Оренда квартири Київ 🔑 Квартири подобово 📅 Квартири на день',
  keywords: [
    'Київ квартири',
    'Зняти квартиру Київ',
    'Квартири на день',
    'Квартири подобово',
    'Оренда квартири Київ',
    'Киев квартиры',
    'Аренда квартир Киев посуточно',
  ],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SEO_URL,
  },
  themeColor: '#131112',
  openGraph: {
    title: 'Sofia Rent - оренда квартири Київ. Квартири подобово.',
    url: process.env.NEXT_PUBLIC_SEO_URL,
    description:
      'Київ квартири ⭐ Зняти квартиру Київ ✔️ Оренда квартири Київ 🔑 Квартири подобово 📅 Квартири на день',
    type: 'website',
    siteName: 'Sofia Rent',
    images: [
      {
        url: '/seo_images/opengraph-image-400x300.png',
        type: 'image/png',
        width: 400,
        height: 300,
        alt: 'Sofia Rent',
      },
      {
        url: '/seo_images/twitter-image-800x600.png',
        type: 'image/png',
        width: 800,
        height: 600,
        alt: 'Sofia Rent',
      },
      {
        url: '/seo_images/opengraph-image-1200-630.png',
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: 'Sofia Rent',
      },
    ],
    locale: 'uk-UA',
  },
  appLinks: {
    ios: {
      url: process.env.NEXT_PUBLIC_SEO_URL,
      app_name: 'Sofia Rent',
    },
    android: {
      url: process.env.NEXT_PUBLIC_SEO_URL,
      package: process.env.NEXT_PUBLIC_SEO_URL,
      app_name: 'Sofia Rent',
    },
    web: {
      url: process.env.NEXT_PUBLIC_SEO_URL,
      should_fallback: true,
    },
  },
  // assets: [process.env.NEXT_PUBLIC_SEO_URL],
  // verification: {
  //   google: process.env.NEXT_PUBLIC_GSC,
  // },
};


export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sofia Rent Kyiv',
    url: process.env.NEXT_PUBLIC_SEO_URL,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+380954515057',
        contactType: 'customer service',
      },
    ],
    logo: [
      {
        '@type': 'ImageObject',
        url: '/seo_images/twitter-image-800x600.png',
        contentUrl: '/seo_images/twitter-image-800x600.png',
        size: '800x600',
        caption: 'Sofia Rent Kyiv',
        inLanguage: 'uk-UA',
      },
    ],
    keywords:
      'Київ квартири. Зняти квартиру Київ. Оренда квартири Київ. Квартири подобово. Квартири на день',
  };
  return (
    <html lang="uk-UA">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteProvider>
          <DynamicToastProvider>
            <DynamicAuthProvider>
              <DynamicTranslatorProvider>
                <Header />
                <main>{children}</main>
                {/* <CallBtnFloating /> */}
                <DynamicFooter />
              </DynamicTranslatorProvider>
            </DynamicAuthProvider>
          </DynamicToastProvider>
        </SiteProvider>
      </body>
    </html>
  );
}