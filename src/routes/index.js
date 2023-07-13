import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import Home from "../pages/home/Home";
import NotFoundPage from "../pages/notfoundpage/NotFoundPage";
import Orders from "../pages/orders/Orders";
import Products from "../pages/products/Products";
import SigninPage from "../pages/SigninPage/SigninPgae";
import SignupPage from "../pages/SignupPage/SignupPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";

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
    path: "/:type",
    page: TypeProductPage,
    isShowHeader: true,
  },
  {
    path: "/signin",
    page: SigninPage,
    isShowHeader: true,
  },
  {
    path: "/signup",
    page: SignupPage,
    isShowHeader: true,
  },
  {
    path: "/product-detail",
    page: ProductDetailPage,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
    isShowHeader: false,
  },
];
