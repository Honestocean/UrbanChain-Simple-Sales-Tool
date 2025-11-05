import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteSale,
  useSale,
  useUpdateSaleStatus,
} from "../../hooks/useSales";
import type { SaleStatus } from "../Sales/types";

export interface IEditSaleProps {}

export function EditSale(props: IEditSaleProps) {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: sale, isLoading: isSaleLoading } = useSale(
    id || ""
  );
  const updateMutation = useUpdateSaleStatus();
  const deleteMutation = useDeleteSale();

  const [status, setStatus] =
    useState<SaleStatus>("active");
  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);

  useEffect(() => {
    if (sale) {
      setStatus(sale.status);
    }
  }, [sale]);

  const handleStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatus(e.target.value as SaleStatus);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    updateMutation.mutate(
      { id, status },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["sales"],
          });
          queryClient.invalidateQueries({
            queryKey: ["sale", id],
          });
          navigate("/sales");
        },
        onError: (error) => {
          console.error("Error updating sale:", error);
          alert(`Failed to update sale: ${error.message}`);
        },
      }
    );
  };

  const handleDelete = () => {
    if (!id) return;

    deleteMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["sales"],
        });
        navigate("/sales");
      },
      onError: (error) => {
        console.error("Error deleting sale:", error);
        alert(`Failed to delete sale: ${error.message}`);
        setShowDeleteConfirm(false);
      },
    });
  };

  if (isSaleLoading) {
    return (
      <main className="min-h-screen bg-gray-200 max-w-screen px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center">
        <div className="text-gray-600">Loading sale...</div>
      </main>
    );
  }

  if (!sale) {
    return (
      <main className="min-h-screen bg-gray-200 max-w-screen px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center">
        <div className="text-gray-600">Sale not found</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-200 max-w-screen px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
      <div className="max-w-6xl w-full">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Edit Sale
          </h1>
          <p className="text-gray-600 mt-2">
            Update the status or delete this sale
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Sale Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">
                Account Name:
              </span>
              <p className="text-gray-900">{sale.name}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">
                Customer Name:
              </span>
              <p className="text-gray-900">
                {sale.customerName}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-700">
                Email:
              </span>
              <p className="text-gray-900">{sale.email}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">
                Contract Start Date:
              </span>
              <p className="text-gray-900">
                {new Date(
                  sale.contractStartDate
                ).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-700">
                Contract End Date:
              </span>
              <p className="text-gray-900">
                {new Date(
                  sale.contractEndDate
                ).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-700">
                MPANs:
              </span>
              <p className="text-gray-900">
                {sale.mpans.join(", ")}
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="mb-6">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Status *
            </label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={handleStatusChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {(updateMutation.isError ||
            deleteMutation.isError) && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">
                Error:{" "}
                {updateMutation.error?.message ||
                  deleteMutation.error?.message}
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={
                updateMutation.isPending ||
                deleteMutation.isPending
              }
              className="flex-1 px-6 py-3 bg-teal-500 text-white font-medium rounded-md hover:bg-teal-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {updateMutation.isPending
                ? "Updating..."
                : "Update Status"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/sales")}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={
                updateMutation.isPending ||
                deleteMutation.isPending
              }
              className="px-6 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Delete Sale
            </button>
          </div>
        </form>

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Confirm Delete
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this sale?
                This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="flex-1 px-6 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {deleteMutation.isPending
                    ? "Deleting..."
                    : "Delete"}
                </button>
                <button
                  onClick={() =>
                    setShowDeleteConfirm(false)
                  }
                  disabled={deleteMutation.isPending}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
