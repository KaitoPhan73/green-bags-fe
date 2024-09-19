import { useState, useEffect } from "react";

const useCustomBagOrderState = () => {
  const [orderState, setOrderState] = useState({
    payment_type: 0,
    custom_bag_details: [],
  });
  const [subtotal, setSubtotal] = useState(0);

  const addPaymentType = (paymentType) => {
    setOrderState((prevState) => ({
      ...prevState,
      payment_type: paymentType,
    }));
  };

  const addNewOrderDetails = (orderDetails) => {
    setOrderState((prevState) => ({
      ...prevState,
      custom_bag_details: orderDetails,
    }));
  };

  useEffect(() => {
    const subtotal = orderState.custom_bag_details?.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(subtotal);
  }, [orderState.custom_bag_details]);

  return {
    orderState,
    subtotal,
    addPaymentType,
    addNewOrderDetails,
  };
};

export default useCustomBagOrderState;
