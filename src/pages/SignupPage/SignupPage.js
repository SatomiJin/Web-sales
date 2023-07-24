import { Form, Image } from "antd";
import { RollbackOutlined, EyeInvisibleFilled, EyeFilled } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as UserSevice from "../../Services/UserService";
import { UserMutationHook } from "../../hooks/UseMutationHook";

import * as message from "../../Message/Message";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import imageLogin from "../../assets/images/logo/image-login.png";
import socialItem from "../../assets/images/social-item";
import "../SigninPage/SigninPgae.css";

function SignupPage() {
  //lịch sử
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  //đăng ký tài khoản
  const mutation = UserMutationHook((data) => UserSevice.signupUser(data));
  const { isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      message.success();
      navigate("/sign-in");
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  //xử lý dữ liệu trong form
  //Email
  const [email, setEmail] = useState("");
  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  //password
  const [password, setPassword] = useState("");
  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };
  //confirm password
  const [confirmPassword, setConfirmPassword] = useState("");
  const hadnleOnChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  //tên hiển thị
  const [name, setName] = useState("");
  const handleOnchangeName = (e) => {
    setName(e.target.value);
  };
  //số điện thoại
  const [phone, setPhoneNumber] = useState("");
  const handleOnchangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  //Đăng ký
  const handleSignUp = () => {
    mutation.mutate({ name, email, password, confirmPassword, phone });
  };
  return (
    <div className="container-sign-in-page">
      <div className="sign-in-page-wrapper">
        <div className="wrapper-sign-in-left">
          <div className="sign-in-left-header">
            <h4 className="xinchao-sign-in">Xin chào,</h4>
            <p>Đăng ký ngay - Quà trao tay</p>
          </div>
          <Form className="form-input-sign-in">
            <InputForm placeholder="Tên hiển thị.." type="text" onChange={handleOnchangeName} />
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
              <InputForm placeholder="Email" onChange={handleOnChangeEmail} />
            </Form.Item>
            <div className="hide-show-password">
              <span className="hide-show-password-span" onClick={() => setIsShowPassword(!isShowPassword)}>
                {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
              </span>
              <Form.Item>
                <InputForm
                  placeholder="Mật khẩu"
                  type={isShowPassword ? "text" : "password"}
                  onChange={handleOnChangePassword}
                />
              </Form.Item>
            </div>
            <div className="hide-show-confirm-password">
              <InputForm
                placeholder="Nhập lại mật khẩu"
                type={isShowConfirmPassword ? "text" : "password"}
                name="re-password"
                onChange={hadnleOnChangeConfirmPassword}
              />
              <span
                className="hide-show-confirm-password-span"
                onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              >
                {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
              </span>
            </div>
            <InputForm placeholder="Số điện thoại" type="text" onChange={handleOnchangePhoneNumber} />
          </Form>
          <ButtonComponent
            disabled={!email.length || !password.length || !confirmPassword.length || !name.length || !phone.length}
            onClick={handleSignUp}
            className="btn-sign-in"
            textButton="Đăng ký"
          />
          <Link to="/sign-in">
            <ButtonComponent
              className="back-to-sign-in"
              icon={<RollbackOutlined />}
              textButton="Trở lại trang đăng nhập"
              to="/sign-in"
            />
          </Link>
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

export default SignupPage;
