import { Card } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "./CardProduct.css";
import logo from "../../assets/images/logo/logo.png";
import { convertPrice } from "../../utils";
function CardProduct(props) {
  const { image, name, price, rating, type, discount, sold, id, countInStock } = props;
  const navigate = useNavigate();
  const handleDetailProduct = (id) => {
    navigate(`/product-detail/${id}`);
  };
  return (
    <Card
      style={countInStock === 0 ? { opacity: 0.3, cursor: "not-allowed" } : {}}
      className="cart-items"
      hoverable
      headStyle={{ width: "200px", height: "200px" }}
      bodyStyle={{ padding: 10 }}
      cover={<img alt="example" src={image} />}
      onClick={() => countInStock !== 0 && handleDetailProduct(id)}
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
