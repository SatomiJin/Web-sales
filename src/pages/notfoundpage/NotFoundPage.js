import { Col, Row } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import "./NotFoundPage.css";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="notfound-page-container">
      <div className="notfound-page-content">
        <Row>
          <Col span={12} className="notfound-page-content-left">
            <h2 className="notfound-page-text">404 - Not Found</h2>
            <p>Địa chỉ website bạn đi đến không tồn tại</p>
            <Link to="/">
              <ButtonComponent
                size={"large"}
                icon={<RollbackOutlined />}
                className="btn-back-home"
                textButton={"Quay lại trang chủ"}
              />
            </Link>
          </Col>
          <Col span={12} className="notfound-page-content-right">
            <h2 className="notfound-pahe-contact">Liên hệ với chúng tôi</h2>
            <div className="list-social-items" style={{ marginTop: 30 }}>
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-discord"></i>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default NotFoundPage;
