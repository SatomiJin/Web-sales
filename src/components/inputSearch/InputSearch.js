import { SearchOutlined } from "@ant-design/icons";

import "./InputSearch.css";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

function InputSearch(props) {
  const { size, placeholder, ...rests } = props;
  return (
    <div className="Search">
      <InputComponent className="search-input" size={size} placeholder={placeholder} {...rests} />
      <ButtonComponent className="search-button" size={size} icon={<SearchOutlined />}></ButtonComponent>
    </div>
  );
}

export default InputSearch;
