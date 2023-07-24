import axios from "axios";

export const getAllProduct = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}product/detail-all-product`);
  return res.data;
};
