import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LikeButton from "../../components/LikeButton/LikeButton";
import logo from "../../assets/images/logo/logo-team.png";
import * as ProductService from "../../Services/ProductService";
import "./Footer.css";

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
          <p className="footer-title">Về chúng tôi</p>
          <div className="about-us-footer">
            <img src={logo} className="logo-team-footer" alt="schwarzer" />
            <br />
            &#169; 2023 Schwarzer Ritter. All rights reserved.
          </div>
        </Col>
        <Col span={5} className="center-footer-wrapper">
          <p className="footer-title">Sản phẩm</p>
          <div className="list-product-footer">
            {typeProducts?.map((type, index) => {
              return (
                <div key={index} className="list-product-item-footer" onClick={() => handleNavigateType(type)}>
                  {type}
                </div>
              );
            })}
          </div>
        </Col>
        <Col span={5}>
          <div className="right-footer-wrapper">
            <p className="footer-title">Liên hệ với chúng tôi</p>
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
            <getresponse-form form-id="bde31dbe-620e-4a69-a95d-3dec5e7443d3" e="1"></getresponse-form>
          </div>
          <LikeButton />
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
