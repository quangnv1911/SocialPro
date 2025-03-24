'use client';
import React, { FC, Fragment, ReactElement, useEffect } from 'react';
import {
  Facebook,
  Mail,
  History,
  FileText,
  Video,
  Package,
  BanknoteIcon as Bank,
  ShoppingCart,
  Plus,
  ChevronLast,
  ChevronFirst,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import templateStore from '@/stores/templateStore';
import { usePathname, useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import NavItem from '@/components/common/sider/nav-item';
import authStore from '@/stores/authState';
import { useQuery } from '@/hooks';
import { captchaQueries } from '@/api/actions/captcha/captcha.queries';
import { userQueries } from '@/api/actions/user/user.queries';
import userStore from '@/stores/userStore';
import SanitizedHTML from '@/components/common/sanitizeText';
import PaymentSidebar from '@/components/common/sider/payment';
import { CRONJOB_PATH, MMO_RESOURCE_PATH, PRODUCT_PATH, SOCIAL_BUFF_PATH } from '@/utils/constants';
import { toast } from 'react-toastify';
import { ENV } from '@/config/env';

type SidebarProps = React.HTMLAttributes<HTMLDivElement>

export function MainSidebar({ className }: Readonly<SidebarProps>) {
  const pathName: string = usePathname();
  const router: AppRouterInstance = useRouter();
  const { isAuthenticated, accessToken } = authStore();
  const { setCurrentUserData } = userStore();


  const { data: currentUserData, isSuccess, refetch } = useQuery({
    ...userQueries.me(isAuthenticated),
  });
  const { sidebarCollapsed, setSidebarCollapsed } = templateStore();
  useEffect(() => {
    if (isSuccess && currentUserData) {
      setCurrentUserData(currentUserData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  // handle payment sse
  useEffect(() => {
    // Tạo Worker
    const worker = new Worker(new URL('@/worker/sseWorker', import.meta.url));
    // Gửi URL SSE đến Worker
    worker.postMessage({ url: ENV.API_ENDPOINT_SSE + `?accessToken=${accessToken}` });

    // Lắng nghe dữ liệu từ Worker
    worker.onmessage = (e: MessageEvent) => {
      const data = e.data;
      if (data.error) {
        toast.error('Nạp tiền thất bại|');
      } else {
        refetch().then(() => {
          toast.success('Nạp tiền thành công');
        });
      }
    };

    // Dọn dẹp Worker khi component unmount
    return () => {
      worker.terminate();  // Dừng Worker
    };
  }, [accessToken]);
  return (
    <aside
      className={cn(
        'relative flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800',
        sidebarCollapsed ? 'w-[80px]' : 'w-[280px]',
        'transition-all duration-300 ease-in-out',
        className,
      )}
    >
      <div className="flex h-[60px] items-center justify-end border-b px-2">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-blue-600/20"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? <ChevronLast className="h-4 w-4" /> : <ChevronFirst className="h-4 w-4" />}
        </Button>
      </div>

      <div className={cn('flex-1 overflow-y-auto overflow-x-clip', 'scrollbar-none')}>
        <div className="space-y-4 py-4">
          {/* Settings Section */}
          {isAuthenticated && <PaymentSidebar />}

          {/* Main Navigation */}
          <div className="px-3 py-2">
            {!sidebarCollapsed && <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Bán tài khoản</h2>}
            <div className="space-y-1">
              <NavItem icon={Package} title="Tài nguyên MMO" isActive={pathName.startsWith(MMO_RESOURCE_PATH)} />
              <NavItem icon={Facebook} title="Tài khoản giá rẻ" isActive={pathName.startsWith(PRODUCT_PATH)} />
            </div>
          </div>
          <Separator className="mx-3" />

          {/* Services */}
          <div className="px-3 py-2">
            {!sidebarCollapsed && <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Dịch vụ</h2>}
            <div className="space-y-1">
              <NavItem icon={Mail} title="Cron job" isActive={pathName === CRONJOB_PATH} onClick={() => router.push(CRONJOB_PATH)}/>
              <NavItem icon={FileText} title="Tăng tương tác mạng xã hội" isActive={pathName === SOCIAL_BUFF_PATH} />
            </div>
          </div>
          <Separator className="mx-3" />

          {/* User Section */}
          <div className="px-3 py-2">
            {!sidebarCollapsed && <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Tài khoản</h2>}
            <div className="space-y-1">
              <NavItem icon={History} title="Lịch Sử Mua Hàng" />
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
}
