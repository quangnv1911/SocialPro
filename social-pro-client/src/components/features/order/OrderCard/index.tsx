import { Card } from '@/components/ui/card';
import { Calendar, ChevronRight, FileText, Package } from 'lucide-react';
import { formatDate } from '../utils';
import { OrderResponse } from '@/api/actions/order/order.types';

interface OrderCardProps {
  order: OrderResponse;
  onClick: () => void;
}

export const OrderCard = ({ order, onClick }: OrderCardProps) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="space-y-2">
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2 text-gray-500" />
            <span className="font-medium">Mã đơn: {order.id.substring(0, 8)}...</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm text-gray-600">{formatDate(order.createdAt)}</span>
          </div>
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm text-gray-600">{order.orderDetails.length} sản phẩm</span>
          </div>
        </div>

        <div className="mt-4 md:mt-0 flex flex-col items-end">
          <div className="text-lg font-bold text-yellow-500">{order.amount.toLocaleString()}đ</div>
          <div className="flex items-center mt-2">
            <span className="text-sm">Xem chi tiết</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </div>
        </div>
      </div>
    </Card>
  );
};
