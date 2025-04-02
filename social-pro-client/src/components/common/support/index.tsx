'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import Lottie from 'lottie-react';
import customerSupportAnimation from '@/assets/images/Animation - 1743262669893.json';

const SupportSection = () => {
  return (
    <div className="container mx-auto px-4 mb-12">
      <div className="bg-white rounded-xl shadow-md p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden border border-orange-100">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-yellow-300"></div>
        <div className="absolute top-4 left-4 bg-orange-50 px-3 py-1 rounded-full">
          <span className="text-orange-500 font-bold text-sm flex items-center">
            <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
            SOS
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left z-10">
          <h3 className="font-semibold text-xl mb-3 text-gray-800">Bạn cần hỗ trợ mua hàng?</h3>
          <p className="text-gray-600 mb-5 max-w-md">
            Liên hệ{' '}
            <Link href="#" className="text-orange-500 font-medium hover:underline transition-colors">
              taikhoantotnhat
            </Link>{' '}
            qua Messenger hoặc Zalo ngay để được hỗ trợ nhanh chóng!
          </p>
          <Button 
            className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 rounded-full px-6 py-2 shadow-sm transition-all duration-300 hover:shadow"
          >
            <MessageCircle className="mr-2 h-4 w-4" /> Chat ngay
          </Button>
        </div>

        {/* Lottie Animation with enhanced container */}
        <div className="flex-1 flex justify-center md:justify-end relative">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-50 rounded-full opacity-20"></div>
          <div className="relative z-10">
            <Lottie 
              animationData={customerSupportAnimation} 
              loop={true} 
              style={{ width: 200, height: 140 }} 
              className="drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportSection;
