'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Header = () => {
  const router = useRouter();

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold">
            Social Pro
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium text-yellow-500 hover:text-yellow-600">
              Trang chủ
            </Link>
            <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Cửa hàng
            </Link>
            <Link href="/guide" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Hướng dẫn mua hàng
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Liên hệ
            </Link>
            <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Bài viết
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Tìm kiếm..."
              className="w-[200px] pl-8 rounded-full bg-gray-50 focus-visible:ring-yellow-500"
            />
          </div>

          <Button
            variant="outline"
            className="hidden md:flex border-yellow-500 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-600"
            onClick={() => router.push('/cart')}
          >
            Đơn hàng
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
