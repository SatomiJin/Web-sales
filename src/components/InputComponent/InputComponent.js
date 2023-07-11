import { Input } from "antd";

function InputComponent({ size, placeholder, ...rest }) {
  return <Input size={size} placeholder={placeholder} {...rest} />;
}

export default InputComponent;
