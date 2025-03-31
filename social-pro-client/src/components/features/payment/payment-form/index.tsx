'use client';

import { FC, ReactElement, useEffect, useState } from 'react';
import { BanknoteIcon as Bank, QrCode, Info } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@/hooks';
import { StandardizedApiError } from '@/context/apiClient/apiClientContextController/apiError/apiError.types';
import { GeneratePaymentMutationResponse } from '@/api/actions/payment/payment.types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// Add these imports at the top
import { usePaymentNotification } from '@/hooks/usePaymentNotification';
import userStore from '@/stores/userStore';
import { useQueryClient } from '@tanstack/react-query';
import { ENV } from '@/config/env';
import authStore from '@/stores/authState';
import { userQueries } from '@/api/actions/user/user.queries';

// Inside the PaymentForm component, add:
export const PaymentForm: FC = (): ReactElement => {
  const { accessToken } = authStore();
  const [amount, setAmount] = useState('10000');
  const [selectedBank, setSelectedBank] = useState('MB');
  const [transferDetails, setTransferDetails] = useState<null | GeneratePaymentMutationResponse>(null);
  const [listening, setListening] = useState(false);

  const { refetch } = useQuery(userQueries.me());

  const { mutateAsync: createPayment, isPending } = useMutation('generatePayment', {
    onSuccess: (res: GeneratePaymentMutationResponse) => {
      setTransferDetails(res);
      toast.success('Đăng nhập thành công');
    },
    onError: (error: StandardizedApiError) => {
      toast.error(error.message);
    },
  });

  const handleCreatePayment: () => Promise<void> = async () => {
    await createPayment({
      amount: Number(amount),
      gate: selectedBank,
    });
  };

  // Hàm sao chép văn bản
  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    toast.success(`Đã sao chép ${label} vào clipboard`);
  };
  // Add this after setting transferDetails state
  useEffect(() => {
    if (!accessToken) return;
    if (!listening) {
      const events = new EventSource(`${ENV.API_ENDPOINT_SSE}/${accessToken}`);

      events.onmessage = (event) => {
        console.log(event.data);
        refetch();
        toast.success('Nạp tiền thành công');
      };

      setListening(true);
    }
  }, [listening, accessToken]);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Nạp Tiền Tài Khoản</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bank" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="bank" className="flex items-center gap-2">
              <Bank className="h-4 w-4" />
              <span>Bank Tự Động</span>
            </TabsTrigger>
            <TabsTrigger value="crypto" className="flex items-center gap-2">
              <span>Crypto</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bank" className="mt-6">
            {!transferDetails ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-6">
                <div className="flex items-center gap-2 text-orange-600 font-medium">
                  <Bank className="h-5 w-5" />
                  <span className="uppercase">NẠP TIỀN TỰ ĐỘNG</span>
                </div>

                <div className="space-y-4 w-full max-w-md">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium" htmlFor={'Bank name'}>
                      Tên Ngân Hàng*
                    </Label>
                    <Select value={selectedBank} onValueChange={setSelectedBank}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn ngân hàng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MB">MB</SelectItem>
                        <SelectItem value="Vietcombank">Vietcombank</SelectItem>
                        <SelectItem value="Techcombank">Techcombank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Nhập số tiền muốn nạp</Label>
                    <Input id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} type="number" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Số tiền cần thanh toán</p>
                      <p className="text-blue-600 font-bold">{amount} VND</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Số tiền nhận được</p>
                      <p className="text-orange-500 font-bold">{amount}</p>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-orange-600 hover:bg-yellow-600"
                    onClick={() => handleCreatePayment()}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Đang lấy thông tin...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <QrCode className="h-4 w-4" />
                        Lấy mã QR
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium bg-blue-50 p-3 rounded-md">Nạp tiền qua chuyển khoản</h3>

                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Ngân Hàng</span>
                        <div className="flex items-center gap-2">
                          <span className="text-red-500 font-medium">{transferDetails.gate}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 bg-cyan-400 hover:bg-cyan-500 text-white border-none"
                            onClick={() => copyToClipboard(transferDetails?.gate, 'Tên ngân hàng')}
                          >
                            <span className="text-xs">Sao chép</span>
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Tên chủ tài khoản</span>
                        <div className="flex items-center gap-2">
                          <span className="text-red-500 font-medium">{transferDetails.accountName}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 bg-cyan-400 hover:bg-cyan-500 text-white border-none"
                            onClick={() => copyToClipboard(transferDetails.accountName, 'Tên chủ tài khoản')}
                          >
                            <span className="text-xs">Sao chép</span>
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Số tài khoản</span>
                        <div className="flex items-center gap-2">
                          <span className="text-red-500 font-medium">{transferDetails.accountNumber}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 bg-cyan-400 hover:bg-cyan-500 text-white border-none"
                            onClick={() => copyToClipboard(transferDetails.accountNumber, 'Số tài khoản')}
                          >
                            <span className="text-xs">Sao chép</span>
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Nội dung chuyển khoản</span>
                        <div className="flex items-center gap-2">
                          <span className="text-red-500 font-medium">{transferDetails?.content}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 bg-cyan-400 hover:bg-cyan-500 text-white border-none"
                            onClick={() => copyToClipboard(transferDetails?.content, 'Nội dung chuyển khoản')}
                          >
                            <span className="text-xs">Sao chép</span>
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Số tiền</span>
                        <div className="flex items-center gap-2">
                          <span className="text-red-500 font-medium">{transferDetails.amount}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 bg-cyan-400 hover:bg-cyan-500 text-white border-none"
                            onClick={() => copyToClipboard(transferDetails?.amount?.toString(), 'Số tiền')}
                          >
                            <span className="text-xs">Sao chép</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Info className="h-5 w-5 text-gray-700" />
                      <h3 className="font-medium text-gray-800">Lưu ý!</h3>
                    </div>

                    <div className="space-y-2 text-sm">
                      <p className="text-red-500">- Chú ý:</p>
                      <p className="text-red-500">
                        Tài khoản bank không cố định. Vui lòng kiểm tra lại tên và số tài khoản đang hiển thị trước khi
                        thực hiện giao dịch. Xin cảm ơn.
                      </p>
                      <p className="text-gray-600">
                        - Quý khách ghi đúng thông tin nạp tiền thì tài khoản sẽ được cộng tự động sau khi giao dịch
                        thành công.
                      </p>
                      <p className="text-gray-600">
                        - Quý khách thực hiện chuyển tiền qua dịch vụ quốc tế tới ngân hàng Việt Nam vui lòng chờ từ 3-5
                        ngày (tùy vào dịch vụ / không tính Thứ 7 và Chủ Nhật)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium bg-blue-50 p-3 rounded-md">Nạp tiền qua quét mã QR</h3>

                    <div className="flex flex-col items-center justify-center mt-6 space-y-4">
                      <div className="relative">
                        <div className="border-2 border-gray-200 p-2 rounded-md">
                          <Image
                            src={transferDetails?.qrCodeUrl}
                            alt="QR Code"
                            width={400}
                            height={400}
                            className="object-contain"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2">
                        <span className="text-blue-600 font-medium">napas 24/7</span>
                        <Separator orientation="vertical" className="h-6" />
                        <span className="text-blue-700 font-bold text-xl">ACB</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Hướng dẫn nạp tiền qua quét mã QR</h3>

                    <ol className="space-y-3 list-decimal pl-5">
                      <li>Đang nhập ứng dụng Mobile Banking, chọn chức năng Scan QR và quét mã QR trên đây.</li>
                      <li>
                        Nhập số tiền muốn nạp, kiểm tra thông tin đơn hàng (NH, chủ TK, số TK, Nội dung CK) trùng khớp
                        với thông tin CK bên trái.
                      </li>
                      <li>Xác nhận thanh toán và hoàn tất giao dịch.</li>
                    </ol>

                    <p className="text-red-500 italic text-sm">
                      *Chú ý: mỗi mã QR chỉ dùng cho 1 giao dịch nạp tiền, không sử dụng lại
                    </p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="thailand">
            <div className="p-4 text-center">Chức năng Bank Thailand đang được phát triển</div>
          </TabsContent>

          <TabsContent value="crypto">
            <div className="p-4 text-center">Chức năng Crypto đang được phát triển</div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
