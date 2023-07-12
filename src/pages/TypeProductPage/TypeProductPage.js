import NavBar from "../../components/NavBarComponent/NavBar";
import CardProduct from "../../components/CardComponent/CardProduct";
import "./TypeRroductPage.css";
import { Col, Row } from "antd";

function TypeProductPage() {
  return (
    <Row className="type-product-wrapper">
      <Col span={4} className="nav-type-product">
        <NavBar />
      </Col>
      <Col span={20}>
        <CardProduct />
      </Col>
    </Row>
  );
}

export default TypeProductPage;
