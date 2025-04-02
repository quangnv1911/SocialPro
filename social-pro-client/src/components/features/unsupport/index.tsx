import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Construction, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export const UnsupportedFeature = () => {
  return (
    <div className="container mx-auto py-12">
      <Card className="max-w-2xl mx-auto p-8">
        <div className="flex flex-col items-center text-center">
          <div className="bg-amber-50 p-6 rounded-full mb-6">
            <Construction className="h-16 w-16 text-amber-500" />
          </div>
          
          <h1 className="text-2xl font-bold mb-3">Tính năng đang phát triển</h1>
          
          <p className="text-gray-600 mb-6 max-w-md">
            Chức năng này hiện đang trong quá trình phát triển và chưa được hỗ trợ.
            Chúng tôi đang nỗ lực để sớm cung cấp tính năng này cho bạn.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg w-full mb-8">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-sm text-left">
                <p className="font-medium">Lưu ý:</p>
                <p className="text-gray-600">
                  Tính năng này sẽ được phát hành trong thời gian tới. Vui lòng kiểm tra lại sau hoặc liên hệ với đội ngũ hỗ trợ nếu bạn cần trợ giúp.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="outline">Quay lại trang chủ</Button>
            </Link>
            <Button onClick={() => window.open('https://support.socialpro.com', '_blank')}>
              Liên hệ hỗ trợ
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};