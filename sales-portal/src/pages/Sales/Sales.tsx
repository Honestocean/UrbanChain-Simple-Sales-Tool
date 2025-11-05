import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { Sale } from "./types";

export interface ISalesProps {}

function useSales() {
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

export function Sales(props: ISalesProps) {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = useSales();
  return (
    <div>
      <h1>Sales</h1>
      <div>
        {status === "pending" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data.map((sale) => (
                <p key={sale.id}>{sale.name}</p>
              ))}
            </div>
            <div>
              {isFetching ? "Background Updating..." : " "}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
