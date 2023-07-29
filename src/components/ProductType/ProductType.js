import { useNavigate } from "react-router-dom";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import "./ProductType.css";

function ProductType({ name, typeProduct }) {
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
    <div>
      <ButtonComponent className="type-product-name" textButton={name} onClick={() => handleNavigateType(name)} />
    </div>
  );
}

export default ProductType;
