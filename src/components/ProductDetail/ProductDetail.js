import { Col, Image, InputNumber, Row } from "antd";
import { StarFilled, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import imageProduct from "../../assets/images/products/samsunga23.jpg";
import imageProductSmall from "../../assets/images/products/samsunga23small.jpg";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import "./ProductDetail.css";

function ProductDetail() {
  const onChange = () => {};
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
        <Col span={14} className="product-name-and-infomation">
          Điện thoại Samsung Galaxy A23 (4GB/128GB) - Hàng chính hãng
          <div className="rating-product-detail">
            <StarFilled className="ratings-star-product-detail" />
            <span className="product-detail-sold"> | Đã bán 1000 +</span>
          </div>
          <div className="price-product-detail">
            <p className="price-product-detail-text">20.000.000 đ</p>
          </div>
          <div className="address-product-detail">
            <span>Giao đến:</span> &nbsp;
            <span className="address-product-detail-text">
              Q. 3, P. 11, Hồ Chí Minh
            </span>
            -{" "}
            <span className="address-product-detail-change-address">
              Đổi địa chỉ
            </span>
          </div>
          <div className="quantity-product-detail">
            <p>Số lượng</p>
            <div className="quantity-product-detail-wrapper">
              <ButtonComponent
                className="btn-quantity-product-detail"
                icon={<MinusOutlined />}
              />
              <InputNumber
                className="input-quantity-product-detail"
                defaultValue={1}
                onChange={onChange}
              />
              <ButtonComponent
                className="btn-quantity-product-detail"
                icon={<PlusOutlined />}
              />
            </div>
          </div>
          <div className="buy-product-detail-wrapper">
            <ButtonComponent
              className="btn-buy-product-detail"
              size="large"
              textButton="Chọn Mua"
            ></ButtonComponent>
            <ButtonComponent
              className="btn-installment-purchase-product-detail"
              size="large"
              textButton={`mua trước trả sau`}
            >
              <span>Lãi suất 0%</span>
            </ButtonComponent>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetail;
