import { Form, Image } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as UserService from "../../Services/UserService";
import { UserMutationHook } from "../../hooks/UseMutationHook";
import * as message from "../../Message/Message";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";

import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import imageLogin from "../../assets/images/logo/image-login.png";
import socialItem from "../../assets/images/social-item";
import Loading from "../../loading/Loading";
import { updateUser } from "../../redux/slides/UserSlide";
import "./SigninPgae.css";

function SigninPage() {
  //location
  const location = useLocation();
  //chuyển hướng
  const navigate = useNavigate();
  //dispatch
  const dispatch = useDispatch();
  //gọi API
  const mutation = UserMutationHook((data) => UserService.loginUser(data));
  const { data, isLoading, isSuccess } = mutation;
  console.log("state", location.state);
  //chuyển hướng sang home khi đăng nhập thành công
  useEffect(() => {
    if (isSuccess) {
      message.success();
      const linkP = location.state;
      if (location?.state) {
        navigate("/");
      } else {
        navigate("/");
      }
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      if (data?.access_token) {
        const decode = jwt_decode(data?.access_token);

        if (decode.id) {
          handleGetDetailUser(decode?.id, data?.access_token);
        }
      }
    }
  }, [isSuccess]);

  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token);
    dispatch(updateUser({ ...res, access_token: token }));
  };
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
    mutation.mutate({ email, password });
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
            <Loading isLoading={isLoading}>
              <ButtonComponent
                disabled={!email.length || !password.length}
                className="btn-sign-in"
                textButton="Đăng nhập"
                onClick={handleOnClickSignin}
              />
            </Loading>
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
