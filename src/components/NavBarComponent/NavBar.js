import { Checkbox, Rate } from "antd";
import "./NavBar.css";

function NavBar() {
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
  return (
    <div className="wrapper-navbar">
      <h4 className="label-nav">label </h4>
      <div className="nav-content">{renderContent("text", ["Tu lanh", "TV", "Laptop"])}</div>
    </div>
  );
}

export default NavBar;
