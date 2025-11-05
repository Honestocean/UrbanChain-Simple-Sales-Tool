import type { Sale } from "../types";
import { getStatusBadge } from "./GetStatusBadge";
import { ViewSaleButton } from "./ViewSaleButton";

export interface ISaleCardProps {
  sale: Sale;
}

export function SaleCard({ sale }: ISaleCardProps) {
  return (
    <div
      key={sale.id}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 my-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {sale.customerName}
            </h3>
            {getStatusBadge(sale.status)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600 mb-1">
                Contact Email
              </p>
              <p className="text-gray-900">{sale.email}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">
                MPAN Count
              </p>
              <p className="text-gray-900">
                {sale.mpans.length} sites
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">
                Created Date
              </p>
              <p className="text-gray-900">
                {new Date(
                  sale.createdDate
                ).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center">
              <ViewSaleButton
                customerName={sale.customerName}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
