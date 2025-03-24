import { BasePagingFilter } from '@/types/requests';

export type GeneratePaymentMutationArguments = {
  amount: number
  gate: string
}

export type GeneratePaymentMutationResponse = {
  content: string
  amount: number
  gate: string
  accountName: string
  accountNumber: string
  qrCodeUrl: string
}


export type PaymentQueriesResponse = {
  id: string
  gate: string
  amount: number
  status: string
  balanceBefore: number
  balanceAfter: number
  createdAt: string
}

export type PaymentQueriesRequest = BasePagingFilter & {
  searchTerm: string
}