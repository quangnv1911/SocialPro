'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ href, children, onClick }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'text-sm font-medium transition-colors',
        isActive ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-600 hover:text-gray-900',
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
