import { Button } from '@/components/ui/button';
import Image from 'next/image';
import webServiceImage from '@/assets/images/web-service-ilu.jpg';

export function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center gap-12 py-12">
      <div className="flex-1 space-y-6">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-medium text-sm">
          <span className="mr-2">🔥</span>
          <span>DỊCH VỤ THIẾT KẾ WEBSITE GIÁ RẺ</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold">
          Thiết Kế Website
          <br />
          <span className="text-orange-500">Chuyên Nghiệp, Giá Hợp Lý</span>
        </h1>

        <p className="text-gray-600 text-lg">
          Chúng tôi cung cấp dịch vụ thiết kế website chất lượng cao với mức giá phải chăng. Từ landing page đơn giản
          đến hệ thống thương mại điện tử phức tạp, chúng tôi đáp ứng mọi nhu cầu của bạn.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
            Nhận Báo Giá Miễn Phí
          </Button>
          <Button size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
            Xem Dự Án Mẫu
          </Button>
        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-md h-[400px]">
          <Image src={webServiceImage} alt="Web Design Illustration" fill className="object-contain" priority />
        </div>
      </div>
    </section>
  );
}
