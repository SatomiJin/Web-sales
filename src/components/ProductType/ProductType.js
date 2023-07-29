import { useNavigate } from "react-router-dom";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import "./ProductType.css";
function ProductType({ name, typeProduct }) {
  const navigate = useNavigate();

  return (
    <div>
      <ButtonComponent className="type-product-name" textButton={name} />
    </div>
  );
}

export default ProductType;
