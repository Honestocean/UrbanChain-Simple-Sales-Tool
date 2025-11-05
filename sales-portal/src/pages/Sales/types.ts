export type Sale = {
  name: string;
  customerName: string;
  email: string;
  mpans: string[];
  contractStartDate: string;
  contractEndDate: string;
  status: SaleStatus;
  id: string;
  createdDate: Date;
};

export const SaleStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export type SaleStatus =
  (typeof SaleStatus)[keyof typeof SaleStatus];
