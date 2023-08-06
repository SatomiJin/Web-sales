import axios from "axios";

//tạo hóa đơn
export const createOrder = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_KEY}order/create`, data);
  return res.data;
};

//lấy hóa Đơn
export const getOrderDetails = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}order/get-order-by-id/${id}`);
  return res.data;
};

//hủy Đơn
export const cancelOrder = async (id, orderItems, userId) => {
  const data = { orderItems, orderId: id };
  const res = await axios.delete(`${process.env.REACT_APP_API_KEY}order/cancel-order/${userId}`, { data });

  return res.data;
};

//get detail
export const getDetailsOrders = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}order/get-details-order/${id}`);
  console.log("res", res);
  return res.data;
};
