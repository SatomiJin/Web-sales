import axios from "axios";

export const getAllProduct = async (search, limit) => {
  if (search?.length > 0) {
    const res = await axios.get(
      `${process.env.REACT_APP_API_KEY}product/detail-all-product?filter=name&filter=${search}&limit=${limit}`
    );
    return res.data;
  } else {
    const res = await axios.get(`${process.env.REACT_APP_API_KEY}product/detail-all-product`);
    return res.data;
  }
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

export const deleteMutipleProduct = async (ids) => {
  const res = await axios.post(`${process.env.REACT_APP_API_KEY}product/delete-multiple-product`, ids);
  return res;
};

export const getAllTypeProduct = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}product/get-all-type`);
  return res.data;
};