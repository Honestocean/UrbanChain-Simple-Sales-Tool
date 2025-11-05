import { useQuery } from "@tanstack/react-query";
import type { Sale } from "../types";

const API_BASE_URL = "http://localhost:3000";

export function useSales() {
  return useQuery<Sale[], Error>({
    queryKey: ["sales"],
    queryFn: async (): Promise<Sale[]> => {
      const response = await fetch(`${API_BASE_URL}/sales`);

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}`
        );
      }
      return await response.json();
    },
  });
}
