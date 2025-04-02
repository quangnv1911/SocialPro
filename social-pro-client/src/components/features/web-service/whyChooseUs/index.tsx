import { DollarSign, Clock, CheckCircle, Zap } from 'lucide-react';

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-50 -mx-4 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Tại Sao Chọn Chúng Tôi?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cam kết mang đến dịch vụ thiết kế website chất lượng cao với nhiều ưu điểm vượt trội
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-3 bg-yellow-100 rounded-full">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Giá Cả Hợp Lý</h3>
            <p className="text-gray-600">
              Mức giá phù hợp với mọi quy mô doanh nghiệp, từ startup đến doanh nghiệp lớn
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-3 bg-red-100 rounded-full">
              <Clock className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Thời Gian Nhanh Chóng</h3>
            <p className="text-gray-600">
              Cam kết bàn giao sản phẩm đúng thời hạn, không để khách hàng chờ đợi
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Chất Lượng Cao</h3>
            <p className="text-gray-600">
              Sản phẩm đạt chuẩn UI/UX, tối ưu tốc độ và thân thiện với SEO
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-3 bg-blue-100 rounded-full">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Hỗ Trợ 24/7</h3>
            <p className="text-gray-600">
              Đội ngũ hỗ trợ kỹ thuật luôn sẵn sàng giải đáp mọi thắc mắc của khách hàng
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}