import { Input } from "antd";
import "./InputForm.css";
import { useState } from "react";

function InputForm(props) {
  const [valueInput, setValueInput] = useState("");
  const { placeholder, ...rests } = props;
  return (
    <div className="input-form-wrapper">
      <Input
        className="input-sign-in-form"
        autoComplete="new-password"
        placeholder={placeholder}
        valueinput={valueInput}
        {...rests}
      />
    </div>
  );
}

export default InputForm;
