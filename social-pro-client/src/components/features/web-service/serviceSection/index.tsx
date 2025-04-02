import { Card, CardContent } from '@/components/ui/card';
import { Layout, Code, ShoppingCart } from 'lucide-react';

export function ServicesSection() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Dịch Vụ Của Chúng Tôi</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Chúng tôi cung cấp đa dạng các dịch vụ thiết kế và phát triển website để đáp ứng mọi nhu cầu kinh doanh của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="mb-4 p-3 bg-blue-100 rounded-full">
              <Layout className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Thiết Kế Website</h3>
            <p className="text-gray-600">
              Thiết kế giao diện đẹp mắt, thân thiện với người dùng và tương thích với mọi thiết bị
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="mb-4 p-3 bg-green-100 rounded-full">
              <Code className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Phát Triển Web App</h3>
            <p className="text-gray-600">
              Xây dựng ứng dụng web với đầy đủ tính năng, tối ưu hiệu suất và bảo mật cao
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="mb-4 p-3 bg-purple-100 rounded-full">
              <ShoppingCart className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">E-Commerce</h3>
            <p className="text-gray-600">
              Xây dựng cửa hàng trực tuyến với đầy đủ tính năng thanh toán, quản lý sản phẩm
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}