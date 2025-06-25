import HomePage from "@/pages/home";
import RootLayout from "@/pages/layout";
import { Route, BrowserRouter, Routes } from "react-router";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
