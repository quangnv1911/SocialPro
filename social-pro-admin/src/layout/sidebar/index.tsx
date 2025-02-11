import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { FC, ReactElement } from 'react';
import { LayoutDashboard, History, Package, Shield, Users, ShieldCheck, Wallet, Users2, Mail, Tag } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
const menuItems = [
  {
    category: 'MAIN',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
      { icon: History, label: 'Lịch sử', href: '/history' },
      { icon: Package, label: 'Tự động hóa', href: '/automation' },
    ],
  },
  {
    category: 'BẢO MẬT',
    items: [{ icon: Shield, label: 'Block IP', href: '/block-ip' }],
  },
  {
    category: 'DỊCH VỤ',
    items: [{ icon: Package, label: 'Sản phẩm', href: '/products' }],
  },
  {
    category: 'QUẢN LÝ',
    items: [
      { icon: Users, label: 'Thành viên', href: '/members' },
      { icon: ShieldCheck, label: 'Admin Role', href: '/admin-roles' },
      { icon: Wallet, label: 'Nạp tiền', href: '/deposits' },
      { icon: Users2, label: 'Affiliate Program', href: '/affiliates' },
      { icon: Mail, label: 'Email Campaigns', href: '/email-campaigns' },
      { icon: Tag, label: 'Mã giảm giá', href: '/discounts' },
      { icon: Users, label: 'Thành viên', href: '/members' },
      { icon: ShieldCheck, label: 'Admin Role', href: '/admin-roles' },
      { icon: Wallet, label: 'Nạp tiền', href: '/deposits' },
      { icon: Users2, label: 'Affiliate Program', href: '/affiliates' },
      { icon: Mail, label: 'Email Campaigns', href: '/email-campaigns' },
      { icon: Tag, label: 'Mã giảm giá', href: '/discounts' },
      { icon: Users, label: 'Thành viên', href: '/members' },
      { icon: ShieldCheck, label: 'Admin Role', href: '/admin-roles' },
      { icon: Wallet, label: 'Nạp tiền', href: '/deposits' },
      { icon: Users2, label: 'Affiliate Program', href: '/affiliates' },
      { icon: Mail, label: 'Email Campaigns', href: '/email-campaigns' },
      { icon: Tag, label: 'Mã giảm giá', href: '/discounts' },
      { icon: Users, label: 'Thành viên', href: '/members' },
      { icon: ShieldCheck, label: 'Admin Role', href: '/admin-roles' },
      { icon: Wallet, label: 'Nạp tiền', href: '/deposits' },
      { icon: Users2, label: 'Affiliate Program', href: '/affiliates' },
      { icon: Mail, label: 'Email Campaigns', href: '/email-campaigns' },
      { icon: Tag, label: 'Mã giảm giá', href: '/discounts' },
      { icon: Users, label: 'Thành viên', href: '/members' },
      { icon: ShieldCheck, label: 'Admin Role', href: '/admin-roles' },
      { icon: Wallet, label: 'Nạp tiền', href: '/deposits' },
      { icon: Users2, label: 'Affiliate Program', href: '/affiliates' },
      { icon: Mail, label: 'Email Campaigns', href: '/email-campaigns' },
      { icon: Tag, label: 'Mã giảm giá', href: '/discounts' },
      { icon: Wallet, label: 'Nạp tiền', href: '/deposits' },
      { icon: Users2, label: 'Affiliate Program', href: '/affiliates' },
      { icon: Mail, label: 'Email Campaigns', href: '/email-campaigns' },
      { icon: Tag, label: 'Mã giảm giá', href: '/discounts' },
      { icon: Users, label: 'Thành viên', href: '/members' },
      { icon: ShieldCheck, label: 'Admin Role', href: '/admin-roles' },
      { icon: Wallet, label: 'Nạp tiền', href: '/deposits' },
      { icon: Users2, label: 'Affiliate Program', href: '/affiliates' },
      { icon: Mail, label: 'Email Campaigns', href: '/email-campaigns' },
      { icon: Tag, label: 'Mã giảm giá', href: '/discounts' },
    ],
  },
];

const SideBar: FC = (): ReactElement => {
  return (
    <aside className="fixed left-0 top-18 w-64 h-screen bg-white dark:bg-neutral-800 shadow-md z-50">
      {/* Vùng có thể cuộn */}
      <ScrollArea className="h-full">
        {menuItems.map((section) => (
          <div key={section.category}>
            <h2 className="mb-2 px-4 text-sm font-semibold tracking-tight text-muted-foreground">{section.category}</h2>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                    'text-muted-foreground',
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>
    </aside>
  );
};

export default SideBar;
