import Link from 'next/link';
import { Facebook, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function ContactSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Liên Hệ Với Chúng Tôi</h2>
            <p className="text-gray-600 mb-8">
              Hãy liên hệ ngay để được tư vấn miễn phí về dự án của bạn. Chúng tôi sẽ phản hồi trong vòng 24 giờ.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mt-1 bg-orange-100 p-2 rounded-full mr-4">
                  <Globe className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium">Địa chỉ</h4>
                  <p className="text-gray-600">Hà Nội, Việt Nam</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 bg-orange-100 p-2 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-gray-600">quangnv1911@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 bg-orange-100 p-2 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Điện thoại</h4>
                  <p className="text-gray-600">+84 334 745 645</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-medium mb-4">Kết nối với chúng tôi</h4>
              <div className="flex space-x-4">
                <Link
                  href="https://www.facebook.com/quangnv1911"
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <a
                  href="mailto:quangnv1911@gmail.com"
                  className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                <Link
                  href="https://www.linkedin.com/in/quangnv1911"
                  className="bg-blue-800 text-white p-2 rounded-full hover:bg-blue-900"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Gửi Yêu Cầu Tư Vấn</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Nhập họ và tên"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Nhập email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      Dịch vụ quan tâm
                    </label>
                    <select
                      id="service"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Chọn dịch vụ</option>
                      <option value="website">Thiết kế website</option>
                      <option value="ecommerce">Website thương mại điện tử</option>
                      <option value="landing">Landing page</option>
                      <option value="custom">Giải pháp tùy chỉnh</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Nội dung
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Mô tả yêu cầu của bạn"
                    ></textarea>
                  </div>

                  <Button className="w-full bg-orange-500 hover:bg-orange-600">Gửi Yêu Cầu</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
