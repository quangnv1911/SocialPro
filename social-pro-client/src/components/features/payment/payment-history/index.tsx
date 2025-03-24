'use client';

import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@/hooks';
import { paymentQueries } from '@/api/actions/payment/payment.queries';
import usePaginationSearch from '@/hooks/pagingFilter';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { SelectViewport } from '@radix-ui/react-select';
import { ApiResponsePaging } from '@/types/response';
import { PaymentQueriesResponse } from '@/api/actions/payment/payment.types';
import { formatDate } from '@/utils/helper/formatDate';
import SanitizedHTML from '@/components/common/sanitizeText';

export default function PaymentHistory() {
  // Filter hook
  const {
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    pageSize,
    setPageSize,
    sortBy,
    sortOrder,
  } = usePaginationSearch();

  const { data: paymentList } = useQuery<ApiResponsePaging<PaymentQueriesResponse>>({
    ...paymentQueries.get({
      searchTerm,
      page,
      pageSize,
      sortBy,
      sortOrder,
    }),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium">HOÁ ĐƠN NẠP TIỀN</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center gap-2">
            <span>Xem</span>
            <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
              <SelectTrigger className="border rounded px-2 py-1">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectScrollUpButton />
                <SelectViewport>
                  <SelectItem value="10" className="px-2 py-1">
                    10
                  </SelectItem>
                  <SelectItem value="25" className="px-2 py-1">
                    25
                  </SelectItem>
                  <SelectItem value="50" className="px-2 py-1">
                    50
                  </SelectItem>
                </SelectViewport>
                <SelectScrollDownButton />
              </SelectContent>
            </Select>
            <span>mục</span>
          </div>

          <div className="relative w-full md:w-64">
            <Input
              placeholder="Tìm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Ngân hàng</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Tiền trước</TableHead>
                <TableHead>Tiền sau</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Thao Tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentList?.data?.map((payment: PaymentQueriesResponse, index: number) => (
                <TableRow key={payment.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium text-blue-700">{payment.gate}</TableCell>
                  <TableCell className="text-green-600">{payment.amount}</TableCell>
                  <TableCell>
                    <Badge variant="destructive" className="rounded-full flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-white"></span>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{payment.balanceBefore}</TableCell>
                  <TableCell className="text-purple-600">{payment.balanceAfter}</TableCell>
                  <TableCell>{formatDate(payment.createdAt)}</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">Đang xem 1 đến 3 trong tổng số 3 mục</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" disabled={page === 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
              <SanitizedHTML htmlContent={page.toString()} />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setPage(page + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

