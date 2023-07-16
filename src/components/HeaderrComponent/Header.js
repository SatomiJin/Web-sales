import { Badge, Col } from "antd";
import {
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeader,
} from "./Styles";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import "./Header.css";
import InputSearch from "../inputSearch/InputSearch";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

function Header() {
  return (
    <div>
      <WrapperHeader>
        <Col span={6} className="header-left">
          <WrapperTextHeader>Schwarzer Ritter</WrapperTextHeader>
        </Col>
        <Col span={11} className="header-middle">
          <InputSearch size="large" placeholder="Tìm kiếm sản phẩm..." />
        </Col>
        <Col span={7} className="header-right">
          <WrapperHeaderAccount>
            <div className="account">
              <button type="button" className="btn-account">
                <UserOutlined />
                &nbsp;Tài khoản
              </button>
            </div>
          </WrapperHeaderAccount>
          <div className="cart">
            <Badge count={5} size="small">
              <ShoppingCartOutlined className="cart-icon" />
            </Badge>
            <span className="cart-text">Giỏ hàng</span>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
}

export default Header;
