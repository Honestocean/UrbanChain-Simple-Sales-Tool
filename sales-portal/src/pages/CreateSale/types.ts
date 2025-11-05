export interface CreateSaleDto {
  name: string;
  customerName: string;
  email: string;
  mpans: string[];
  contractStartDate: string;
  contractEndDate: string;
  status: "active" | "inactive" | "pending" | "cancelled";
}
