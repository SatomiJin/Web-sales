import "./AdminPage.css";
import React, { useState } from "react";
import { AppstoreOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu, Switch } from "antd";
import { getItem } from "../../utils";
import AdminUser from "../../components/Admin/AdminUser/AdminUser";
import AdminProduct from "../../components/Admin/AdminProduct/AdminProduct";
const items = [
  getItem("", ""),
  getItem("Quản lý người dùng", "user", <UserOutlined />),
  getItem("Quản lý sản phẩm", "product", <AppstoreOutlined />),
];
function AdminPage() {
  const [theme, setTheme] = useState("dark");
  const [current, setCurrent] = useState("user");
  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };
  const onClick = ({ key }) => {
    setCurrent(key);
  };

  const renderPage = (current) => {
    switch (current) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      default:
        return;
    }
  };
  return (
    <div className="admin-page-container">
      <div className="menu-item-admin-page">
        <Switch
          className="change-theme-menu"
          checked={theme === "dark"}
          onChange={changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        <Menu
          className="menu-itme"
          theme={theme}
          onClick={onClick}
          style={{
            width: 300,
            height: "1000px",
            boxShadow: "1px 1px 2px #ccc",
          }}
          mode="inline"
          defaultSelectedKeys={["user"]}
          defaultOpenKeys={["user"]}
          items={items}
        />
      </div>
      <div className="content-admin-page">{renderPage(current)}</div>
    </div>
  );
}

export default AdminPage;
