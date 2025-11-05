import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import type { CreateSaleDto } from "../pages/CreateSale/types";
import type { Sale } from "../pages/Sales/types";

export function useSales() {
  return useQuery<Sale[], Error>({
    queryKey: ["sales"],
    queryFn: async (): Promise<Sale[]> => {
      const response = await fetch("localhost:3000/sales");

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}`
        );
      }
      return await response.json();
    },
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
