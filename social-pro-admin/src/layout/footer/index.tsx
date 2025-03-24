import { Link } from '@tanstack/react-router';
import { Mail, Phone, MapPin } from 'lucide-react';

const FooterComponent = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="block mb-4">
            <img src={'/placeholder.svg'} alt="CMSNT.CO" width={150} height={50} />
          </Link>
          <p className="text-sm text-gray-400">Hệ thống bán nguyên liệu ADS tự động, uy tín, giá rẻ...</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
          <p className="flex items-center gap-2 text-sm text-gray-300">
            <Mail className="h-4 w-4" /> admin@domain.com
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-300">
            <Phone className="h-4 w-4" /> 0988888XXX
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-300">
            <MapPin className="h-4 w-4" /> 1Hd-50, 010 Avenue, NY 90001
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Liên kết</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/policy" className="hover:underline">
                Chính sách
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:underline">
                Câu hỏi thường gặp
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Liên hệ chúng tôi
              </Link>
            </li>
            <li>
              <Link to="/api" className="hover:underline">
                Tài liệu API
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © 2025 CMSNT.CO. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterComponent;
