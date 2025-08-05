import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Pricing from "./pages/Pricing.jsx";
import Product from "./pages/Product.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";

const BASE_URL = "http://localhost:9000";
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (err) {
        alert("There was an error fetching Cities");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />}></Route>
          <Route path={"product"} element={<Product />}></Route>
          <Route path={"pricing"} element={<Pricing />}></Route>
          <Route path={"login"} element={<Login />}></Route>
          <Route path={"app"} element={<AppLayout />}>
            <Route index element={<Navigate to={"cities"} replace />}></Route>
            <Route
              path={"cities"}
              element={<CityList cities={cities} isLoading={isLoading} />}
            ></Route>
            <Route path={"cities/:id"} element={<City />}></Route>
            <Route
              path={"countries"}
              element={<CountryList cities={cities} isLoading={isLoading} />}
            ></Route>
            <Route path={"form"} element={<Form />}></Route>
          </Route>
          <Route path={"*"} element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
