export function ProcessSection() {
  return (
    <section className="py-16 bg-gray-50 -mx-4 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Quy Trình Làm Việc</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi tuân theo quy trình làm việc chuyên nghiệp để đảm bảo chất lượng và tiến độ dự án
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <ProcessStep 
            number={1} 
            title="Tư Vấn & Phân Tích" 
            description="Tìm hiểu nhu cầu, mục tiêu và đối tượng khách hàng của bạn"
            showLine
          />
          <ProcessStep 
            number={2} 
            title="Thiết Kế Giao Diện" 
            description="Tạo bản mẫu và thiết kế giao diện theo yêu cầu của bạn"
            showLine
          />
          <ProcessStep 
            number={3} 
            title="Phát Triển" 
            description="Lập trình và xây dựng website với các tính năng yêu cầu"
            showLine
          />
          <ProcessStep 
            number={4} 
            title="Bàn Giao & Hỗ Trợ" 
            description="Triển khai website và cung cấp hỗ trợ kỹ thuật sau bàn giao"
          />
        </div>
      </div>
    </section>
  );
}

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  showLine?: boolean;
}

function ProcessStep({ number, title, description, showLine }: ProcessStepProps) {
  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 bg-orange-100 rounded-full relative z-10">
          <span className="flex items-center justify-center h-8 w-8 bg-orange-500 text-white rounded-full font-bold">
            {number}
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
      {showLine && (
        <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-orange-200 -z-10"></div>
      )}
    </div>
  );
}