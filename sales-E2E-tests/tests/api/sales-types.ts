export interface CreateSaleDtoType {
  name: string;
  customerName: string;
  email: string;
  mpans: string[];
  contractStartDate: string;
  contractEndDate: string;
  status: string;
}

export interface SaleResponseData
  extends CreateSaleDtoType {
  id: string;
  createdOn: string;
}
