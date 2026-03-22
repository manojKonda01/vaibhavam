import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Vaibhavam | Luxury Event Planning',
  description: 'A premium marketplace for bespoke event planning and luxury celebrations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased selection:bg-white selection:text-black`}>
        <Navbar />
        <main className="min-h-screen pt-24 pb-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
