import React, { useEffect, useState } from "react";
import { Table, Button, Radio, Row, Col, notification, Steps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderCustom.css";
import BreadcrumbWithBackButton from "../../../UI/Breadcrum";
import CustomSteps from "../../../UI/StepCartCustom";
import { EyeOutlined } from "@ant-design/icons";

const { Step } = Steps;

const CartCustom = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [countCart, setCountCart] = useState(0);

  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItemsCus");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const [total, setTotal] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItemsCus");
    return savedCartItems
      ? JSON.parse(savedCartItems)?.reduce(
          (sum, item) => sum + item.subtotal,
          0
        )
      : 0;
  });

  const [paymentMethod, setPaymentMethod] = useState("0");

  useEffect(() => {
    console.log("Loaded Cart Items from Local Storage:", cartItems);
  }, []);

  useEffect(() => {
    // console.log("Cart Items Updated:", cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    const updatedTotal = cartItems.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );
    setTotal(updatedTotal);

    const itemCount = cartItems.reduce(
      (count, item) => count + item.quantity,
      0
    );
    setCountCart(itemCount);
  }, [cartItems]);

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (text, record) => (
        <div className="flex items-center">
          <img
            src={record.image}
            alt={record.name}
            style={{
              width: "25%",
              height: "auto",
              maskImage: "url('/images/mautui.png')",
              WebkitMaskImage: "url('/images/mautui.png')",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
          <div>
            <p className="font-semibold">
              {record.name ? record.name : `#${record.key}`}
            </p>
            <Button
              type="link"
              className="text-gray-400 font-semibold"
              onClick={() => handleRemove(record.key)}
            >
              Remove
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <div className="flex items-center bg-[#b3f200] px-4 py-1 rounded-md border border-black">
          <button
            className="px-1"
            onClick={() =>
              handleUpdateQuantity(record.key, record.quantity - 1)
            }
          >
            -
          </button>
          <span className="mx-2">{record.quantity}</span>
          <button
            className="px-1"
            onClick={() =>
              handleUpdateQuantity(record.key, record.quantity + 1)
            }
          >
            +
          </button>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
    },
  ];

  const handleRemove = (key) => {
    const updatedCartItems = cartItems.filter((item) => item.key !== key);
    setCartItems(updatedCartItems);
    setTotal(0);
    localStorage.removeItem("cartItemsCus");
    notification.info({
      message: "Remove Item",
      description: "Item has been removed from the cart.",
    });
  };

  const handleUpdateQuantity = (key, quantity) => {
    if (quantity <= 0) return;
    const updatedCartItems = cartItems.map((item) =>
      item.key === key
        ? { ...item, quantity, subtotal: item.price * quantity }
        : item
    );
    setCartItems(updatedCartItems);
    notification.info({
      message: "Update Quantity",
      description: "Item quantity has been updated.",
    });
  };

  return (
    <>
      <div className="p-4 max-w-5xl mx-auto">
        <div className=" mb-2">
          <BreadcrumbWithBackButton currentTab={"Shopping Cart Custom Bag"} />
        </div>
        <div className="flex justify-end">
          <div className="text-sm  text-right font-medium w-[200px] cursor-pointer text-black border-black flex items-center bg-[#FF78C5] border border-black-600 rounded rounded-full hover:bg-[#cff53e]  py-1 ml-4 px-4 py-2">
            <EyeOutlined className="text-[20px] mr-2" />

            <span
              onClick={() => navigate("/my-custom")}
              className="text-sm fonyt-semibold"
            >
              My List Customize
            </span>
          </div>
        </div>
        <div className="page-name text-center pt-7">
          <h1 className="text-lg uppercase text-black">
            My Cart Order Custom Bag
          </h1>
        </div>
        <h1 className="text-2xl font-semibold mb-5 text-center"></h1>
        <CustomSteps current={0} />
        {/* <h1 className="text-xl font-semibold mb-10 ">
          Shopping Cart Custom Bag
        </h1> */}
        {cartItems && cartItems.length > 0 ? (
          <div className="flex">
            <div className="w-3/5 pr-4">
              <Table
                dataSource={cartItems}
                columns={columns}
                pagination={false}
              />
            </div>
            <div className="w-2/5 pl-4">
              <div className="p-4 rounded-md border border-black">
                <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
                <Radio.Group
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <Radio value="0" className="block mb-2">
                    Ship cod + 30.000vnd
                  </Radio>
                  <Radio value="1" className="block mb-2">
                    Banking
                  </Radio>
                  <Radio value="2" className="block mb-2">
                    MOMO
                  </Radio>
                </Radio.Group>
                <div className="mt-4">
                  <p className="text-lg font-semibold">
                    Total:{" "}
                    {total.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
                <Button
                  type="primary"
                  className="mt-4"
                  block
                  disabled={cartItems.length === 0}
                  onClick={() =>
                    navigate("/checkout-custom", {
                      state: { cartItems, total, paymentMethod },
                    })
                  }
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="font-semibold text-sm text-gray-600 text-center flex items-center justify-center">
              <img src="/images/iconsad.png" className="w-6 mr-4" />

              <span>
                OOPS! Currently the shopping cart is empty. Please return to the
                home page to purchase!
              </span>
            </p>
            <a class="inline-flex items-center px-4 py-2 mt-4 text-white bg-[#4848FF] border border-indigo-600 rounded rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-3 h-3 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>

              <span
                className="text-sm font-medium cursor-pointer"
                onClick={() => navigate("/my-custom")}
              >
                My List Customize
              </span>
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default CartCustom;
