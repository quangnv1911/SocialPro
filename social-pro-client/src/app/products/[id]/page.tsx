'use client';

import _ from 'lodash';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@/hooks';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Loader2, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cartStore';
import { Separator } from '@/components/ui/separator';
import EmptyIcon from '@/components/common/emptyIcon';
import { DURATION_LABELS, DurationEnum } from '@/utils/constants/duration';
import { ProductResponse } from '@/api/actions/product/product.types';
import { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { productQueries } from '@/api/actions/product/product.queries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BigCategory } from '@/utils/constants/bigCategory';

const ProductDetailPage: FC = (): ReactElement => {
  const params = useParams();
  const id = useMemo(() => _.castArray(params.id)[0], [params.id]);

  const [quantity, setQuantity] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState<DurationEnum | undefined>(undefined);
  const { addToCart } = useCartStore();
  // Fetch product details
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<ProductResponse>({
    ...productQueries.getDetail(id),
  });

  // Set default duration when product data is loaded
  useEffect(() => {
    if (product?.durations && product.durations.length > 0) {
      setSelectedDuration(product.durations[0].duration);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto py-12">
        <EmptyIcon emptyEntity="Sản phẩm" />
        <div className="flex justify-center mt-6">
          <Link href="/products">
            <Button>Quay lại danh sách sản phẩm</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product) return;

    if (!selectedDuration) {
      toast.error('Vui lòng chọn thời hạn');
      return;
    }

    // Calculate price based on selected duration
    const selectedDurationObj = product.durations?.find((d) => d.duration === selectedDuration);
    const price = selectedDurationObj?.price ?? 0;

    // Add to cart
    addToCart({
      category: BigCategory.Product,
      product,
      quantity,
      duration: selectedDuration,
      price,
    });
    toast.success('Thêm vào giỏ hàng thành công');
  };

  return (
    <div className="container mx-auto py-8">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-6">
        <ul className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:underline">
              Trang chủ
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:underline">
              Sản phẩm
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2">/</span>
            <span className="text-gray-500">{product.name}</span>
          </li>
        </ul>
      </div>

      {/* Main Product Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative h-[400px] bg-white rounded-lg overflow-hidden border">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-400">Không có hình ảnh</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-gray-500">(32 đánh giá của khách hàng)</span>
              </div>
            </div>

            {/* Price Range */}
            <div className="text-xl">
              {product.durations && product.durations.length > 0 ? (
                <>
                  <span className="font-bold">
                    {Math.min(...product.durations.map((d) => d.price || 0)).toLocaleString()}đ{' - '}
                    {Math.max(...product.durations.map((d) => d.price || 0)).toLocaleString()}đ
                  </span>
                  <span className="ml-2 text-sm text-gray-500">(Tùy theo thời hạn)</span>
                </>
              ) : (
                <span className="font-bold">N/A đ</span>
              )}
            </div>

            <Separator />

            {/* Description */}
            <div>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Duration Selector */}
            <div>
              <p className="font-medium mb-2">Thời hạn</p>
              {product.durations && product.durations.length > 0 ? (
                <Select
                  defaultValue={String(product.durations[0].duration)}
                  onValueChange={(value) => setSelectedDuration(DurationEnum[value as keyof typeof DurationEnum])}
                >
                  <SelectTrigger className="w-[180px] bg-gray-50">
                    <SelectValue placeholder="Chọn thời hạn" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.durations.map((duration) => (
                      <SelectItem key={duration.id} value={String(duration.duration)}>
                        {DURATION_LABELS[duration.duration] || duration.duration}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-sm text-gray-500 italic">Không có thời hạn nào khả dụng</div>
              )}
            </div>

            {/* Current Price */}
            <div className="bg-yellow-50 p-4 rounded-md">
              <p className="text-2xl font-bold text-[#ffc200]">
                {product.durations && product.durations.length > 0
                  ? product.durations.find((d) => d.duration === selectedDuration)?.price?.toLocaleString()
                  : '0'}
                đ
              </p>
            </div>

            {/* Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="w-24">
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="text-center"
                />
              </div>
              <Button
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white"
                onClick={handleAddToCart}
                disabled={!(product.durations && product.durations.length > 0)}
              >
                {product.durations && product.durations.length > 0 ? 'Thêm vào giỏ hàng' : 'Không có sản phẩm khả dụng'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="details" className="mb-12">
        <TabsList className="bg-gray-100 p-1 rounded-md">
          <TabsTrigger value="details" className="rounded-md">
            Mô tả
          </TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-md">
            Đánh giá (32)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6 bg-white p-6 rounded-lg shadow-sm">
          <div className="prose max-w-none">
            <h3 className="text-lg font-medium">Mô tả chi tiết</h3>
            <p>{product.description}</p>
            <p>
              GodStudy là dịch vụ Unlock All-in-One hoạt động trên nền tảng Discord. GodStudy cho phép người dùng truy
              cập vào nhiều tài nguyên học tập trực tuyến như Chegg, CourseHero, Studocu, Quizlet, Numerade, Scribd,
              Brainly, Bartleby, SolutionInn, Study.com.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6 bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Đánh giá của khách hàng</h3>

            {/* Sample review */}
            <div className="border-b pb-4">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Tài khoản Hulu No Ads & With Ads</p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">Sản phẩm rất tốt, dùng ổn định và giá cả hợp lý!</p>
            </div>

            {/* More reviews would go here */}
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div>
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <span className="inline-block w-1 h-5 bg-yellow-500 mr-2"></span>
          SẢN PHẨM LIÊN QUAN
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Related product 1 */}
          <Card className="border shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex items-center mb-2">
                <div className="w-12 h-12 bg-gray-100 rounded-full mr-3 relative overflow-hidden">
                  <Image src="" alt="Product icon" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">GodStudy - Unlock All-in-One</h3>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-orange-500 font-medium">49.000đ - 2.499.000đ</p>
            </div>
          </Card>

          {/* Related product 2 */}
          <Card className="border shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex items-center mb-2">
                <div className="w-12 h-12 bg-gray-100 rounded-full mr-3 relative overflow-hidden">
                  <Image src="" alt="Coursera icon" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">Gói nâng cấp Coursera Premium Plus chính chủ</h3>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-orange-500 font-medium">129.000đ - 1.299.000đ</p>
            </div>
          </Card>

          {/* Related product 3 */}
          <Card className="border shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex items-center mb-2">
                <div className="w-12 h-12 bg-gray-100 rounded-full mr-3 relative overflow-hidden">
                  <Image src="" alt="Udemy icon" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">Tài khoản Udemy Business</h3>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-orange-500 font-medium">249.000đ - 899.000đ</p>
            </div>
          </Card>
        </div>
      </div>

     
    </div>
  );
};

export default ProductDetailPage;
