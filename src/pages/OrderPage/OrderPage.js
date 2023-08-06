import { Checkbox, Form, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import "./OrderPage.css";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";

import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
  selectedOrder,
} from "../../redux/slides/OrderSlide";
import ModalComponent from "../../components/Modal/ModalComponent";
import { convertPrice } from "../../utils";
import InputComponent from "../../components/InputComponent/InputComponent";
import { UserMutationHook } from "../../hooks/UseMutationHook";
import * as UserService from "../../Services/UserService";
import Loading from "../../loading/Loading";
import * as message from "../../Message/Message";
import { updateUser } from "../../redux/slides/UserSlide";
import StepsComponent from "../../components/StepsComponent/StepsComponent";
const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter((item) => item !== e.target.value);
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  const handleChangeCount = (type, idProduct, limited) => {
    if (type === "increase") {
      if (!limited) {
        dispatch(increaseAmount({ idProduct }));
      }
    } else {
      if (!limited) {
        dispatch(decreaseAmount({ idProduct }));
      }
    }
  };

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
      });
    }
  }, [isOpenModalUpdateInfo]);

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0;
      return total + (priceMemo * (totalDiscount * cur.amount)) / 100;
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [order]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo >= 2000000 && priceMemo < 5000000) {
      return 10000;
    } else if (priceMemo >= 5000000 || order?.orderItemsSelected?.length === 0) {
      return 0;
    } else {
      return 20000;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo);
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };

  const handleAddCard = () => {
    if (!order?.orderItemsSelected?.length) {
      message.error("Vui lòng chọn sản phẩm");
    } else if (!user?.phone || !user.address || !user.name || !user.city) {
      setIsOpenModalUpdateInfo(true);
    } else {
      navigate("/payment");
    }
  };

  const mutationUpdate = UserMutationHook((data) => {
    const { id, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests });
    return res;
  });

  const { isLoading, data } = mutationUpdate;

  const handleCancleUpdate = () => {
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false);
  };
  const handleUpdateInforUser = () => {
    const { name, address, city, phone } = stateUserDetails;
    if (name && address && city && phone) {
      mutationUpdate.mutate(
        { id: user?.id, token: user?.access_token, ...stateUserDetails },
        {
          onSuccess: () => {
            dispatch(updateUser({ name, address, city, phone }));
            setIsOpenModalUpdateInfo(false);
          },
        }
      );
    }
  };

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  const itemsDelivery = [
    {
      title: "20.000 VND",
      description: "Dưới 2.000.000 VND",
    },
    {
      title: "10.000 VND",
      description: "Từ 2.000.000 VND đến dưới 5.000.000 VND",
    },
    {
      title: "Free ship",
      description: "Trên 5.000.000 VND",
    },
  ];

  return (
    <div className="order-page-container">
      <div className="order-page-wrapper">
        <h3>Giỏ hàng</h3>
        <div className="order-page-cover">
          <div className="order-page-wrapper-left">
            <div className="order-wrapper-header-delivery">
              <p>Phí giao hàng</p>
              {convertPrice(diliveryPriceMemo)}
              <StepsComponent
                items={itemsDelivery}
                current={
                  diliveryPriceMemo === 10000
                    ? 2
                    : diliveryPriceMemo === 20000
                    ? 1
                    : order.orderItemsSelected.length === 0
                    ? 0
                    : 3
                }
              />
            </div>
            <div className="wrapper-header-styte">
              <span style={{ display: "inline-block", width: "390px" }}>
                <Checkbox
                  className="order-product-checkbox"
                  onChange={handleOnchangeCheckAll}
                  checked={listChecked?.length === order?.orderItems?.length}
                ></Checkbox>
                <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
              </span>
              <div className="order-status-bar">
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <ButtonComponent icon={<DeleteOutlined />} danger onClick={handleRemoveAllOrder} />
              </div>
            </div>
            <div>
              {order?.orderItems?.map((order) => {
                return (
                  <div className="wrapper-order-items" key={order?.product}>
                    <div className="wrapper-order-image-name">
                      <Checkbox
                        className="order-product-checkbox"
                        onChange={onChange}
                        value={order?.product}
                        checked={listChecked.includes(order?.product)}
                      ></Checkbox>
                      <img src={order?.image} className="order-image-order-page" alt="orderimage" />
                      <div className="order-name-order-page">{order?.name}</div>
                    </div>
                    <div className="order-count-order-page">
                      <span>
                        <span className="order-count-span-order-page">{convertPrice(order?.price)}</span>
                      </span>
                      <div className="wrapper-count-order">
                        <ButtonComponent
                          onClick={() => handleChangeCount("decrease", order?.product, order?.amount === 1)}
                          icon={<MinusOutlined style={{ color: "#000", fontSize: "10px" }} />}
                          className="btn-minus-plus-order"
                        />

                        <InputNumber
                          style={{ width: "40px" }}
                          defaultValue={order?.amount}
                          value={order?.amount}
                          size="small"
                          min={1}
                          max={order?.countInstock}
                        />
                        <ButtonComponent
                          className="btn-minus-plus-order"
                          onClick={() =>
                            handleChangeCount(
                              "increase",
                              order?.product,
                              order?.amount === order.countInstock,
                              order?.amount === 1
                            )
                          }
                          icon={<PlusOutlined style={{ color: "#000", fontSize: "10px" }} />}
                        />
                      </div>
                      <span className="order-price-order-page">{convertPrice(order?.price * order?.amount)}</span>
                      <ButtonComponent
                        danger
                        onClick={() => handleDeleteOrder(order?.product)}
                        icon={<DeleteOutlined />}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="wrapper-right">
            <div style={{ width: "100%" }}>
              <div className="wrapper-info">
                <div>
                  <span>Địa chỉ: </span>
                  <span style={{ fontWeight: "bold" }}>{`${user?.address} `}, </span>
                  <span className="user-address-order-page">{`${user?.city || "Chưa có"}`}</span>
                  &nbsp; &nbsp;
                  <span onClick={handleChangeAddress} style={{ color: "#75C2F6", cursor: "pointer" }}>
                    Thay đổi
                  </span>
                </div>
              </div>
              <div className="wrapper-info">
                <div className="wrapper-info-provisional">
                  <span>Tạm tính</span>
                  <span>{convertPrice(priceMemo)}</span>
                </div>
                <div className="wrapper-info-discount">
                  <span>Giảm giá</span>
                  <span> - {convertPrice(priceDiscountMemo)}</span>
                </div>
                <div className="wrapper-info-delivery-charges">
                  <span>Phí giao hàng</span>
                  <span>{convertPrice(diliveryPriceMemo)}</span>
                </div>
              </div>
              <div className="wrapper-total">
                <span>Tổng tiền</span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ color: "rgb(254, 56, 52)", fontSize: "24px", fontWeight: "bold" }}>
                    {convertPrice(totalPriceMemo)}
                  </span>
                  <span style={{ color: "#000", fontSize: "11px" }}>(Đã bao gồm VAT nếu có)</span>
                </span>
              </div>
              <ButtonComponent
                className="add-card-btn"
                onClick={() => handleAddCard()}
                size={40}
                textButton="Mua hàng"
              />
            </div>
          </div>
        </div>
      </div>
      <ModalComponent
        forceRender
        title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancleUpdate}
        onOk={handleUpdateInforUser}
      >
        <Loading isLoading={isLoading}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            // onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input your name!" }]}>
              <InputComponent value={stateUserDetails["name"]} onChange={handleOnchangeDetails} name="name" />
            </Form.Item>
            <Form.Item label="City" name="city" rules={[{ required: true, message: "Please input your city!" }]}>
              <InputComponent value={stateUserDetails["city"]} onChange={handleOnchangeDetails} name="city" />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={[{ required: true, message: "Please input your  phone!" }]}>
              <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
            </Form.Item>

            <Form.Item
              label="Adress"
              name="address"
              rules={[{ required: true, message: "Please input your  address!" }]}
            >
              <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default OrderPage;
