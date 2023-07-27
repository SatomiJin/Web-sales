import { Button, Form, Space, Upload } from "antd";
import { UserAddOutlined, UploadOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import Loading from "../../../loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import ModalComponent from "../../Modal/ModalComponent";
import DrawerComponent from "../../Drawer/DrawerComponent";
import InputComponent from "../../InputComponent/InputComponent";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import TableComponent from "../../Table/TableComponent";
import * as UserService from "../../../Services/UserService";
import * as message from "../../../Message/Message";
import { UserMutationHook } from "../../../hooks/UseMutationHook";
import "./AdminUser.css";
import { getBase64 } from "../../../utils";
import { useForm } from "antd/es/form/Form";

function AdminUser() {
  //tạo một số thứ cần thiết
  //useForm
  const [form] = useForm();
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [stateUser, setStateUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
    avatar: "",
    address: "",
  });
  const [stateUserDetail, setStateUserDetail] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    isAdmin: false,
    avatar: "",
    address: "",
  });
  const [avatar, setAvatar] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete, setIsOpenDelete] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  //tạo dispatch
  const dispatch = useDispatch();
  //tạo selectedRow
  const [rowSelected, setRowSelected] = useState("");

  //search
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  //Lấy thông tin xác thực người dùng
  const user = useSelector((state) => state.user);
  //Lấy danh sách người dùng
  const getAllUser = async (access_token) => {
    const res = await UserService.getAllUser(user?.access_token);

    return res;
  };
  //tạo mới user
  const mutation = UserMutationHook((data) => {
    const { name, email, password, confirmPassword, phone, isAdmin, avatar, address } = data;
    const res = UserService.signupUser({ name, email, password, confirmPassword, phone, isAdmin, avatar, address });
    return res;
  });

  //cập nhật user
  const mutationUpdate = UserMutationHook((data) => {
    console.log("data", data);
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    console.log("res-up", res);
    return res;
  });

  //xóa người dùng
  const mutationDelete = UserMutationHook((data) => {
    const { id } = data;
    const res = UserService.deleteUser(id);
    return res;
  });

  //lấy dữ liệu danh sách người dùng

  const queryUsers = useQuery(["users"], getAllUser);
  const { isLoading: isLoadingUser, data: users } = queryUsers;
  const dataUser = users?.data.map((user) => {
    return { ...user, key: user._id, isAdmin: user.isAdmin ? "ADMIN" : "USER" };
  });
  const { data, isLoading, isSuccess, isError } = mutation;
  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isErrorUpdated,
  } = mutationUpdate;
  //delete
  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDelete;

  //lấy thông tin người dùng
  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailUser(rowSelected);
    if (res) {
      setStateUserDetail({
        name: res.name,
        email: res.email,
        password: res.password,
        phone: res.phone,
        address: res.address,
        avatar: res.avatar,
      });
    }

    setIsLoadingUpdate(false);
  };

  //useEffect
  useEffect(() => {
    if (isSuccess && data?.status === "Ok") {
      message.success();
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success();
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated, isErrorUpdated]);

  useEffect(() => {
    form.setFieldsValue(stateUserDetail);
  }, [form, stateUserDetail]);

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsUser(rowSelected);
    }
    setIsLoadingUpdate(false);
  }, [rowSelected]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success();
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDeleted, isErrorDeleted]);
  //một số thao tác quản lý người dùng
  const renderUserActions = () => {
    return (
      <div className="actions-user-admin-page">
        <ButtonComponent type="primary" icon={<EditOutlined />} onClick={() => setIsOpenDrawer(true)} />
        &nbsp;
        <ButtonComponent danger icon={<DeleteOutlined />} onClick={() => setIsOpenDelete(true)} />
      </div>
    );
  };
  //search
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  //dữ liệu columns cho table
  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Địa chỉ email",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      filters: [
        {
          text: `Admin`,
          value: "ADMIN",
        },
        {
          text: `User`,
          value: "USER",
        },
      ],
      onFilter: (value, record) => {
        if (value === "ADMIN") return record.isAdmin === "ADMIN";
        if (value === "USER") return record.isAdmin === "USER";
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: renderUserActions,
    },
  ];

  //Hàm out form tạo user
  const handleCancel = () => {
    // setIsOpenModal(false);
    setStateUser({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      isAdmin: false,
      avatar: "",
      address: "",
    });
    form.resetFields();
  };
  const handleCancelDelete = () => {
    setIsOpenDelete(false);
  };
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetail({
      name: "",
      email: "",
      password: "",
      phone: "",
      avatar: "",
      address: "",
    });
  };
  //xác nhận tạo user mới
  const onFinish = () => {
    mutation.mutate(stateUser, {
      onSettled: () => {
        queryUsers.refetch();
      },
    });
    handleCancel();
  };

  //lấy giá trị input được nhập vào
  const handleOnChange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };
  //tương tự cía trên nhưng của form update user
  const handleOnChangeDetails = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value,
    });
  };

  //tải ảnh lên làm avatar
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUser({
      ...stateUser,
      avatar: file.preview,
    });
  };
  const handleOnchangeAvatarDetail = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetail({
      ...stateUserDetail,
      avatar: file.preview,
    });
  };

  //các hàm liên quan mutation
  const onUpdateUser = () => {
    console.log("click");
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.access_token, ...stateUserDetail },
      {
        onSettled: () => {
          queryUsers.refetch();
        },
      }
    );
    setIsOpenDrawer(false);
  };
  //xóa user

  const handleDeleteUser = () => {
    mutationDelete.mutate(
      { id: rowSelected, token: user.access_token },
      {
        onSettled: () => {
          queryUsers.refetch();
        },
      }
    );
  };
  return (
    <div className="user-management-admin-container">
      <h1>Quản lý người dùng</h1>
      <Button className="btn-user-admin-management add" icon={<UserAddOutlined />} onClick={() => setIsOpenModal(true)}>
        Thêm
      </Button>
      <div className="table-content-management-user">
        <TableComponent
          columns={columns}
          data={dataUser}
          style={{ width: "100%" }}
          isLoading={isLoadingUpdate}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              }, // click row
            };
          }}
        />
      </div>
      {/* bảng người dùng */}
      <ModalComponent forceRender title="Tạo người dùng mới" open={isOpenModal} footer={null}>
        <Loading isLoading={isLoading}>
          <Form
            form={form}
            name="formUser"
            className="create-user-form"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
            }}
            autoComplete="on"
            onFinish={onFinish}
          >
            <Form.Item
              label="Tên người dùng"
              name="name"
              valuePropName="field"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên người dùng!",
                },
              ]}
            >
              <InputComponent value={stateUser.name} onChange={handleOnChange} name="name" />
            </Form.Item>

            <Form.Item
              label="Địa chỉ email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ email!",
                },
              ]}
            >
              <InputComponent value={stateUser.type} onChange={handleOnChange} name="email" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
              ]}
            >
              <InputComponent value={stateUser.password} onChange={handleOnChange} name="password" />
            </Form.Item>
            <Form.Item
              label="Nhập lại mật khẩu"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lại mật khẩu!",
                },
              ]}
            >
              <InputComponent value={stateUser.confirmPassword} onChange={handleOnChange} name="confirmPassword" />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại!",
                },
              ]}
            >
              <InputComponent value={stateUser.phone} onChange={handleOnChange} name="phone" />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ!",
                },
              ]}
            >
              <InputComponent value={stateUser.description} onChange={handleOnChange} name="address" />
            </Form.Item>

            <Form.Item label="Ảnh đại diện">
              <Upload maxCount={1} className="upload-file-avatar" name="avatar" onChange={handleOnchangeAvatar}>
                <ButtonComponent icon={<UploadOutlined />} textButton="Tải ảnh lên"></ButtonComponent>
              </Upload>
              {stateUser.image && <img src={stateUser.image} alt="avatar" className="user-image-management" />}
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <ButtonComponent
                type="primary"
                htmlType="submit"
                className="btn-submit-create-user"
                textButton="Tạo người dùng"
              ></ButtonComponent>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      {/* sửa thông tin người dùng */}
      <DrawerComponent
        width="80vw"
        title="Chi tiết người dùng"
        placement="left"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
      >
        <Loading isLoading={isLoadingUpdate}>
          <Form
            form={form}
            name="userForm"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: "100%",
            }}
            onFinish={onUpdateUser}
          >
            <Form.Item label="Tên người dùng" name="name">
              <InputComponent value={stateUserDetail.name} onChange={handleOnChangeDetails} name="name" />
            </Form.Item>

            <Form.Item label="Địa chỉ email" name="email">
              <InputComponent value={stateUserDetail.email} onChange={handleOnChangeDetails} name="email" />
            </Form.Item>

            <Form.Item label="Số điện thoại" name="phone">
              <InputComponent value={stateUserDetail.phone} onChange={handleOnChangeDetails} name="phone" />
            </Form.Item>

            <Form.Item label="Địa chỉ" name="address">
              <InputComponent value={stateUserDetail.address} onChange={handleOnChangeDetails} name="address" />
            </Form.Item>

            <Form.Item label="Ảnh đại diện">
              <Upload
                name="avatar"
                maxCount={1}
                className="upload-file-image-user"
                onChange={handleOnchangeAvatarDetail}
              >
                <ButtonComponent icon={<UploadOutlined />} textButton="Tải ảnh lên"></ButtonComponent>
              </Upload>
              {stateUserDetail.avatar && (
                <img src={stateUserDetail.avatar} alt="Avatar" className="user-image-management" />
              )}
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <ButtonComponent onClick={onUpdateUser} htmlType="submit" textButton="Cập nhật"></ButtonComponent>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      {/* xóa người dùng */}
      <ModalComponent
        title="Xóa người dùng"
        open={isModalOpenDelete}
        onOk={handleDeleteUser}
        onCancel={handleCancelDelete}
      >
        <Loading isLoading={isLoadingDelete}>
          <div className="question-when-delete-user">
            <p className="content-questions-delete-user">Bạn có chắc muốn xóa người dùng này không ?</p>
          </div>
        </Loading>
      </ModalComponent>
    </div>
  );
}

export default AdminUser;
