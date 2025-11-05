import { useNavigate } from "react-router-dom";
import { NewDealButton } from "./NewDealButton";

export interface ISalesHeaderProps {}

export function SalesHeader(props: ISalesHeaderProps) {
  const navigate = useNavigate();

  const handleNewDeal = () => {
    navigate("/create-sale");
  };

  return (
    <header className="mb-8 flex justify-between min-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Active Deals
        </h1>
        <p className="text-gray-600 mt-1">
          Manage and track all customer onboarding deals
        </p>
      </div>
      <NewDealButton onClick={handleNewDeal} />
    </header>
  );
}
