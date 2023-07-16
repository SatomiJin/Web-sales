import { Image } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import arr from "../../assets/images/logo";
import socialItem from "../../assets/images/social-item";
import "../SigninPage/SigninPgae.css";
import { Link } from "react-router-dom";

function SignupPage() {
  return (
    <div className="container-sign-in-page">
      <div className="sign-in-page-wrapper">
        <div className="wrapper-sign-in-left">
          <div className="sign-in-left-header">
            <h4 className="xinchao-sign-in">Xin chào,</h4>
            <p>Đăng ký ngay - Quà trao tay</p>
          </div>
          <form className="form-input-sign-in">
            <InputForm placeholder="Email" type="text" name="username" />
            <InputForm placeholder="Mật khẩu" type="password" name="password" />
            <InputForm
              placeholder="Nhập lại mật khẩu"
              type="password"
              name="re-password"
            />
            <ButtonComponent className="btn-sign-in" textButton="Đăng ký" />
            <Link to="/sign-in">
              <ButtonComponent
                className="back-to-sign-in"
                icon={<RollbackOutlined />}
                textButton="Trở lại trang đăng nhập"
                to="/sign-in"
              />
            </Link>
          </form>
          <div className="footer-left-sign-in">
            <p className="social-heading-sign-in-page">
              <span>Hoặc tiếp tục bằng:</span>
            </p>
            <ul className="social-list-item-sign-in">
              {socialItem.map((social, index) => (
                <li key={index} className="social-item-sign-in">
                  <img
                    className="image-social-item-sign-in"
                    src={social}
                    alt="social item"
                  />
                </li>
              ))}
            </ul>
            <p className="note-sign-in-left">
              Bằng việc tiếp tục, bạn đã đọc và đồng ý với
              <Link to="/termsand-conditions"> điều khoản sử dụng </Link>
              và <br />
              <Link to="/privacy-policy">
                &nbsp;Chính sách bảo mật thông tin cá nhân&nbsp;
              </Link>
              của Schwarzer Ritter Team.
            </p>
          </div>
        </div>
        <div className="wrapper-sign-in-right">
          <Image
            src={arr[1]}
            preview={false}
            alt="this is a image"
            className="image-sign-in-form"
          />
          <div className="content-sign-in-form">
            <h4 className="content-sign-in-form-text-h4">
              Mua sắm tại Schwarzer Ritter
            </h4>
            <span className="content-sign-in-form-text-span">
              Siêu ưu đãi mỗi ngày
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
