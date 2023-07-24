import { useEffect, useState } from "react";
import { Input, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, resetUser } from "../../redux/slides/UserSlide";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

import Loading from "../../loading/Loading";
import { UserMutationHook } from "../../hooks/UseMutationHook";
import * as UserService from "../../Services/UserService";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as message from "../../Message/Message";
import "./ProfileUser.css";
import { getBase64 } from "../../utils";

function ProfileUser() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState(user?.email);
  const [name, setName] = useState(user?.name);
  const [address, setAddress] = useState(user?.address);
  const [phone, setPhone] = useState(user?.phone);
  const [avatar, setAvatar] = useState(user?.avatar);

  const dispatch = useDispatch();
  const mutation = UserMutationHook((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });

  const { data, isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    setEmail(user?.email);
    setAddress(user?.address);
    setName(user?.name);
    setPhone(user?.phone);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleGetDetailUser(user?.id, user?.access_token);
      window.location.reload();
      console.log("avatar", avatar);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleGetDetailUser = async (id, token) => {
    try {
      const res = await UserService.getDetailUser(id, token);
      dispatch(updateUser({ ...res, access_token: token }));
    } catch (e) {
      return e.toString();
    }
  };

  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOnchangeName = (e) => {
    setName(e.target.value);
  };
  const handleOnchangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleOnchangePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };
  const handleUpdateUserProfile = () => {
    mutation.mutate({ id: user?.id, name, email, phone, address, avatar });
  };

  return (
    <div className="container-profile-user">
      <h1 className="profile-user-text-h1">Thông tin người dùng</h1>
      <Loading isLoading={isLoading}>
        <div className="wrapper-content-profile-user">
          <div className="wrapper-input-profile-user">
            <label htmlFor="name-user" className="label-profile-user">
              Tên người dùng:
            </label>
            <Input id="name-user" className="input-profile-user" value={name} onChange={handleOnchangeName} />
          </div>
          <div className="wrapper-input-profile-user">
            <label htmlFor="email-user" className="label-profile-user">
              Email:
            </label>
            <Input id="email-user" className="input-profile-user" value={email} onChange={handleOnchangeEmail} />
          </div>
          <div className="wrapper-input-profile-user">
            <label htmlFor="phone-user" className="label-profile-user">
              SĐT:
            </label>
            <Input id="phone-user" className="input-profile-user" value={phone} onChange={handleOnchangePhone} />
          </div>
          <div className="wrapper-input-profile-user">
            <label htmlFor="address-user" className="label-profile-user">
              Địa chỉ:
            </label>
            <Input id="address-user" className="input-profile-user" value={address} onChange={handleOnchangeAddress} />
          </div>
          <div className="wrapper-input-profile-user">
            <label htmlFor="avatar-user" className="label-profile-user">
              Avatar:
            </label>
            <Upload maxCount={1} className="upload-file-image-profile-user" onChange={handleOnchangeAvatar}>
              <ButtonComponent icon={<UploadOutlined />} textButton="Tải ảnh lên"></ButtonComponent>
            </Upload>
            {avatar && <img src={avatar} alt="avatar" className="user-avatar-profile-user" />}
          </div>

          <ButtonComponent
            className="btn-update-profile-user"
            textButton="Lưu cập nhật"
            size="large"
            onClick={handleUpdateUserProfile}
          ></ButtonComponent>
        </div>
      </Loading>
    </div>
  );
}

export default ProfileUser;
