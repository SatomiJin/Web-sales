import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo/logo-team.png";
import * as ProductService from "../../Services/ProductService";
import "./Footer.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

function Footer() {
  const [typeProducts, setTypeProducts] = useState([]);
  //lấy loại sản phầm
  const fetchGetAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res.data);
    }
  };
  //lấy loại sản phầm
  useEffect(() => {
    fetchGetAllTypeProduct();
  }, []);

  const navigate = useNavigate();
  const handleNavigateType = (type) => {
    navigate(
      `/product/${type
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        ?.replace(/ /g, "-")}`,
      { state: type }
    );
  };
  return (
    <div className="footer-container">
      <Row>
        <Col span={8} className="left-footer-wrapper">
          <h3>Về chúng tôi</h3>
          <div className="about-us-footer">
            <img src={logo} className="logo-team-footer" alt="schwarzer" />
            <br />
            &#169; 2023 Schwarzer Ritter. All rights reserved.
          </div>
        </Col>
        <Col span={5} className="center-footer-wrapper">
          <h3>Sản phẩm</h3>
          <div className="list-product-footer">
            {typeProducts?.map((type, index) => {
              return (
                <div className="list-product-item-footer" onClick={() => handleNavigateType(type)}>
                  {type}
                </div>
              );
            })}
          </div>
        </Col>
        <Col span={5}>
          <div className="right-footer-wrapper">
            <h3>Liên hệ với chúng tôi</h3>
            <div className="list-social-items">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-discord"></i>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="subscribe-us">
            <h3>Đăng ký nhận ưu đãi</h3>
            <div className="subscribe-content">Đăng ký ngay để nhận thông báo ưu đãi từ chúng tôi</div>
            <a href="https://form-email-marketing.vercel.app/">
              <ButtonComponent className="btn-sub-footer" size="large" textButton="Đăng ký" />
            </a>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
