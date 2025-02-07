import { Link } from '@tanstack/react-router';
import ViteLogo from 'assets/images/vite-logo.svg?react';
import VitestLogo from 'assets/images/vitest-logo.svg?react';
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const HeaderComponent = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <header className="app__header">
      <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
        <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
          TRANG KHÁCH
        </Link>
        <Link to="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          LIÊN HỆ
        </Link>
        <Link to="/zalo" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          BOX ZALO
        </Link>
        <Link to="/guide" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          HƯỚNG DẪN SỬ DỤNG
        </Link>
        <Link to="/cron" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          CRON JOB
        </Link>
        <Link to="/upgrade" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          MUA THÊM CHỨC NĂNG
        </Link>
      </nav>
    </header>
  );
};

export default HeaderComponent;
