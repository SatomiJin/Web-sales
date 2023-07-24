import "./AdminPage.css";
import React, { useState } from "react";
import { AppstoreOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu, Switch } from "antd";
import { getItem } from "../../utils";
const items = [
  getItem("Quản lý người dùng", "user", <UserOutlined />, [
    getItem("Option 1", "1"),
    getItem("Option 2", "2"),
    getItem("Option 3", "3"),
    getItem("Option 4", "4"),
  ]),
  getItem("Quản lý sản phẩm", "product", <AppstoreOutlined />, [getItem("Option 5", "5"), getItem("Option 6", "6")]),
];
function AdminPage() {
  const [theme, setTheme] = useState("dark");
  const [current, setCurrent] = useState("1");
  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };
  const onClick = ({ key }) => {
    console.log("click", key);
    setCurrent(key);
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
            borderRadius: 10,
          }}
          defaultOpenKeys={["user"]}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
      </div>
      <div className="content-admin-page">
        {current ? <span>key la {current}</span> : <span>nothing</span>} <span>keyyyyyyy</span>
      </div>
    </div>
  );
}

export default AdminPage;
