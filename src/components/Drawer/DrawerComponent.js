import { Drawer } from "antd";
import "./DrawerComponent.css";
function DrawerComponent({ children, title = "drawer", placement = "left", isOpen = false, ...rests }) {
  return (
    <div className="drawer-propeties-admin-management">
      <Drawer
        //không css thông qua className được chịu khó làm inline nha
        title={title}
        placement={placement}
        open={isOpen}
        {...rests}
      >
        {children}
      </Drawer>
    </div>
  );
}

export default DrawerComponent;
