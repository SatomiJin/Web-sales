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
