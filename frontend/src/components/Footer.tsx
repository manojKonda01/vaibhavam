import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-soft-black border-t border-border-gray/10 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="text-2xl font-serif tracking-tighter text-white mb-6">VAIBHAVAM</h2>
        <div className="flex space-x-6 mb-8 text-sm">
          <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
          <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
        </div>
        <p className="text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Vaibhavam. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
