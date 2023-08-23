import { Checkbox, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./NavBar.css";
import * as ProductService from "../../Services/ProductService";

function NavBar() {
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
  const handleOnchange = () => {};
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option, index) => {
          return (
            <div className="nav-list-item" key={index}>
              <h3 className="nav-item">{option}</h3>
            </div>
          );
        });
      case "checkbox":
        return (
          <Checkbox.Group className="checkbox-list" onChange={handleOnchange}>
            {options.map((option, index) => {
              return (
                <Checkbox className="checkbox-item" value={option.value} key={index}>
                  {option.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case "rate":
        return options.map((option, index) => {
          return (
            <div className="rate-star-nav" key={index}>
              <span>
                <Rate className="star-item-nav" allowHalf defaultValue={option} />
                &nbsp; từ {option} sao
              </span>
            </div>
          );
        });
      case "price":
        return options.map((option, index) => {
          return (
            <div className="price-product-nav">
              <h4 className="price-item" key={index}>
                {option}
              </h4>
            </div>
          );
        });
      default:
        return {};
    }
  };
  const listProduct = typeProducts?.map((type, index) => {
    return (
      <div key={index} className="list-product-item-footer" onClick={() => handleNavigateType(type)}>
        {type}
      </div>
    );
  });
  return (
    <div className="wrapper-navbar">
      <h3 className="label-nav">Danh mục</h3>
      <div className="nav-content">{renderContent("text", [listProduct])}</div>
    </div>
  );
}

export default NavBar;
