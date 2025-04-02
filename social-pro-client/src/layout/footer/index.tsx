'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook } from 'lucide-react';
import { LinkedInLogoIcon } from '@radix-ui/react-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-6 border-t">
      {/* Main Footer */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: About */}
          <div>
            <h3 className="font-bold text-lg mb-4">Social Pro</h3>
            <p className="text-gray-600 mb-4">
              Chúng tôi mang đến cho khách hàng trải nghiệm mua tài khoản premium từ đồng với giá thành hợp lý và chế độ
              bảo hành tận tâm.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <span className="inline-block w-1 h-4 bg-orange-500 mr-2" />
              LIÊN HỆ
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <strong>Địa chỉ:</strong> Hà Nội
              </li>
              <li>
                <strong>Messenger:</strong>{' '}
                <Link href="#" className="hover:underline">
                  https://www.facebook.com/quangnv1911/
                </Link>{' '}
                (ưu tiên)
              </li>
              <li>
                <strong>Email:</strong>{' '}
                <Link href="mailto:info.quangnv1911@gmail.com" className="hover:underline">
                  quangnv1911@gmail.com
                </Link>
              </li>
            </ul>

            <h3 className="font-bold text-lg mt-6 mb-4 flex items-center">
              <span className="inline-block w-1 h-4 bg-orange-500 mr-2"></span>
              SOCIAL LINKS
            </h3>
            <div className="flex space-x-3">
              <Link
                href="https://www.facebook.com/quangnv1911"
                className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
              >
                <Facebook size={18} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/quangnv1911"
                className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
              >
                <LinkedInLogoIcon />
              </Link>
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <span className="inline-block w-1 h-4 bg-orange-500 mr-2"></span>
              ĐĂNG KÝ NHẬN ƯU ĐÃI
            </h3>
            <div className="flex gap-2 mb-2">
              <Input type="email" placeholder="Email của bạn" className="bg-white" />
              <Button className="bg-orange-500 hover:bg-orange-600 whitespace-nowrap">Đăng ký</Button>
            </div>
            <p className="text-xs text-gray-500">Đăng ký nhận thông tin về đồ mới nhất!</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div>Copyright ©2025 Social Pro. All rights reserved.</div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-gray-800">
              Chính sách bảo hàng
            </Link>
            <Link href="#" className="hover:text-gray-800">
              Chính sách đổi trả
            </Link>
            <Link href="#" className="hover:text-gray-800">
              Điều khoản dịch vụ
            </Link>
            <Link href="#" className="hover:text-gray-800">
              Về chúng tôi
            </Link>
            <Link href="#" className="hover:text-gray-800">
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
