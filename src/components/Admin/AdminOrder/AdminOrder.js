import { Button, Col, Modal, Row, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { InfoCircleOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { useSelector } from "react-redux";

import TableComponent from "../../Table/TableComponent";
import InputComponent from "../../InputComponent/InputComponent";
import * as OrderService from "../../../Services/OrderService";
import { convertPrice } from "../../../utils";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import "./AdminOrder.css";
import Loading from "../../../loading/Loading";
import PieChartComponent from "./PieChart/PieChartComponent";

function AdminOrder() {
  const user = useSelector((state) => state.user);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isOpenChart, setIsOpenChart] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  //thông tin hóa Đơn
  const [stateOrder, setStateOrder] = useState({
    createdAt: "",
    isDelivered: "",
    isPaid: "",
    itemsPrice: "",
    orderItems: [],
    paymentMethod: "",
    shippingAddress: {},
    shippingPrice: 0,
    totalPrice: 0,
  });
  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder();
    return res;
  };
  const fetchDetailOrder = async (rowSelected) => {
    const res = await OrderService.getDetailsOrders(rowSelected);
    console.log("res", res);
    if (res) {
      setStateOrder({
        createdAt: res.data.createdAt,
        isDelivered: res.data.isDelivered ? "Đã giao" : "Đang giao",
        isPaid: res.data.isPaid ? "Đã thanh toán" : "Chưa thanh toán",
        itemsPrice: convertPrice(res.data.itemsPrice),
        orderItems: res.data.orderItems,
        paymentMethod:
          res.data.paymentMethod === "later_money" ? "Thanh toán khi nhận hàng" : "Thanh toán online với Paypal",
        shippingAddress: res.data.shippingAddress,
        shippingPrice: res.data.shippingPrice,
        totalPrice: res.data.totalPrice,
      });
    }
  };
  //
  const handleOpenModal = () => {
    setIsOpenModal(true);
    setIsLoadingModal(true);
    setIsLoadingModal(false);
  };
  //thao tác
  const renderUserActions = () => {
    return (
      <div className="actions-order-admin-page">
        <ButtonComponent type="default" icon={<InfoCircleOutlined />} onClick={handleOpenModal} />
        &nbsp;
      </div>
    );
  };
  //close detail
  const handleCloseModal = () => {
    setIsOpenModal(false);
    setStateOrder({
      createdAt: "",
      isDelivered: "",
      isPaid: "",
      itemsPrice: "",
      orderItems: [],
      paymentMethod: "",
      shippingAddress: {},
      shippingPrice: 0,
      totalPrice: 0,
    });
  };

  //useEffect
  useEffect(() => {
    if (rowSelected) {
      fetchDetailOrder(rowSelected);
    }
  }, [rowSelected]);

  //đóng thông tin chi tiết
  const handleCancel = () => {
    handleCloseModal();
    setIsOpenModal(false);
    setRowSelected("");
  };
  const handleCancelChart = () => {
    setIsOpenChart(false);
  };
  //dữ liệu để đổ vào bảng

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          //ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          //onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            //onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            //onClick={() => clearFilters && handleReset(clearFilters)}
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
    // onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    // onFilterDropdownOpenChange: (visible) => {
    //   if (visible) {
    //     setTimeout(() => searchInput.current?.select(), 100);
    //   }
    // },
  });

  const columns = [
    {
      title: "Người mua",
      dataIndex: "username",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("username"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Địa chỉ nhận",
      dataIndex: "address",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "itemsPrice",
    },
    {
      title: "Tổng thanh toán",
      dataIndex: "totalPrice",
    },
    {
      title: "Giao hàng",
      dataIndex: "isDelivered",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: renderUserActions,
    },
  ];
  const queryOrders = useQuery(["orders"], getAllOrder);
  const { isLoading: isLoadingOrder, data: orders } = queryOrders;
  const dataOrder =
    orders?.data?.length &&
    orders?.data?.map((order) => {
      return {
        ...order,
        key: order._id,
        username: order.shippingAddress.fullName,
        phone: order.shippingAddress.phone,
        address: order.shippingAddress.address,
        isPaid: order.isPaid ? "Đã thanh toán" : "Chưa thanh toán",
        totalPrice: convertPrice(order.totalPrice),
        itemsPrice: convertPrice(order.itemsPrice),
        isDelivered: order.isDelivered ? "Đã giao" : "Đang giao",
        paymentMethod: order.paymentMethod === "later_money" ? "Thanh toán khi nhận hàng" : "Paypal",
      };
    });
  return (
    <Loading isLoading={isLoadingOrder}>
      <div className="product-management-admin-container">
        <h1>Quản lý hóa đơn</h1>
        <ButtonComponent className="chart-order-buy" textButton="Biểu đồ" onClick={() => setIsOpenChart(true)} />
        <div className="table-content-management-product">
          <TableComponent
            columns={columns}
            data={dataOrder}
            isLoading={isLoadingOrder}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  setRowSelected(record._id);
                },
              };
            }}
          />
        </div>
        <div className="detail-order-order-admin">
          <Modal width={800} title="Thông tin đơn hàng" open={isOpenModal} onOk={handleCancel} onCancel={handleCancel}>
            <Loading isLoading={isLoadingModal}>
              <div className="order-detail-order-admin">
                <Row>
                  <Col span={14} className="order-detail-order-admin-left">
                    <h3>Thông tin mua hàng</h3>
                    Ngày mua:{" "}
                    <b>{stateOrder.createdAt && format(new Date(stateOrder.createdAt), "dd/MM/yyyy HH:mm")}</b>
                    <br />
                    TÌnh trạng giao: <b>{stateOrder.isDelivered}</b>
                    <br />
                    Thanh toán: <b>{stateOrder.isPaid}</b>
                    <br />
                    Giá sản phẩm: <b>{stateOrder.itemsPrice}</b>
                    <br />
                    Hình thức thanh toán: <b>{stateOrder.paymentMethod}</b>
                    <br />
                    Phí giao hàng: <b>{stateOrder.shippingPrice}</b>
                    <br />
                    <b>Các sản phẩm đã mua:</b>
                    <div className="detail-product-in-order">
                      {stateOrder.orderItems.map((orderItem) => (
                        <div key={orderItem._id} className="product-detail-info">
                          Tên sản phẩm: <b>{orderItem.name}</b>
                          <br />
                          Giá bán: <b>{orderItem.price}</b>
                          <br />
                          <img className="image-product-buy-order-admin" src={orderItem.image} alt="productBuy" />
                        </div>
                      ))}
                    </div>
                    Tổng thanh toán: <b style={{ color: "rgb(255, 57, 69)" }}>{convertPrice(stateOrder.totalPrice)}</b>
                  </Col>
                  <Col span={10} className="order-detail-order-admin-right">
                    <h3>Thông tin người mua:</h3>
                    <div className="info-user-order-admin">
                      Tên người mua: <b>{stateOrder.shippingAddress.fullName}</b>
                      <br />
                      Số điện thoại: <b>{stateOrder.shippingAddress.phone}</b>
                      <br />
                      Thành phố: <b>{stateOrder.shippingAddress.city}</b>
                      <br />
                      Địa chỉ nhận: <b>{stateOrder.shippingAddress.address}</b>
                    </div>
                  </Col>
                </Row>
              </div>
            </Loading>
          </Modal>
        </div>
        <div className="chart--order-admin">
          <Modal title="Biểu đồ mua hàng" open={isOpenChart} onOk={handleCancelChart} onCancel={handleCancelChart}>
            <PieChartComponent />
          </Modal>
        </div>
      </div>
    </Loading>
  );
}

export default AdminOrder;
