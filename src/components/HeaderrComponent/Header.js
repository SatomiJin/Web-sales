import { Col } from "antd";
import {
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeader,
} from "./Styles";
import Search from "antd/es/transfer/search";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";

import "./Header.css";

function Header() {
  return (
    <div>
      <WrapperHeader gutter={16}>
        <Col span={7} className="header-left">
          <WrapperTextHeader>Schwarzer Ritter</WrapperTextHeader>
        </Col>
        <Col span={10} className="header-middle">
          <Search
            placeholder="Tìm kiếm sản phẩm..."
            //allowClear
            enterButton="Search"
            size="large"
            //onSearch={onSearch}
          />
        </Col>
        <Col span={7} className="header-right">
          <WrapperHeaderAccount>
            <UserOutlined className="account-icon" />
            <div className="account-info">
              <span>Đăng nhập/Đăng ký</span>
              <div className="account">
                <span>Tài khoản</span>
                <DownCircleOutlined />
              </div>
            </div>
          </WrapperHeaderAccount>
          <div className="cart">
            <ShoppingCartOutlined className="cart-icon" />
            <span>Giỏ hàng</span>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
}

export default Header;
