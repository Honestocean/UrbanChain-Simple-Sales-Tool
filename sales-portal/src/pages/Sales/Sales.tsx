import { SaleCard, SalesHeader } from "./components";
import { useSales } from "./hooks";

export interface ISalesProps {}

export function Sales(props: ISalesProps) {
  const { status, data, error, isFetching } = useSales();
  return (
    <main className="min-h-screen bg-gray-200 max-w-screen  px-4 sm:px-6 lg:px-8 py-8 flex justify-center ">
      <div className="max-w-6xl">
        <SalesHeader />
        <div>
          {status === "pending" ? (
            "Loading..."
          ) : status === "error" ? (
            <span>Error: {error.message}</span>
          ) : (
            <>
              <div>
                {data.map((sale) => (
                  <SaleCard key={sale.id} sale={sale} />
                ))}
              </div>
              <div>
                {isFetching
                  ? "Background Updating..."
                  : " "}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
