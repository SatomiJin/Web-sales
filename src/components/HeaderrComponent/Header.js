import { Col } from "antd";
import {
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeader,
} from "./Styles";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";

import "./Header.css";
import InputSearch from "../inputSearch/InputSearch";

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
            <UserOutlined className="account-icon" />
            <div className="account-info">
              <span className="login-logout">Đăng nhập/Đăng ký</span>
              <div className="account">
                <span className="account-text">
                  Tài khoản <DownCircleOutlined className="drop-down" />
                </span>
              </div>
            </div>
          </WrapperHeaderAccount>
          <div className="cart">
            <ShoppingCartOutlined className="cart-icon" />
            <span className="cart-text">Giỏ hàng</span>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
}

export default Header;
