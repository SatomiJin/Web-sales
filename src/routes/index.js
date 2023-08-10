import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import Home from "../pages/home/Home";

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
import PaymentPage from "../pages/Payment/PaymentPage";
import OrderSuccessPage from "../pages/OrderSuccess/OrderSuccessPage";
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";

export const routes = [
  {
    path: "/",
    page: Home,
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
    isPrivate: false,
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
    path: "/my-orders",
    page: MyOrderPage,
    isShowHeader: true,
  },
  // {
  //   path: "/details-order/:id",
  //   page: DetailsOrderPage,
  //   isShowHeader: true,
  // },
  {
    path: "/details-order/:id",
    page: DetailsOrderPage,
    isShowHeader: true,
  },
  {
    path: "/payment",
    page: PaymentPage,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
    isShowHeader: false,
  },
];
