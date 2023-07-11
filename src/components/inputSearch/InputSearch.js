import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import "./InputSearch.css";

function InputSearch(props) {
  const { size, placeholder } = props;
  return (
    <div className="Search">
      <Input className="search-input" size={size} placeholder={placeholder} />
      <Button
        className="search-button"
        size={size}
        icon={<SearchOutlined />}
      ></Button>
    </div>
  );
}

export default InputSearch;
