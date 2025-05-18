import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">Mi Ma Mu</span>
            </Link>
          </div>
          
          <div className="hidden sm:flex sm:items-center">
            <Link 
              href="/login" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Register
            </Link>
            <Link 
              href="/dashboard" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
