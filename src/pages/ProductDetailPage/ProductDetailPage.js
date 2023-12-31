import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import "./ProductDetailPage.css";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

function ProductDetailPage() {
  const { id } = useParams();
  const { state } = useLocation();
  console.log("name", state);
  const navigate = useNavigate();
  return (
    <div className="product-detail-wrapper">
      <h3>
        <ButtonComponent textButton="Trang chủ" onClick={() => navigate("/")} /> - Chi tiết sản phẩm
      </h3>
      <div className="product-detail-component">
        <ProductDetail nameProduct={state} />
      </div>
    </div>
  );
}

export default ProductDetailPage;
