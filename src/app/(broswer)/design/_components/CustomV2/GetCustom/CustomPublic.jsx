import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Card, Row, Col, Spin, notification, Button, Image } from "antd";

import CartCustom from "../OrderCustom/CartCustom";
import styled from "styled-components";
import BreadcrumbWithBackButton from "../../../UI/Breadcrum";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";
import ConfirmButton from "../../../UI/ModalConfirm";
import { useRouter } from "next/navigation";

const CustomButton = styled(Button)`
  background-color: #cef53d;
  color: black;
  border: 1px solid black;
  border-radius: 8px; /* Adjust the value as needed for roundness */
  width: 100% !important;
  margin: 13px 2px;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const CustomDelButton = styled(ConfirmButton)`
  background-color: #f1606f;
  color: black;
  border: 1px solid black;
  border-radius: 8px; /* Adjust the value as needed for roundness */
  width: 20% !important;
  margin: 13px 2px;

  &:hover {
    background-color: black !important;
    color: white;
  }
`;

const AddCusButton = styled(Button)`
  background-color: #ff78c5;
  color: black;
  border: 1px solid black;
  border-radius: 8px; /* Adjust the value as needed for roundness */

  &:hover {
    background-color: black;
    color: white;
  }
`;

const ColorSwatch = ({ color }) => (
  <div
    className="w-3 h-3 rounded cursor-pointer"
    style={{ backgroundColor: color }}
  ></div>
);

const ListCustomPublic = () => {
  const router = useRouter(); // Initialize the router
  const [prices, setPrices] = useState(400000);
  const [limit, setLimit] = useState(8);

  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItemsCus");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  console.log("cartItemsCus", cartItems);

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Error",
        description: "Failed to fetch custom bags. Please try again later.",
      });
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      const initialPrices = data.reduce((acc, customBag) => {
        acc[customBag._id] = customBag.price || 400000; // Default price if not specified
        return acc;
      }, {});
      setPrices(initialPrices);
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem("cartItemsCus", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleCreateCustomBag = () => {
    router.push("/customize"); // Use router.push for navigation
  };

  const handleOrderBag = (customBag) => {
    const newCartItem = {
      key: customBag._id,
      product: customBag.name || "Untitled Bag",
      image: customBag.url,
      quantity: 1,
      color: customBag.color,
      name: customBag.name,
      price: prices[customBag._id],
      subtotal: prices[customBag._id],
    };
    console.log("customBag", customBag);

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.key === customBag._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.key === customBag._id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1),
              }
            : item
        );
      }
      return [...prevItems, newCartItem];
    });

    notification.success({
      message: "Success",
      description: (
        <span>
          Item {customBag.name} has been added to your custom cart.{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // router.push('/customize'); // Use router.push for navigation
            }}
            className="text-blue-500 underline"
          >
            View My Cart Custom
          </a>{" "}
          to checkout.
        </span>
      ),
    });
  };

  const handleLoadMore = () => {
    // Increase the limit by 3 each time the user wants to load more
    setLimit(limit + 8);
  };

  return (
    <div style={{ padding: "20px" }} className="max-w-[1250px] mx-auto">
      <div className="flex justify-between items-center mb-5 mx-10">
        <h1 className="amatic-sc-bold text-[40px] my-10 text-black text-center">
          CUSTOMIZE AS YOU LIKE{" "}
        </h1>
      </div>
      <hr className="my-2 mb-10" />
      {isLoading ? (
        <Spin size="large" />
      ) : data && data.length > 0 ? (
        <Row gutter={[16, 16]}>
          {data &&
            data.slice(0, limit).map((customBag) => {
              const formattedDate = moment(customBag.created_at).format(
                "MMMM Do YYYY, h:mm:ss a"
              );
              return (
                <Col key={customBag._id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    bordered={false}
                    className="hover:scale-105 hover:shadow-xl"
                  >
                    <Image
                      src={customBag.url}
                      alt={customBag.name || "Chưa có tên"}
                      style={{
                        width: "100%",
                        height: "auto",
                        maskImage:
                          "url('/images/mautui.png')",
                        WebkitMaskImage:
                          "url('/images/mautui.png')",
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                      }}
                    />
                    <p className="text-gray-600 text-xs mt-6">
                      {/* {formattedDate} */}
                    </p>
                    <p className=" text-black-900 font-semibold ">
                      {customBag.name ? customBag.name : "No Name"}
                    </p>

                    <div className="flex justify-between mr-2">
                      <div className=" flex items-center">
                        <p
                          className="mr-2"
                          style={{ color: `#${customBag.color}` }}
                        >
                          Color:
                        </p>
                        {customBag.color ? (
                          <ColorSwatch
                            key={customBag.color}
                            color={`#${customBag.color}`}
                          />
                        ) : (
                          <p>No Color</p>
                        )}
                      </div>
                      <p className="text-black-900 mr-2 ">Quantity: 1</p>
                    </div>
                    <p className="mt-2 mr-2 text-lg text-right">
                      {prices[customBag._id]?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>

                    <CustomButton
                      type="primary"
                      onClick={() => handleOrderBag(customBag)}
                      className="mt-2"
                      block
                    >
                      Add to Cart
                    </CustomButton>
                  </Card>
                </Col>
              );
            })}
        </Row>
      ) : (
        <div className="text-center">
          <p className="font-semibold text-sm text-gray-600 text-center flex items-center justify-center">
            <img src="/images/iconsad.png" className="w-6 mr-4" />

            <span>
              OOPS! Currently the shopping cart is empty. Please return to the
              home page to purchase!
            </span>
          </p>
          <a className="inline-flex items-center px-4 py-2 mt-4 text-white bg-[#4848FF] border border-indigo-600 rounded rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-3-3v6"
              />
            </svg>
            <span>Back to home</span>
          </a>
        </div>
      )}
      {data && data.length > limit && (
        <div className="text-center mt-8">
          <CustomButton onClick={handleLoadMore}>Load More</CustomButton>
        </div>
      )}
    </div>
  );
};

export default ListCustomPublic;
