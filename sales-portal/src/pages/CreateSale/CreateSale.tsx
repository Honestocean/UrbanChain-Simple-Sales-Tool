import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateSale } from "../../hooks/useSales";
import { DateInput } from "./components/DateInput";
import { TextInput } from "./components/TextInput";
import type { CreateSaleDto } from "./types";

export interface ICreateSaleProps {}

export function CreateSale(props: ICreateSaleProps) {
  const queryClient = useQueryClient();
  const mutation = useCreateSale();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateSaleDto>({
    name: "",
    customerName: "",
    email: "",
    mpans: [""],
    contractStartDate: "",
    contractEndDate: "",
    status: "active",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMpanChange = (
    index: number,
    value: string
  ) => {
    const newMpans = [...formData.mpans];
    newMpans[index] = value;
    setFormData((prev) => ({
      ...prev,
      mpans: newMpans,
    }));
  };

  const addMpanField = () => {
    setFormData((prev) => ({
      ...prev,
      mpans: [...prev.mpans, ""],
    }));
  };

  const removeMpanField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      mpans: prev.mpans.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedData = {
      ...formData,
      mpans: formData.mpans.filter(
        (mpan) => mpan.trim() !== ""
      ),
    };

    mutation.mutate(cleanedData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["sales"],
        });

        setFormData({
          name: "",
          customerName: "",
          email: "",
          mpans: [""],
          contractStartDate: "",
          contractEndDate: "",
          status: "active",
        });

        navigate("/sales");
      },
      onError: (error) => {
        console.error("Error creating sale:", error);
        alert(`Failed to create sale: ${error.message}`);
      },
    });
  };

  return (
    <main className="min-h-screen bg-gray-200 max-w-screen px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
      <div className="max-w-6xl w-full">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Sale
          </h1>
          <p className="text-gray-600 mt-2">
            Fill out the form below to create a new sale
            record
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <TextInput
            label="Account Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            type="text"
            required
            placeholder="Energy Supply Account"
          />

          <TextInput
            label="Customer Name"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            type="text"
            required
            placeholder="John Doe"
          />

          <TextInput
            label="Email Address"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            type="email"
            required
            placeholder="customer@example.com"
          />

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              MPANs (Meter Point Administration Numbers) *
            </label>
            {formData.mpans.map((mpan, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={mpan}
                  onChange={(e) =>
                    handleMpanChange(index, e.target.value)
                  }
                  required
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1234567890123"
                />
                {formData.mpans.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMpanField(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addMpanField}
              className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              + Add Another MPAN
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <DateInput
              label="Contract Start Date"
              id="contractStartDate"
              name="contractStartDate"
              value={formData.contractStartDate}
              onChange={handleInputChange}
              required
            />

            <DateInput
              label="Contract End Date"
              id="contractEndDate"
              name="contractEndDate"
              value={formData.contractEndDate}
              onChange={handleInputChange}
              required
            />
          </div>

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
              value={formData.status}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {mutation.isError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">
                Error: {mutation.error.message}
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex-1 px-6 py-3 bg-teal-500 text-white font-medium rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {mutation.isPending
                ? "Creating..."
                : "Create Sale"}
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  name: "",
                  customerName: "",
                  email: "",
                  mpans: [""],
                  contractStartDate: "",
                  contractEndDate: "",
                  status: "active",
                })
              }
              className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
