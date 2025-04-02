import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-16">
      <div className="bg-orange-500 rounded-xl p-8 md:p-12 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Bắt Đầu Dự Án Của Bạn Ngay Hôm Nay</h2>
        <p className="max-w-2xl mx-auto mb-8 text-orange-50">
          Hãy liên hệ với chúng tôi để được tư vấn miễn phí và nhận báo giá chi tiết cho dự án của bạn
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-orange-600 hover:bg-orange-50"
          >
            Liên Hệ Ngay <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white bg-transparent hover:bg-white hover:text-orange-600"
          >
            Xem Bảng Giá
          </Button>
        </div>
      </div>
    </section>
  );
}