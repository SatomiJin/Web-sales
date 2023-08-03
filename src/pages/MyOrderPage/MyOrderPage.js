import React from "react";
import { useQuery } from "@tanstack/react-query";

import * as OrderService from "../../Services/OrderService";
import "./MyOrderPage.css";
import Loading from "../../loading/Loading";
import { useSelector } from "react-redux";

const MyOrderPage = () => {
  const user = useSelector((state) => state.user);
  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderDetails(user?.id);
    return res.data;
  };
  const queryOrder = useQuery(["users"], fetchMyOrder);

  const { isLoading, data } = queryOrder;
  console.log("data", data);
  return (
    <Loading isLoading={isLoading}>
      <div className="my-order-page-container"></div>
    </Loading>
  );
};

export default MyOrderPage;
