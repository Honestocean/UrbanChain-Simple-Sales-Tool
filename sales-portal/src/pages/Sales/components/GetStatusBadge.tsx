import type { SaleStatus } from "../types";

export const getStatusBadge = (status: SaleStatus) => {
  const statusStyles = {
    active: "bg-blue-100 text-blue-800",
    inactive: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};
