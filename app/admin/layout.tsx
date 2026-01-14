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
            <body className={`${playfair.variable} ${lato.variable} antialiased leather-texture min-h-screen selection:bg-brand-secondary selection:text-brand-dark`} suppressHydrationWarning>
                <div className="relative min-h-screen overflow-hidden">
                    {/* Background Ambience */}
                    <div className="fixed inset-0 pointer-events-none z-0">
                        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-brand-secondary/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 animate-float" />
                        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 animate-float" style={{ animationDelay: '-3s' }} />
                    </div>

                    <div className="relative z-10 animate-scale-in">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
