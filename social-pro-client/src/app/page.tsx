'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PRODUCT_PATH } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { DollarSign, ShoppingBag, Shield } from 'lucide-react';
// Import the image directly
import logoImage from '@/assets/images/logo.png';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-8 py-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-medium text-sm">
            <span className="mr-2">🔥</span>
            <span> DỊCH VỤ XỊN - GIÁ CỰC MỊN</span>
          </div>

          <h1 className="text-4xl font-bold">
            🔥 SOCIAL PRO
            <br />
            GIÁ TỐT, DỊCH VỤ CHẤT
          </h1>

          <p className="text-gray-600">
            &ldquo;Social Pro là nền tảng chuyên cung cấp tài khoản premium, tài nguyên MMO, dịch vụ tăng tương tác và
            hỗ trợ tạo cron job chuyên nghiệp. Khách hàng dễ dàng chọn mua với mức giá hấp dẫn, thao tác nhanh chóng và
            bảo mật cao. Cam kết chất lượng, hỗ trợ tận tâm! 🚀&rdquo;
          </p>

          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => router.push(PRODUCT_PATH)}
          >
            Mua ngay
          </Button>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md h-[400px]">
            <Image src={logoImage} alt="Premium accounts illustration" fill className="object-contain" priority />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="mb-4 p-3 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Giá siêu tốt</h3>
            <p className="text-gray-600">Tài khoản Premium giá chỉ bằng 1/3 giá gốc</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="mb-4 p-3 bg-blue-100 rounded-full">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mua hàng tự động</h3>
            <p className="text-gray-600">Thanh toán nhanh nhận tài khoản trong 30 giây (**)</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="mb-4 p-3 bg-purple-100 rounded-full">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Bảo hành tận tâm</h3>
            <p className="text-gray-600">Yên tâm sử dụng tài khoản trong suốt thời hạn</p>
          </CardContent>
        </Card>
      </section>

      {/* Popular Products Section */}
      <section className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Sản phẩm phổ biến</h2>
          <Button variant="outline" onClick={() => router.push(PRODUCT_PATH)}>
            Xem tất cả
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* This would be populated with actual products */}
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="overflow-hidden">
              <div className="h-40 bg-gray-100 relative">{/* Product image would go here */}</div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">Netflix Premium</h3>
                <p className="text-sm text-gray-500 mb-2">1 tháng</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-600">79.000đ</span>
                  <Button size="sm" variant="outline">
                    Mua ngay
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 -mx-4 px-4 mt-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">Khách hàng nói gì về chúng tôi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hàng nghìn khách hàng đã tin tưởng và sử dụng dịch vụ của chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="mr-4">
                    <AvatarImage />
                    <AvatarFallback>NA</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">Nguyễn Văn A</h4>
                    <p className="text-sm text-gray-500">Khách hàng</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  &quot;Dịch vụ rất tốt, tài khoản hoạt động ổn định và giá cả phải chăng. Tôi sẽ tiếp tục sử dụng dịch
                  vụ này trong tương lai.&quot;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Bắt đầu sử dụng ngay hôm nay</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Hàng nghìn tài khoản premium, tài nguyên MMO & dịch vụ tăng tương tác – Giá tốt nhất thị trường!
        </p>
        <Button
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 text-white"
          onClick={() => router.push(PRODUCT_PATH)}
        >
          Khám phá ngay
        </Button>
      </section>
    </div>
  );
}
