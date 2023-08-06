import { Col, Image, InputNumber, Rate, Row } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import * as ProductService from "../../Services/ProductService";
import imageProductSmall from "../../assets/images/products/samsunga23small.jpg";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import Loading from "../../loading/Loading";
import { addOrderProduct } from "../../redux/slides/OrderSlide";
import { convertPrice } from "../../utils";
import "./ProductDetail.css";
import * as message from "../../Message/Message";

const ProductDetail = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setNumProduct(Number(e.target.value));
  };
  const user = useSelector((state) => state?.user);
  const order = useSelector((state) => state.order);
  //lấy thông tin product nha
  const fetchGetDetailProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = ProductService.getDetailProduct(id);
      return res;
    }
  };

  //------------------
  // const renderStars = (num) => {
  //   const stars = [];
  //   for (let i = 0; i < num; i++) {
  //     stars.push(<StarFilled key={i} className="ratings-star-product-detail" />);
  //   }
  //   return stars;
  // };
  const { isLoading, data: productDetails } = useQuery(["products-details", idProduct], fetchGetDetailProduct, {
    enabled: !!idProduct,
  });
  //thêm snar phẩm vào giỏ hàng
  const handleAddOrder = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location.pathname });
    } else {
      //  name: { type: String, required: true },
      //   amount: { type: Number, required: true },
      //   price: { type: Number, required: true },
      //   product: {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: "Product",
      //     required: true,
      //   }

      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetails.data.name,
            countInStock: productDetails.data.countInStock,
            amount: numProduct,
            image: productDetails.data.image,
            price: productDetails.data.price,
            product: productDetails.data._id,
          },
        })
      );
    }
  };
  console.log(productDetails);
  return (
    <Loading isLoading={isLoading}>
      <div className="product-detail-component-wrapper">
        <Row className="list-images-product-pd">
          <Col span={10}>
            <Image src={productDetails?.data?.image} alt="samsung" />
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
            {productDetails?.data?.name}
            <div className="rating-product-detail">
              <Rate allowHalf defaultValue={productDetails?.data?.rating} value={productDetails?.data?.rating} />
              <span className="product-detail-sold"> | Đã bán {productDetails?.data?.sold || 1000} +</span>
            </div>
            <div className="price-product-detail">
              <p className="price-product-detail-text">{convertPrice(productDetails?.data.price)}</p>
            </div>
            <div className="address-product-detail">
              <span>Giao đến: </span> &nbsp;
              <span className="address-product-detail-text">{user.address}</span>-{" "}
              <span className="address-product-detail-change-address">Đổi địa chỉ</span>
            </div>
            <div className="quantity-product-detail">
              <p>Số lượng</p>
              <div className="quantity-product-detail-wrapper">
                <ButtonComponent
                  className="btn-quantity-product-detail"
                  icon={<MinusOutlined />}
                  onClick={() => setNumProduct(numProduct - 1)}
                  danger
                />
                <InputNumber
                  className="input-quantity-product-detail"
                  value={numProduct > 0 ? numProduct : setNumProduct(1)}
                  onChange={onChange}
                />
                <ButtonComponent
                  className="btn-quantity-product-detail"
                  icon={<PlusOutlined />}
                  onClick={() => setNumProduct(numProduct + 1)}
                />
              </div>
            </div>
            <div className="buy-product-detail-wrapper">
              <div>
                <ButtonComponent
                  className="btn-buy-product-detail"
                  size="large"
                  onClick={handleAddOrder}
                  textButton="Chọn Mua"
                ></ButtonComponent>
              </div>
              <ButtonComponent
                className="btn-installment-purchase-product-detail"
                size="large"
                textButton={`Mua Trước Trả Sau`}
              ></ButtonComponent>
            </div>
          </Col>
        </Row>
      </div>
    </Loading>
  );
};

export default ProductDetail;
