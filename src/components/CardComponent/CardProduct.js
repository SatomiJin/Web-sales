import { Card } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./CardProduct.css";
import logo from "../../assets/images/logo/logo.png";
import { convertPrice } from "../../utils";
function CardProduct(props) {
  const { image, name, price, rating, type, discount, sold, id, countInStock } = props;
  const navigate = useNavigate();
  const handleDetailProduct = (name) => {
    navigate(`/product-detail/${name.toLowerCase().replace(/\s/g, "-")}`, { state: name });
  };
  return (
    <Card
      style={countInStock === 0 ? { opacity: 0.3 } : {}}
      className="cart-items"
      hoverable
      headStyle={{ height: "30vh" }}
      bodyStyle={{ padding: 10 }}
      cover={<img alt="example" src={image} className="image-product-card-product" />}
      onClick={() => handleDetailProduct(name)}
    >
      <img className="logo-web" src={logo} alt="logo" />
      <div className="products-name">{name}</div>
      <div className="rated">
        <span>
          {rating} &nbsp;
          <StarOutlined />
        </span>

        <span> | Đã bán {sold || 1000}+</span>
      </div>
      <div className="price-product">
        {convertPrice(price)} <span className="discount-product">- {discount || 5}%</span>
      </div>
    </Card>
  );
}

export default CardProduct;
