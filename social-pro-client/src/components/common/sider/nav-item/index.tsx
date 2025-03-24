'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ButtonSider from '@/components/common/sider/button';
import templateStore from '@/stores/templateStore';

interface NavItemProps {
  icon: any;
  title: string;
  isActive?: boolean;
  alert?: string;
  onClick?: () => void;
}

const NavItem = ({
                   icon: Icon,
                   title,
                   isActive,
                   alert,
                   onClick,
                 }: NavItemProps) => {
  const { sidebarCollapsed } = templateStore();
  if (sidebarCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <ButtonSider icon={Icon} title={title} isActive={isActive} onClick={onClick} alert={alert} />
          </TooltipTrigger>
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

  return <ButtonSider icon={Icon} title={title} isActive={isActive} onClick={onClick} alert={alert} />;

};

export default NavItem;