import axios from "axios";

export const getAllProduct = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}product/detail-all-product`);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_KEY}product/create-product`, data);
  return res.data;
};

export const getDetailProduct = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}product/detail-product/${id}`);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axios.put(`${process.env.REACT_APP_API_KEY}product/update-product/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${process.env.REACT_APP_API_KEY}product/delete-product/${id}`);
  return res;
};
