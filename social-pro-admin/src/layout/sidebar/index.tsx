import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { FC, ReactElement } from 'react';
import { LayoutDashboard, History, Package, Shield, Users, ShieldCheck, Wallet, Users2, Mail, Tag } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const menuItems = [
  {
    category: 'MAIN',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/manage-user' },
      { icon: History, label: 'Lịch sử', href: '/dashboard' },
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
      { icon: Users, label: 'Thành viên', href: '/manage-user' },
      { icon: ShieldCheck, label: 'Admin Role', href: '/manage-user' },
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
    <aside className="fixed left-0 top-16 h-screen w-64 bg-gray-900 text-white shadow-2xl z-50 flex flex-col">
      <ScrollArea className="flex-1 overflow-y-auto px-4 py-6">
        {menuItems.map((section) => (
          <div key={section.category} className="mb-6">
            <h2 className="mb-3 text-sm font-bold uppercase text-gray-400 tracking-wide">{section.category}</h2>
            <div className="space-y-2">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-4 rounded-lg px-4 py-3 text-sm transition-all',
                    'text-gray-300 hover:bg-gray-800 hover:text-white',
                  )}
                >
                  <item.icon className="h-5 w-5" />
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
