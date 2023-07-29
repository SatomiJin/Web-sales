import { Badge, Button, Col, Popover } from "antd";
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeader } from "./Styles";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import "./Header.css";
import InputSearch from "../inputSearch/InputSearch";
import { resetUser } from "../../redux/slides/UserSlide";
import Loading from "../../loading/Loading";
import logoTeam from "../../assets/images/logo/logo-team.png";
import { searchProduct } from "../../redux/slides/ProductSlide";

function Header() {
  const user = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLogOutUser = () => {
    setLoading(true);
    localStorage.removeItem("access_token");
    dispatch(resetUser());
    setLoading(false);
    navigate("/");
  };

  const content = (
    <div>
      {user?.isAdmin ? (
        <>
          <Button onClick={() => navigate("/profile-user")}>Thông tin người dùng</Button>
          <br />
          <Button onClick={() => navigate("/system/admin")}>Quản lý hệ thống</Button>
          <br />
          <Button onClick={handleLogOutUser}>Đăng xuất</Button>
        </>
      ) : (
        <>
          <Button onClick={() => navigate("/profile-user")}>Thông tin người dùng</Button>
          <br />
          <Button onClick={handleLogOutUser}>Đăng xuất</Button>
        </>
      )}
    </div>
  );
  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(search));
  };
  return (
    <div className="header-container">
      <WrapperHeader className="header-wrapper">
        <Col span={6} className="header-left">
          <WrapperTextHeader>
            <NavLink to="/">
              <img src={logoTeam} style={{ width: 50 }} alt="logo" />
            </NavLink>
          </WrapperTextHeader>
        </Col>
        <Col span={11} className="header-middle">
          <InputSearch onChange={onSearch} size="large" placeholder="Tìm kiếm sản phẩm..." />
        </Col>
        <Col span={7} className="header-right">
          <WrapperHeaderAccount>
            <div className="account">
              {/* logic */}
              {user?.name ? (
                <>
                  <Loading isLoading={loading}>
                    <Popover content={content} title="Menu" trigger="click">
                      <button type="button" className="btn-account">
                        {user?.avatar ? (
                          <img src={user?.avatar} className="avatar-user-header" alt="avatar" />
                        ) : (
                          <UserOutlined />
                        )}
                        &nbsp;{user?.name}
                      </button>
                    </Popover>
                  </Loading>
                </>
              ) : (
                <Link to="/sign-in">
                  <button type="button" className="btn-account">
                    <UserOutlined />
                    &nbsp;Tài khoản
                  </button>
                </Link>
              )}
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
