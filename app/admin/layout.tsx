import '../globals.css';
import { Lato, Playfair_Display } from 'next/font/google';

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

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${playfair.variable} ${lato.variable} antialiased bg-gray-50 dark:bg-gray-900`} suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
