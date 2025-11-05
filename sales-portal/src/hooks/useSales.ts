import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import type { CreateSaleDto } from "../pages/CreateSale/types";
import type {
  Sale,
  SaleStatus,
} from "../pages/Sales/types";

export function useSales() {
  return useQuery<Sale[], Error>({
    queryKey: ["sales"],
    queryFn: async (): Promise<Sale[]> => {
      const response = await fetch(
        "http://localhost:3000/sales"
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}`
        );
      }
      return await response.json();
    },
  });
}

export function useSale(id: string) {
  return useQuery<Sale, Error>({
    queryKey: ["sale", id],
    queryFn: async (): Promise<Sale> => {
      const response = await fetch(
        `http://localhost:3000/sales/${id}`
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}`
        );
      }
      return await response.json();
    },
    enabled: !!id,
  });
}

export function useCreateSale() {
  return useMutation({
    mutationFn: async (
      newSale: CreateSaleDto
    ): Promise<Sale> => {
      const response = await fetch(
        "http://localhost:3000/sales",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSale),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message ||
            `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    },
  });
}

export function useUpdateSaleStatus() {
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: SaleStatus;
    }): Promise<Sale> => {
      const response = await fetch(
        `http://localhost:3000/sales/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message ||
            `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    },
  });
}

export function useDeleteSale() {
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(
        `http://localhost:3000/sales/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message ||
            `HTTP error! status: ${response.status}`
        );
      }
    },
  });
}
