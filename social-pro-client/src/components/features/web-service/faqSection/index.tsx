import { Card, CardContent } from '@/components/ui/card';

interface FAQ {
  question: string;
  answer: string;
}

export function FAQSection() {
  const faqs: FAQ[] = [
    {
      question: 'Thời gian hoàn thành một website mất bao lâu?',
      answer:
        'Thời gian hoàn thành phụ thuộc vào quy mô và độ phức tạp của dự án. Thông thường, một website cơ bản có thể hoàn thành trong 1-2 tuần, website thương mại điện tử có thể mất 3-6 tuần.',
    },
    {
      question: 'Tôi có được hỗ trợ kỹ thuật sau khi website hoàn thành không?',
      answer:
        'Có, chúng tôi cung cấp dịch vụ hỗ trợ kỹ thuật trong thời gian bảo hành. Sau thời gian bảo hành, bạn có thể đăng ký gói dịch vụ bảo trì website hàng tháng để được hỗ trợ liên tục.',
    },
    {
      question: 'Tôi có thể tự cập nhật nội dung website sau khi hoàn thành không?',
      answer:
        'Có, chúng tôi xây dựng website với hệ thống quản trị nội dung (CMS) thân thiện với người dùng, giúp bạn dễ dàng cập nhật nội dung, hình ảnh, sản phẩm mà không cần kiến thức lập trình.',
    },
    {
      question: 'Chi phí thiết kế website có bao gồm chi phí hosting không?',
      answer:
        'Không, chi phí thiết kế website không bao gồm chi phí hosting và tên miền. Tuy nhiên, chúng tôi có thể tư vấn và hỗ trợ bạn đăng ký các dịch vụ này với mức giá ưu đãi từ các đối tác của chúng tôi.',
    },
    {
      question: 'Website có tương thích với điện thoại di động không?',
      answer:
        'Có, tất cả website do chúng tôi thiết kế đều được tối ưu hóa cho mọi thiết bị (responsive design), đảm bảo trải nghiệm người dùng tốt nhất trên máy tính, điện thoại và máy tính bảng.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50 -mx-4 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Câu Hỏi Thường Gặp</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Giải đáp những thắc mắc phổ biến về dịch vụ thiết kế website của chúng tôi
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
