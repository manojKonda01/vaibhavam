import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 glass-panel border-b-0 rounded-none border-x-0 border-t-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl tracking-tighter font-serif text-white">
              VAIBHAVAM
            </Link>
          </div>
          <div className="hidden md:ml-6 md:flex md:space-x-8 items-center">
            <Link href="/marketplace" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Planners
            </Link>
            <Link href="/categories" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Categories
            </Link>
            <Link href="/shop" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Shop
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
              Login
            </Link>
            <Link href="/auth/register" className="btn-primary py-2 px-5 text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
