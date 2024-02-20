import { request } from "../../../share/request";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await request("orderDetail/order_id", "POST", {
          order_id: orderId,
        });
        console.log("Response from backend:", res);
        if (res) {
          console.log("Clicked to view order details:", res);
          setOrderDetails(res.list);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        // Handle error
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return (
    <div>
      <h2>Order Details for Order ID {orderId}</h2>
      {orderDetails && (
        <ul>
          {orderDetails.map((detail) => (
            <li key={detail.id}>
              Product Name: {detail.PName}, Image: {detail.Image}, Quantity:{" "}
              {detail.quantity}, Price: {detail.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderDetail;
