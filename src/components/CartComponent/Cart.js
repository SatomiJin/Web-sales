import { Card } from "antd";
import { StarOutlined } from "@ant-design/icons";
import "./Cart.css";
import logo from "../../assets/images/logo";
function Cart() {
  console.log(logo);
  return (
    <Card
      className="cart-items"
      hoverable
      headStyle={{ width: "200px", height: "200px" }}
      bodyStyle={{ padding: "10px" }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <img className="logo-web" src={logo} alt="logo" />
      <div className="products-name">SamSung</div>
      <div className="rated">
        <span>
          5.0 &nbsp;
          <StarOutlined />
        </span>

        <span> | Đã bán 1000 +</span>
      </div>
      <div className="price-product">
        20.000.000 đ <span className="discount-product">-6%</span>
      </div>
    </Card>
  );
}

export default Cart;
