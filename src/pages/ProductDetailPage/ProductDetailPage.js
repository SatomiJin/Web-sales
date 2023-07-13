import ProductDetail from "../../components/ProductDetail/ProductDetail";
import "./ProductDetailPage.css";

function ProductDetailPage() {
  return (
    <div className="product-detail-wrapper">
      <h3>Trang chủ</h3>
      <div className="product-detail-component">
        <ProductDetail />
      </div>
    </div>
  );
}

export default ProductDetailPage;
