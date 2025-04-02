import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';

export function PricingSection() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Bảng Giá Dịch Vụ</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Chúng tôi cung cấp nhiều gói dịch vụ với mức giá phù hợp cho từng nhu cầu và ngân sách
        </p>
      </div>

      <Tabs defaultValue="website" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="website">Website Cơ Bản</TabsTrigger>
          <TabsTrigger value="ecommerce">E-Commerce</TabsTrigger>
          <TabsTrigger value="custom">Tùy Chỉnh</TabsTrigger>
        </TabsList>

        <TabsContent value="website">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Gói Cơ Bản"
              price="2.000.000đ"
              features={[
                'Thiết kế 5 trang cơ bản',
                'Responsive design',
                'Form liên hệ',
                'Tối ưu SEO cơ bản',
                'Bảo hành 3 tháng',
              ]}
            />

            <PricingCard
              title="Gói Tiêu Chuẩn"
              price="4.500.000đ"
              features={[
                'Thiết kế 10 trang',
                'Responsive design',
                'Form liên hệ nâng cao',
                'Tối ưu SEO chuyên sâu',
                'Tích hợp Google Analytics',
                'Bảo hành 6 tháng',
              ]}
              popular
            />

            <PricingCard
              title="Gói Nâng Cao"
              price="8.000.000đ"
              features={[
                'Thiết kế không giới hạn trang',
                'Responsive design',
                'Tích hợp CMS',
                'Tối ưu SEO chuyên sâu',
                'Tích hợp mạng xã hội',
                'Bảo hành 12 tháng',
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="ecommerce">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="E-Commerce Cơ Bản"
              price="5.000.000đ"
              features={[
                'Tối đa 50 sản phẩm',
                'Thanh toán cơ bản',
                'Quản lý đơn hàng',
                'Responsive design',
                'Bảo hành 3 tháng',
              ]}
            />

            <PricingCard
              title="E-Commerce Tiêu Chuẩn"
              price="10.000.000đ"
              features={[
                'Không giới hạn sản phẩm',
                'Đa dạng phương thức thanh toán',
                'Quản lý đơn hàng nâng cao',
                'Tích hợp email marketing',
                'Báo cáo bán hàng',
                'Bảo hành 6 tháng',
              ]}
              popular
            />

            <PricingCard
              title="E-Commerce Cao Cấp"
              price="15.000.000đ"
              features={[
                'Không giới hạn sản phẩm',
                'Tích hợp đa nền tảng',
                'Hệ thống khách hàng thân thiết',
                'Tích hợp chatbot',
                'Phân tích dữ liệu nâng cao',
                'Bảo hành 12 tháng',
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="custom">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Giải Pháp Tùy Chỉnh</h3>
            <p className="text-gray-600 mb-6">
              Bạn cần một website với các tính năng đặc biệt? Chúng tôi sẵn sàng tư vấn và phát triển giải pháp phù hợp
              với nhu cầu cụ thể của bạn.
            </p>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              Liên Hệ Tư Vấn
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  popular?: boolean;
}

function PricingCard({ title, price, features, popular }: PricingCardProps) {
  return (
    <Card
      className={`${popular ? 'border-2 border-orange-500 relative' : 'border border-gray-200 hover:border-orange-300 transition-colors'}`}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
          Phổ biến
        </div>
      )}
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="mt-2">
            <span className="text-3xl font-bold">{price}</span>
          </div>
        </div>

        <Separator className="my-4" />

        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600">Chọn Gói Này</Button>
      </CardContent>
    </Card>
  );
}
