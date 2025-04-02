import { Card, CardContent } from '@/components/ui/card';

interface Testimonial {
  initials: string;
  name: string;
  position: string;
  text: string;
}

export function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      initials: 'NT',
      name: 'Nguyễn Thành',
      position: 'CEO, Công ty ABC',
      text: 'Tôi rất hài lòng với website mà đội ngũ đã thiết kế. Giao diện đẹp, tốc độ nhanh và đặc biệt là rất dễ sử dụng. Khách hàng của tôi cũng đánh giá cao trải nghiệm trên website mới.',
    },
    {
      initials: 'TL',
      name: 'Trần Linh',
      position: 'Chủ shop online',
      text: 'Từ khi có website mới, doanh số bán hàng của tôi đã tăng hơn 40%. Đội ngũ hỗ trợ rất nhiệt tình và chuyên nghiệp. Tôi sẽ tiếp tục sử dụng dịch vụ trong tương lai.',
    },
    {
      initials: 'PH',
      name: 'Phạm Hương',
      position: 'Giám đốc Marketing',
      text: 'Đội ngũ thiết kế đã hiểu rõ yêu cầu và tạo ra một website vượt xa mong đợi của chúng tôi. Tỷ lệ chuyển đổi đã tăng đáng kể và thương hiệu của chúng tôi được nâng tầm.',
    },
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Khách Hàng Nói Gì Về Chúng Tôi</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Sự hài lòng của khách hàng là thước đo thành công của chúng tôi
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-xl font-medium">{testimonial.initials}</span>
                  </div>
                </div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.position}</p>
              </div>
              <p className="text-gray-600 text-center italic">&quot;{testimonial.text}&quot;</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
