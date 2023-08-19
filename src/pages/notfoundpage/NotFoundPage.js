import { Col, Row } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import "./NotFoundPage.css";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

function NotFoundPage() {
  return (
    <div className="notfound-page-container">
      <div className="notfound-page-content">
        <Row>
          <Col span={12} className="notfound-page-content-left">
            <h2 className="notfound-page-text">404 - Not Found</h2>
            <p>Địa chỉ website bạn đi đến không tồn tại</p>
            <ButtonComponent
              size={"large"}
              icon={<RollbackOutlined />}
              className="btn-back-home"
              textButton={"Quay lại trang chủ"}
            />
          </Col>
          <Col span={12} className="notfound-page-content-right">
            <h2 className="notfound-pahe-contact">Liên hệ với chúng tôi</h2>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default NotFoundPage;
