import axios from "axios";

export const getAllProduct = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}product/detail-all-product`);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_KEY}product/create-product`, data);
  return res.data;
};
