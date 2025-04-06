import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { formatDate, getStatusColor } from '../utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DURATION_LABELS, DurationEnum } from '@/utils/constants/duration';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ProductDetailModalProps {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (value: boolean) => void;
  productDetail: Record<string, unknown> | null;
}

export const ProductDetailModal = ({ isOpen, onOpenChange, productDetail }: ProductDetailModalProps) => {
  // Format key names for better display
  const formatKeyName = (key: string): string => {
    // Map of keys to display names
    const keyDisplayMap: Record<string, string> = {
      id: 'ID',
      username: 'Tên người dùng',
      email: 'Email',
      password: 'Mật khẩu',
      createdAt: 'Ngày tạo',
      updatedAt: 'Ngày cập nhật',
      status: 'Trạng thái',
      duration: 'Thời hạn',
      quantity: 'Số lượng',
      price: 'Giá',
      // Add more mappings as needed
    };

    // Convert camelCase to Title Case if no mapping exists
    if (!keyDisplayMap[key]) {
      return key
        .replace(/([A-Z])/g, ' $1') // Insert a space before all capital letters
        .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
        .trim();
    }

    return keyDisplayMap[key];
  };

  // Format values based on their type and key
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatValue = (key: string, value: any): React.ReactNode => {
    // Handle null or undefined
    if (value === null || value === undefined) {
      return <span className="text-gray-400">Không có dữ liệu</span>;
    }

    // Format based on key name
    switch (key) {
      case 'status':
        return <span className={`px-2 py-1 rounded-md ${getStatusColor(String(value))}`}>{value}</span>;

      case 'createdAt':
      case 'updatedAt':
      case 'date':
      case 'expiryDate':
        return formatDate(String(value));

      case 'duration':
        return DURATION_LABELS[value as keyof typeof DurationEnum] || value;

      case 'price':
      case 'amount':
        return `${Number(value).toLocaleString()}đ`;

      case 'image':
      case 'avatar':
      case 'thumbnail':
        return value ? (
          <div className="relative h-20 w-20 mt-2">
            <Image src={String(value)} alt="Image" fill className="object-cover rounded-md" />
          </div>
        ) : (
          <span className="text-gray-400">Không có hình ảnh</span>
        );

      default:
        // Handle objects and arrays
        if (typeof value === 'object') {
          if (Array.isArray(value)) {
            return value?.length > 0 ? (
              <div className="mt-2 pl-2 border-l-2 border-gray-200">
                {value.map((item, idx) => (
                  <div key={idx} className="mb-2">
                    {typeof item === 'object' ? JSON.stringify(item, null, 2) : String(item)}
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-gray-400">Mảng trống</span>
            );
          }
          return (
            <pre className="text-xs mt-2 bg-gray-50 p-2 rounded overflow-x-auto">
              {JSON.stringify(value, null, 2)}
            </pre>
          );
        }

        // Handle boolean values
        if (typeof value === 'boolean') {
          return value ? 'Có' : 'Không';
        }

        // Default string representation
        return String(value);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chi tiết dữ liệu sản phẩm</DialogTitle>
        </DialogHeader>

        {productDetail && (
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4">
              {Object.entries(productDetail).map(([key, value]) => {
                // Get the formatted key and value
                const displayKey = formatKeyName(key);
                const displayValue = formatValue(key, value);

                return (
                  <div key={key} className="border-b pb-2">
                    <div className="text-sm font-medium text-gray-500">{displayKey}</div>
                    <div className="mt-1 break-words">{displayValue}</div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}

        <div className="flex justify-end mt-4">
          <Button onClick={() => onOpenChange(false)}>Đóng</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};