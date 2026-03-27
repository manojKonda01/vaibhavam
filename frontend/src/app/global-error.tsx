'use client';

import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });
const playfair = Playfair_Display({ variable: '--font-playfair', subsets: ['latin'] });

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} bg-pure-black text-white antialiased`}>
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <div className="glass-panel p-10 max-w-md">
            <h1 className="text-3xl font-serif mb-4">Critical System Error</h1>
            <p className="text-gray-400 text-sm mb-8">
              A critical exception occurred. Please refresh the platform.
            </p>
            <button
              onClick={() => reset()}
              className="bg-primary-white text-pure-black px-6 py-3 rounded-full font-medium"
            >
              Refresh Platform
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
