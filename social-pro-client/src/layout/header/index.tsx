'use client';

import Link from 'next/link';
import { useState } from 'react';
import userStore from '@/stores/userStore';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import UserMenu from '@/components/user-menu';
import { Button } from '@/components/ui/button';
import { CRONJOB_PATH, PAYMENT_PATH, WEB_SERVICE_PATH } from '@/utils/constants';
import { useCartStore } from '@/stores/cartStore';
import NavLink from '@/components/common/header/nav-link';
import { Search, ShoppingCart, Menu, X, Wallet, PlusCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import authStore from '@/stores/authState';
import { StandardizedApiError } from '@/context/apiClient/apiClientContextController/apiError/apiError.types';
import { useMutation } from '@/hooks';

const Header = () => {
  const router = useRouter();
  const { user } = userStore();
  const { accessToken } = authStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());

  const { mutateAsync: logout } = useMutation('logoutMutation', {
    onSuccess: () => {
      authStore.getState().clearTokens();
      userStore.getState().clearData();
      toast.success('Đăng xuất thành công');
      router.push('/');
    },
    onError: (error: StandardizedApiError) => {
      toast.error((error.data as { message?: string })?.message ?? 'Đăng xuất thất bại');
    },
  });

  const handleLogout = () => {
    setMobileMenuOpen(false);
    if (!accessToken) return;
    logout({ accessToken });
  };
  return (
    <header className="fixed top-0 left-0 right-0 border-b bg-white z-50 shadow-sm">
      <div className="container mx-auto py-4 md:py-5 flex items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="text-xl md:text-2xl font-bold mr-4">
            Social Pro
          </Link>

          {/* Desktop Navigation - Changed from md: to lg: breakpoint */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <NavLink href="/">Trang chủ</NavLink>
            <NavLink href="/products">Tài khoản</NavLink>
            <NavLink href="/guide">Tài nguyên MMO</NavLink>
            <NavLink href="/contact">Tăng tương tác</NavLink>
            <NavLink href={CRONJOB_PATH}>Cron job</NavLink>
            <NavLink href={WEB_SERVICE_PATH}>Thiết kế web</NavLink>
          </nav>
        </div>

        {/* Mobile/Tablet menu button - Changed from md: to lg: breakpoint */}
        <button className="lg:hidden p-2 text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop right section - Changed from md: to lg: breakpoint */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-5">
          {/* User balance display */}
          {user && (
            <div className="bg-gray-100 rounded-full px-3 xl:px-5 py-2 flex items-center">
              <span className="text-sm font-medium text-gray-800">Số dư: {user?.money?.toLocaleString() || 0}đ</span>
            </div>
          )}

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Tìm kiếm..."
              className="w-[150px] xl:w-[200px] pl-8 rounded-full bg-gray-50 border-gray-200 focus-visible:ring-yellow-500 focus-visible:border-yellow-500"
            />
          </div>

          {/* Cart button */}
          <Button
            variant="outline"
            className="border-yellow-500 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-600 rounded-full relative"
            onClick={() => router.push('/cart')}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Đơn hàng
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>

          {/* User authentication section */}
          {user ? (
            <UserMenu handleLogout={handleLogout} />
          ) : (
            <Link href="/login">
              <Button variant="secondary" className="bg-white text-yellow-500 hover:bg-gray-100">
                Đăng nhập
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile/Tablet menu - Changed from md: to lg: breakpoint */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white absolute w-full border-b shadow-lg z-50">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <NavLink href="/" onClick={() => setMobileMenuOpen(false)}>
                Trang chủ
              </NavLink>
              <NavLink href="/products" onClick={() => setMobileMenuOpen(false)}>
                Tài khoản
              </NavLink>
              <NavLink href="/mmo-resource" onClick={() => setMobileMenuOpen(false)}>
                Tài nguyên MMO
              </NavLink>
              <NavLink href="/service" onClick={() => setMobileMenuOpen(false)}>
                Tăng tương tác
              </NavLink>
              <NavLink href={CRONJOB_PATH} onClick={() => setMobileMenuOpen(false)}>
                Cron job
              </NavLink>
              <NavLink href={WEB_SERVICE_PATH} onClick={() => setMobileMenuOpen(false)}>
                Thiết kế web
              </NavLink>
            </nav>

            {/* Rest of the mobile menu remains the same */}
            <div className="mt-4 pt-4 border-t flex flex-col space-y-4">
              {/* Mobile search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm..."
                  className="w-full pl-8 rounded-full bg-gray-50 border-gray-200 focus-visible:ring-yellow-500 focus-visible:border-yellow-500"
                />
              </div>

              {/* Mobile cart button */}
              <Button
                variant="outline"
                className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-600 rounded-full relative"
                onClick={() => {
                  router.push('/cart');
                  setMobileMenuOpen(false);
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Đơn hàng
                {totalItems > 0 && (
                  <span className="absolute top-1/2 -translate-y-1/2 right-4 bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Mobile user balance with deposit button */}
              {user && (
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <Wallet className="h-3.5 w-3.5 mr-1.5" />
                      <span className="font-medium">Số dư tài khoản:</span>
                    </div>
                    <span className="text-sm font-medium">{user?.money?.toLocaleString() ?? 0}đ</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white border-0"
                    onClick={() => {
                      router.push(PAYMENT_PATH);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <PlusCircle className="h-3.5 w-3.5 mr-1.5" /> Nạp tiền ngay
                  </Button>
                </div>
              )}

              {/* Mobile auth section */}
              {user ? (
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.userName} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-yellow-500 text-white font-medium">
                          {user.userName?.charAt(0) ?? 'U'}
                        </div>
                      )}
                    </div>
                    <span className="font-medium">{user.userName}</span>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => handleLogout()}
                  >
                    Đăng xuất
                  </Button>
                </div>
              ) : (
                <Link href="/login" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" className="w-full bg-white text-yellow-500 hover:bg-gray-100">
                    Đăng nhập
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
