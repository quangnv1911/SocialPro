'use client';
import { useState, useEffect } from 'react';
import {
  Facebook,
  Mail,
  History,
  FileText,
  Video,
  Package,
  ChevronDown,
  BanknoteIcon as Bank,
  ShoppingCart,
  Plus,
  ChevronLast,
  ChevronFirst,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import templateStore from '@/stores/templateStore';

type SidebarProps = React.HTMLAttributes<HTMLDivElement>

export function MainSidebar({ className }: Readonly<SidebarProps>) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { setSidebarCollapsed } = templateStore();
  // Load collapsed state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('sidebarCollapsed');
    if (stored !== null) {
      setIsCollapsed(JSON.parse(stored));
      setSidebarCollapsed(JSON.parse(stored));
    }
  }, []);

  // Save collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const NavItem = ({
                     icon: Icon,
                     title,
                     isActive,
                     alert,
                   }: {
    icon: any
    title: string
    isActive?: boolean
    alert?: string
  }) => {
    const button = (
      <Button
        variant={isActive ? 'secondary' : 'ghost'}
        className={cn(
          'w-full justify-start gap-2',
          isCollapsed && 'justify-center px-2',
          isActive && 'bg-gradient-to-r from-blue-600/50 to-blue-600/20 hover:from-blue-600/70 hover:to-blue-600/30',
        )}
      >
        <Icon className={cn('h-4 w-4', isActive && 'text-blue-600')} />
        {!isCollapsed && <span>{title}</span>}
        {!isCollapsed && alert && (
          <span
            className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
            {alert}
          </span>
        )}
      </Button>
    );

    if (isCollapsed) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              {title}
              {alert && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  {alert}
                </span>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return button;
  };

  return (
    <aside
      className={cn(
        'relative flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800',
        isCollapsed ? 'w-[80px]' : 'w-[280px]',
        'transition-all duration-300 ease-in-out',
        className,
      )}
    >
      <div className="flex h-[60px] items-center justify-end border-b px-2">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-blue-600/20"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronLast className="h-4 w-4" /> : <ChevronFirst className="h-4 w-4" />}
        </Button>
      </div>

      <div className={cn('flex-1 overflow-y-auto overflow-x-clip', 'scrollbar-none')}>
        <div className="space-y-4 py-4">
          {/* Settings Section */}
          <div className="px-3 py-2">
            <div className="space-y-1">
              {!isCollapsed && <h3 className="mb-2 px-4 text-sm font-medium text-blue-600">Số dư: 2.734.780đ</h3>}
              <NavItem icon={Plus} title="Nạp tiền" />
            </div>
          </div>
          <Separator className="mx-3" />

          {/* Main Navigation */}
          <div className="px-3 py-2">
            {!isCollapsed && <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Menu chính</h2>}
            <div className="space-y-1">
              <NavItem icon={Package} title="Trang Chủ" />
              <NavItem icon={Facebook} title="CLONE FACEBOOK" isActive />
              <NavItem icon={Facebook} title="VIA FACEBOOK" />
            </div>
          </div>
          <Separator className="mx-3" />

          {/* Services */}
          <div className="px-3 py-2">
            {!isCollapsed && <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Dịch vụ</h2>}
            <div className="space-y-1">
              <NavItem icon={Mail} title="Tài Khoản Mail" alert="3" />
              <NavItem icon={FileText} title="Mua Tài Liệu" />
              <NavItem icon={Video} title="Tiếp Thị Liên Kết" />
            </div>
          </div>
          <Separator className="mx-3" />

          {/* User Section */}
          <div className="px-3 py-2">
            {!isCollapsed && <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Tài khoản</h2>}
            <div className="space-y-1">
              <NavItem icon={ShoppingCart} title="Mua Tài Khoản" />
              <NavItem icon={History} title="Lịch Sử Mua Hàng" />
              <NavItem icon={Bank} title="Ngân Hàng" />
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
}
