import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { CreateSale } from "./pages/CreateSale";
import Login from "./pages/Login/Login";
import { Sales } from "./pages/Sales/Sales";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sales" element={<Sales />} />
        <Route
          path="/create-sale"
          element={<CreateSale />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
