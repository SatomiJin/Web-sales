import { Button } from "antd";

function ButtonComponent({ size, icon, ...rest }) {
  return <Button size={size} icon={icon} {...rest}></Button>;
}

export default ButtonComponent;
