import Home from "../pages/home/Home";
import NotFoundPage from "../pages/notfoundpage/NotFoundPage";
import Orders from "../pages/orders/Orders";
import Products from "../pages/products/Products";

export const routes = [
  {
    path: "/",
    page: Home,
    isShowHeader: true,
  },
  {
    path: "/order",
    page: Orders,
    isShowHeader: true,
  },
  {
    path: "/products",
    page: Products,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
    isShowHeader: false,
  },
];
