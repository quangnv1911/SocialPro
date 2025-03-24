import { FC, ReactElement } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import templateStore from '@/stores/templateStore';

interface ButonSiderProps {
  icon: any;
  title: string;
  isActive?: boolean;
  alert?: string;
  onClick?: () => void;
}

const ButtonSider: FC<ButonSiderProps> = ({
                                            icon: Icon,
                                            title,
                                            isActive,
                                            alert,
                                            onClick,
                                          }: ButonSiderProps): ReactElement => {
  const { sidebarCollapsed } = templateStore();
  return <Button
    onClick={onClick}
    variant={isActive ? 'secondary' : 'ghost'}
    className={cn(
      'w-full justify-start gap-2',
      sidebarCollapsed && 'justify-center px-2',
      isActive && 'bg-gradient-to-r from-blue-600/50 to-blue-600/20 hover:from-blue-600/70 hover:to-blue-600/30',
    )}
  >
    <Icon className={cn('h-4 w-4', isActive && 'text-blue-600')} />
    {!sidebarCollapsed && <span>{title}</span>}
    {!sidebarCollapsed && alert && (
      <span
        className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
            {alert}
          </span>
    )}
  </Button>;
};

export default ButtonSider;