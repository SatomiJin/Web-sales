import { Col, Image, Row } from "antd";
import "./ProductDetail.css";
import imageProduct from "../../assets/images/products/samsunga23.jpg";
import imageProductSmall from "../../assets/images/products/samsunga23small.jpg";

function ProductDetail() {
  return (
    <div className="product-detail-component-wrapper">
      <Row className="list-images-product-pd">
        <Col span={10}>
          <Image src={imageProduct} alt="samsung" />
          <div className="images-small-product-list">
            <Row className="list-images-item-row">
              <Col span={4} className="list-image-item-col">
                <Image
                  src={imageProductSmall}
                  className="image-item-small"
                  alt="list small product"
                  preview={false}
                />
              </Col>
              <Col span={4} className="list-image-item-col">
                <Image
                  src={imageProductSmall}
                  className="image-item-small"
                  alt="list small product"
                  preview={false}
                />
              </Col>
              <Col span={4} className="list-image-item-col">
                <Image
                  src={imageProductSmall}
                  className="image-item-small"
                  alt="list small product"
                  preview={false}
                />
              </Col>
              <Col span={4} className="list-image-item-col">
                <Image
                  src={imageProductSmall}
                  className="image-item-small"
                  alt="list small product"
                  preview={false}
                />
              </Col>
              <Col span={4} className="list-image-item-col">
                <Image
                  src={imageProductSmall}
                  className="image-item-small"
                  alt="list small product"
                  preview={false}
                />
              </Col>
              <Col span={4} className="list-image-item-col">
                <Image
                  src={imageProductSmall}
                  className="image-item-small"
                  alt="list small product"
                  preview={false}
                />
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={14}>col-14</Col>
      </Row>
    </div>
  );
}

export default ProductDetail;
