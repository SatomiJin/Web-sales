import { Steps } from "antd";
import "./StepsComponent.css";

function StepsComponent({ items, current, ...rests }) {
  return <Steps className="steps-component" current={current} items={items} {...rests} />;
}

export default StepsComponent;
