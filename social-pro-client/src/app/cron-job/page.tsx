import { FC, Fragment, ReactNode } from 'react';
import { AlertTriangle, Clock, Facebook, Plus, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SanitizeText from '@/components/common/sanitizeText';

const CronJobPage: FC = (): ReactNode => {
  return <div className="container mx-auto py-6 px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Panel */}
      <Card className="border-0 shadow-md">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
          <Button variant="ghost" className="text-white hover:bg-blue-700 flex items-center gap-2">
            <Plus className="h-5 w-5" />
            THÊM LINK CRON
          </Button>
          <Button variant="destructive" className="bg-red-500 hover:bg-red-600 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            LỊCH SỬ CRON
          </Button>
        </div>

        <CardContent className="p-0">
          {/* Configuration Section */}
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium text-blue-500 mb-4">Cấu hình</h3>

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="cronLink">
                  Liên kết cần CRON <span className="text-red-500">(*)</span>
                </Label>
                <Input id="cronLink" placeholder="" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="interval">
                  Vòng lặp <span className="text-red-500">(*)</span>
                </Label>
                <div className="flex">
                  <Input id="interval" defaultValue="60" className="rounded-r-none" />
                  <div className="bg-gray-100 px-4 flex items-center border border-l-0 rounded-r-md">giây</div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="method">
                  Phương thức <span className="text-red-500">(*)</span>
                </Label>
                <Select defaultValue="GET">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phương thức" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Server Section */}
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium text-blue-500 mb-4">Server</h3>

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="server">
                  Máy chủ <span className="text-red-500">(*)</span>
                </Label>
                <Input id="server" defaultValue="Việt Nam - 15.000đ" readOnly />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="duration">
                  Thời hạn <span className="text-red-500">(*)</span>
                </Label>
                <Input id="duration" defaultValue="1 Tháng" readOnly />
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="p-6">
            <div className="flex justify-center mb-6">
              <p className="text-base">
                Số tiền cần thanh toán: <span className="text-red-500 font-bold">15.000đ</span>
              </p>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <ShoppingCart className="mr-2 h-5 w-5" />
              THANH TOÁN
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Right Panel */}
      <Card className="border-0 shadow-md">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <span className="font-medium">LƯU Ý</span>
        </div>

        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-red-500 mb-4">Quy định về việc sử dụng hệ thống CRON:</h3>

          <div className="space-y-4 text-gray-700">
            <div>
              <p className="font-medium">- Không kích hoạt Firewall đối với các liên kết CRON:</p>
              <p className="ml-4">
                Việc bật Firewall có thể gây gián đoạn hệ thống và ngăn cản CRON thực hiện nhiệm vụ.
              </p>
            </div>

            <div>
              <p className="font-medium">- Sử dụng hệ thống CRON đúng mục đích:</p>
              <p className="ml-4">
                Chúng tôi có quyền tạm ngưng hoặc hủy vĩnh viễn các liên kết CRON vi phạm, đặc biệt trong các trường
                hợp lạm dụng gây ảnh hưởng đến hệ thống. Các trường hợp này sẽ không được hoàn tiền.
              </p>
            </div>

            <div>
              <p className="font-medium">- Cung cấp chính xác liên kết CRON:</p>
              <p className="ml-4">
                <SanitizeText
                  htmlContent={'Đảm bảo nhập đầy đủ và chính xác đường dẫn liên kết, bao gồm tiền tố "https://..."'} />
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>;
};

export default CronJobPage;
;
;
