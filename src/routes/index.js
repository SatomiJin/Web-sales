import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import Home from "../pages/home/Home";
import Orders from "../pages/orders/Orders";
import Products from "../pages/products/Products";
import SigninPage from "../pages/SigninPage/SigninPgae";
import SignupPage from "../pages/SignupPage/SignupPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import TermsandConditions from "../pages/TermsandConditions/TermsandConditions";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import NotFoundPage from "../pages/notfoundpage/NotFoundPage";
import ProfileUser from "../pages/ProfileUser/ProfileUser";
import AdminPage from "../pages/Admin/AdminPage";
import OrderPage from "../pages/OrderPage/OrderPage";

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
    path: "/product/:type",
    page: TypeProductPage,
    isShowHeader: true,
  },
  {
    path: "/sign-in",
    page: SigninPage,
    isShowHeader: false,
  },
  {
    path: "/sign-up",
    page: SignupPage,
    isShowHeader: false,
  },
  {
    path: "/product-detail/:id",
    page: ProductDetailPage,
    isShowHeader: true,
  },
  {
    path: "/termsand-conditions",
    page: TermsandConditions,
    isShowHeader: false,
  },
  {
    path: "/privacy-policy",
    page: PrivacyPolicy,
    isShowHeader: true,
  },
  {
    path: "/profile-user",
    page: ProfileUser,
    isShowHeader: true,
  },
  {
    path: "/system/admin",
    page: AdminPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: "/order-page",
    page: OrderPage,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
    isShowHeader: false,
  },
];
