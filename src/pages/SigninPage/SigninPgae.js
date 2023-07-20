import { Form, Image } from "antd";
import { Link } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import imageLogin from "../../assets/images/logo/image-login.png";
import socialItem from "../../assets/images/social-item";
import "./SigninPgae.css";
import { useState } from "react";

function SigninPage() {
  //xử lý dữ liệu form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Hàm
  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOnchangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleOnClickSignin = () => {
    console.log("email:", email, "password:", password);
  };
  return (
    <div className="container-sign-in-page">
      <div className="sign-in-page-wrapper">
        <div className="wrapper-sign-in-left">
          <div className="sign-in-left-header">
            <h4 className="xinchao-sign-in">Xin chào,</h4>
            <p>Đăng nhập hoặc Tạo tài khoản</p>
          </div>
          <Form className="form-input-sign-in">
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <InputForm placeholder="Email" type="text" name="username" onChange={handleOnchangeEmail} />
            </Form.Item>
            <InputForm placeholder="Mật khẩu" type="password" name="password" onChange={handleOnchangePassword} />
            <ButtonComponent
              disabled={!email.length || !password.length}
              className="btn-sign-in"
              textButton="Đăng nhập"
              onClick={handleOnClickSignin}
            />
          </Form>
          <p className="sign-in-with-email">
            Chưa có tài khoản? <Link to="/sign-up">Đăng ký</Link>
          </p>
          <div className="footer-left-sign-in">
            <p className="social-heading-sign-in-page">
              <span>Hoặc tiếp tục bằng:</span>
            </p>
            <ul className="social-list-item-sign-in">
              {socialItem.map((social, index) => (
                <li key={index} className="social-item-sign-in">
                  <img className="image-social-item-sign-in" src={social} alt="social item" />
                </li>
              ))}
            </ul>
            <p className="note-sign-in-left">
              Bằng việc tiếp tục, bạn đã đọc và đồng ý với
              <Link to="/termsand-conditions"> điều khoản sử dụng </Link>
              và <br />
              <Link to="/privacy-policy">&nbsp;Chính sách bảo mật thông tin cá nhân&nbsp;</Link>
              của Schwarzer Ritter Team.
            </p>
          </div>
        </div>
        <div className="wrapper-sign-in-right">
          <Image src={imageLogin} preview={false} alt="this is a image" className="image-sign-in-form" />
          <div className="content-sign-in-form">
            <h4 className="content-sign-in-form-text-h4">Mua sắm tại Schwarzer Ritter</h4>
            <span className="content-sign-in-form-text-span">Siêu ưu đãi mỗi ngày</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
