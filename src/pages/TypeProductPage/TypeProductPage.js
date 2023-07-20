import NavBar from "../../components/NavBarComponent/NavBar";
import CardProduct from "../../components/CardComponent/CardProduct";
import "./TypeRroductPage.css";
import { Col, Pagination, Row } from "antd";

function TypeProductPage() {
  const onChange = () => {};
  return (
    <div className="container-type-product">
      <Row className="type-product-wrapper">
        <Col span={4} className="nav-type-product">
          <NavBar />
        </Col>
        <Col span={20}>
          <div className="card-product-list">
            <CardProduct />
            <CardProduct />
            <CardProduct />
          </div>
          <Pagination className="pagination-type-product" defaultCurrent={2} total={100} onChange={onChange} />
        </Col>
      </Row>
    </div>
  );
}

export default TypeProductPage;
