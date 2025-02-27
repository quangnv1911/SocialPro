'use client';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export const Index = ({ icon: Icon, title, href, isCollapsed }: {
  icon: any
  title?: string
  href: string
  isCollapsed?: boolean
}) => {
  const router = useRouter();
  const button = (
    <Button
      variant="ghost"
      className={cn(
        'w-full flex items-center gap-3 py-2 hover:bg-blue-800',
        isCollapsed && 'justify-center',
      )}
      onClick={() => router.push(href)}
    >
      <Icon className="h-5 w-5" />
      {!isCollapsed && <span>{title}</span>}
    </Button>
  );

  return isCollapsed ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right">{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    button
  );
};