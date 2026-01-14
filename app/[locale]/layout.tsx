import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Playfair_Display, Lato } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import '../globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const lato = Lato({
  variable: '--font-lato',
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export function generateStaticParams() {
  return [{ locale: 'sr' }, { locale: 'ru' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!['sr', 'ru', 'en'].includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${playfair.variable} ${lato.variable} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
