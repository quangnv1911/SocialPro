import { Card, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import { FC } from 'react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  period: string;
  iconColor?: string;
  valueColor?: string;
}

const StatCard: FC<StatCardProps> = ({
  icon: Icon,
  title,
  value,
  period,
  iconColor = 'text-primary',
  valueColor = 'text-primary',
}: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`rounded-lg p-2 ${iconColor} bg-muted`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
            <p className="text-xs text-muted-foreground">{period}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
