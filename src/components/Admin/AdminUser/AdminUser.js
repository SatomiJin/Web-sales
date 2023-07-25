import { Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import "./AdminUser.css";
import TableComponent from "../../Table/TableComponent";
function AdminUser() {
  return (
    <div className="user-management-admin-container">
      <h1>Quản lý người dùng</h1>
      <Button className="btn-user-admin-management add" icon={<UserAddOutlined />}>
        Thêm
      </Button>
      <div className="table-content-management-user">
        <TableComponent />
      </div>
    </div>
  );
}

export default AdminUser;
