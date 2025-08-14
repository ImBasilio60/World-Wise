import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Homepage = lazy(() => import("./pages/Homepage.jsx"));
const Pricing = lazy(() => import("./pages/Pricing.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.jsx"));
const AppLayout = lazy(() => import("./pages/AppLayout.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));

// import Homepage from "./pages/Homepage.jsx";
// import Pricing from "./pages/Pricing.jsx";
// import Product from "./pages/Product.jsx";
// import PageNotFound from "./pages/PageNotFound.jsx";
// import AppLayout from "./pages/AppLayout.jsx";
// import Login from "./pages/Login.jsx";

import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import { CitiesProvider } from "./contexts/CitiesProvider.jsx";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />}></Route>
              <Route path={"product"} element={<Product />}></Route>
              <Route path={"pricing"} element={<Pricing />}></Route>
              <Route path={"login"} element={<Login />}></Route>
              <Route
                path={"app"}
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  element={<Navigate to={"cities"} replace />}
                ></Route>
                <Route path={"cities"} element={<CityList />}></Route>
                <Route path={"cities/:id"} element={<City />}></Route>
                <Route path={"countries"} element={<CountryList />}></Route>
                <Route path={"form"} element={<Form />}></Route>
              </Route>
              <Route path={"*"} element={<PageNotFound />}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
