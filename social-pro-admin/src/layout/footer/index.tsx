import { Link } from '@tanstack/react-router';
import { Mail, Phone, MapPin } from "lucide-react"
const FooterComponent = () => {
  return (
    <footer className="bg-[#006D87] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description Section */}
          <div className="space-y-4">
            <Link to="/" className="block">
              <img src={'/placeholder.svg'} alt="CMSNT.CO" width={150} height={50} className="mb-4" />
            </Link>
            <p className="text-sm text-gray-200">Hệ thống bán nguyên liệu ADS tự động, uy tín, giá rẻ...</p>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">admin@domain.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">0988888XXX</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">1Hd-50, 010 Avenue, NY 90001 United States</span>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/policy" className="text-sm hover:underline">
                  Chính sách
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:underline">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:underline">
                  Liên hệ chúng tôi
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-sm hover:underline">
                  Tài liệu API
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center md:text-left">
              © All Copyrights Reserved by DEMO SHOPCLON67 | Software By CMSNT.CO
            </p>
            <div className="flex items-center gap-2">
              {['paypal', 'mastercard', 'discover', 'visa'].map((payment) => (
                <div key={payment} className="bg-white p-1 rounded">
                  <img
                    src={`/placeholder.svg`}
                    alt={payment}
                    width={40}
                    height={25}
                    className="h-6 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
