// 결제 및 환불 데이터
export interface PaymentStatistics {
  totalRevenue: number
  revenueDistribution: {
    below30k: number
    between30kAnd50k: number
    above50k: number
  }
  discountUsageRate: number
  refundStatistics: {
    refundRate: number
    refundedCourses: {
      courseId: number
      refundAmount: number
      refundReason: string
    }[]
  }
}
