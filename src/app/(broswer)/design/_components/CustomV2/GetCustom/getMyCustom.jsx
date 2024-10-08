import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  Card,
  Row,
  Col,
  Spin,
  notification,
  Button,
  Modal,
  Input,
  Tooltip,
} from "antd";
import http from "../../../config/http";
import { API_ENDPOINTS } from "../../../api/api-endpoint";
import {
  deleteCustomBag,
  useGetCustom,
  useMakeCustomPublicMutation,
  useUpdateCustomNameMutation,
} from "../../../api/custom";
import { useNavigate } from "react-router-dom";
import CartCustom from "../OrderCustom/CartCustom";
import styled from "styled-components";
import { format } from "date-fns";
import BreadcrumbWithBackButton from "../../../components/UI/Breadcrum";
import moment from "moment/moment";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import ConfirmButton from "../../../components/UI/ModalConfirm";

const CustomButton = styled(Button)`
  background-color: #cef53d;
  color: black;
  border: 1px solid black;
  border-radius: 8px; /* Adjust the value as needed for roundness */
  width: 76% !important;
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

const StyledModal = styled(Modal)`
  .ant-modal-title {
    color: #cef53d !important; /* Change the color to your desired color */
  }

  .ant-modal-close {
    color: rgb(0 0 0 / 45%) !important;
  }

  .ant-modal-content {
    background-color: #00000059 !important;
  }
`;

const CustomEditButton = styled(Button)`
  background-color: gray;
  color: white;
  border: 1px solid black;
  border-radius: 8px; /* Adjust the value as needed for roundness */
  width: 10% !important;
  font-size: 14px;

  &:hover {
    background-color: white !important;
    color: black;
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

const MyCustom = () => {
  const { data, isLoading, error, refetch } = useGetCustom();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [productName, setProductName] = useState("");
  const [customBagIdEdit, setCustomBagIdEdit] = useState(null);

  const [prices, setPrices] = useState(400000);
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItemsCus");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  console.log("dataCustom", data);

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
    navigate("/customize");
  };

  const handleOrderBag = (customBag) => {
    const newCartItem = {
      key: customBag._id,
      product: customBag.name || "Untitled Bag",
      image: customBag.url,
      color: customBag.color,
      name: customBag.name,
      quantity: 1,
      price: prices[customBag._id],
      subtotal: prices[customBag._id],
    };

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
              navigate("/my-cart-custom"); // hoặc router.push('/customize') nếu bạn đang sử dụng Next.js
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

  const handleRemoveItem = (key) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.key !== key));
  };

  const handleUpdateQuantity = (key, quantity) => {
    if (quantity <= 0) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.key === key
          ? { ...item, quantity, subtotal: item.price * quantity }
          : item
      )
    );
  };

  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  const { mutate: deleteBagMutation } = useMutation(deleteCustomBag, {
    onSuccess: () => {
      notification.success({
        message: "Success",
        description: "Custom bag deleted successfully.",
      });
      refetch(); // Refetch custom bags after deletion
    },
    onError: (error) => {
      console.error("Failed to delete custom bag:", error);
      notification.error({
        message: "Error",
        description: "Failed to delete custom bag. Please try again later.",
      });
    },
  });

  const handleDeleteBag = (customBagId) => {
    deleteBagMutation(customBagId);
  };

  const hideNameModal = () => {
    setModalVisible(false);
  };

  const onUpdateNameSuccess = () => {
    hideNameModal();
  };

  const onUpdateNameError = (error) => {
    console.error("Failed to update custom name:", error);
  };

  const { mutate: makeCustomPublicMutation } = useMakeCustomPublicMutation();

  const handleMakeCustomPublic = (customBagId) => {
    makeCustomPublicMutation(customBagId);
  };

  const { mutate: updateCustomNameMutation } = useUpdateCustomNameMutation(
    onUpdateNameSuccess,
    onUpdateNameError
  );

  const showNameModal = (id) => {
    setCustomBagIdEdit(id); // Set the customBagId
    setModalVisible(true);
  };

  const handleSaveProductName = () => {
    if (customBagIdEdit) {
      updateCustomNameMutation({
        customBagId: customBagIdEdit,
        name: productName,
      });
    }
  };

  return (
    <div style={{ padding: "20px" }} className="max-w-[1250px] mx-auto">
      <div className=" mb-8">
        <BreadcrumbWithBackButton currentTab={"My List Customize"} />
      </div>
      <div className="flex justify-between items-center mb-5 mx-10">
        <h1 className="uppercase font-semibold text-center text-xl my-4 text-black">
          My List Custom Bags
        </h1>
        <AddCusButton type="primary" onClick={handleCreateCustomBag}>
          Create Custom Bag
        </AddCusButton>
      </div>
      <hr className="my-2 mb-10" />
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Spin size="large" />
        </div>
      ) : data && data.length > 0 ? (
        <Row gutter={[16, 16]}>
          {data &&
            data.map((customBag) => {
              const formattedDate = moment(customBag.created_at).format(
                "MMMM Do YYYY, h:mm:ss a"
              );
              return (
                <Col key={customBag._id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    bordered={false}
                    className="hover:scale-105 hover:shadow-xl relative"
                  >
                    {customBag.public_status === 2 && (
                      <div className="absolute top-2 right-2 w-[68px] ">
                        <div className="relative">
                          <p
                            className="text-white font-bold text-[16px] transform amatic-sc-bold  -rotate-[55deg] origin-top-right absolute top-4 right-[36px]"
                            style={{ zIndex: 1 }}
                          >
                            PUBLIC
                          </p>
                          <svg
                            viewBox="0 0 1024 1024"
                            class="icon"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000000"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              stroke="#ffe5fd"
                              strokeWidth="47.104"
                            >
                              <path
                                d="M515.84 879.36c-7.68 11.52-23.04 15.36-35.84 7.68l-323.84-204.8c-11.52-7.68-15.36-23.04-7.68-35.84l300.8-451.84c7.68-11.52 60.16-23.04 60.16-23.04l236.8-62.72L768 122.88l44.8 240.64s12.8 52.48 5.12 64L515.84 879.36z"
                                fill="#ff78c5"
                              ></path>
                              <path
                                d="M494.08 903.68c-7.68 0-14.08-2.56-20.48-6.4l-323.84-204.8c-8.96-5.12-14.08-14.08-16.64-24.32-2.56-10.24 0-20.48 5.12-29.44l300.8-453.12c8.96-14.08 46.08-24.32 67.84-28.16L742.4 97.28c3.84-1.28 7.68 0 10.24 1.28l21.76 14.08c2.56 1.28 5.12 5.12 5.12 8.96l44.8 240.64c5.12 20.48 12.8 58.88 3.84 72.96L526.08 887.04c-5.12 8.96-14.08 14.08-24.32 16.64h-7.68z m249.6-780.8L512 184.32c-24.32 5.12-48.64 12.8-52.48 17.92L158.72 654.08c-1.28 2.56-2.56 6.4-1.28 8.96s2.56 6.4 5.12 7.68l323.84 204.8c2.56 1.28 6.4 2.56 10.24 1.28 3.84-1.28 6.4-2.56 7.68-5.12L806.4 419.84c1.28-5.12-1.28-30.72-6.4-53.76L755.2 130.56l-11.52-7.68z"
                                fill="#231f1f"
                              ></path>
                              <path
                                d="M682.24 224m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z"
                                fill="#f2e5ca"
                              ></path>
                              <path
                                d="M682.24 288c-35.84 0-64-28.16-64-64s28.16-64 64-64 64 28.16 64 64-29.44 64-64 64z m0-102.4c-21.76 0-38.4 16.64-38.4 38.4s16.64 38.4 38.4 38.4 38.4-16.64 38.4-38.4-17.92-38.4-38.4-38.4z"
                                fill="#231f1f"
                              ></path>
                            </g>
                            <g id="SVGRepo_iconCarrier">
                              <path
                                d="M515.84 879.36c-7.68 11.52-23.04 15.36-35.84 7.68l-323.84-204.8c-11.52-7.68-15.36-23.04-7.68-35.84l300.8-451.84c7.68-11.52 60.16-23.04 60.16-23.04l236.8-62.72L768 122.88l44.8 240.64s12.8 52.48 5.12 64L515.84 879.36z"
                                fill="#ff78c5"
                              ></path>
                              <path
                                d="M494.08 903.68c-7.68 0-14.08-2.56-20.48-6.4l-323.84-204.8c-8.96-5.12-14.08-14.08-16.64-24.32-2.56-10.24 0-20.48 5.12-29.44l300.8-453.12c8.96-14.08 46.08-24.32 67.84-28.16L742.4 97.28c3.84-1.28 7.68 0 10.24 1.28l21.76 14.08c2.56 1.28 5.12 5.12 5.12 8.96l44.8 240.64c5.12 20.48 12.8 58.88 3.84 72.96L526.08 887.04c-5.12 8.96-14.08 14.08-24.32 16.64h-7.68z m249.6-780.8L512 184.32c-24.32 5.12-48.64 12.8-52.48 17.92L158.72 654.08c-1.28 2.56-2.56 6.4-1.28 8.96s2.56 6.4 5.12 7.68l323.84 204.8c2.56 1.28 6.4 2.56 10.24 1.28 3.84-1.28 6.4-2.56 7.68-5.12L806.4 419.84c1.28-5.12-1.28-30.72-6.4-53.76L755.2 130.56l-11.52-7.68z"
                                fill="#231f1f"
                              ></path>
                              <path
                                d="M682.24 224m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z"
                                fill="#f2e5ca"
                              ></path>
                              <path
                                d="M682.24 288c-35.84 0-64-28.16-64-64s28.16-64 64-64 64 28.16 64 64-29.44 64-64 64z m0-102.4c-21.76 0-38.4 16.64-38.4 38.4s16.64 38.4 38.4 38.4 38.4-16.64 38.4-38.4-17.92-38.4-38.4-38.4z"
                                fill="#231f1f"
                              ></path>
                            </g>
                          </svg>
                        </div>
                      </div>
                    )}
                    {customBag.public_status === 1 && (
                      <div className="absolute top-2 right-2 w-[68px] ">
                        <div className="relative">
                          <p
                            className="text-black font-semibold text-[20px] transform amatic-sc-bold  -rotate-90 origin-top-right absolute top-4 right-[50px] "
                            style={{ zIndex: 1 }}
                          >
                            WAIT
                          </p>
                          <svg
                            fill="#cef53d"
                            height="65px"
                            width="65px"
                            version="1.1"
                            id="Icons"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="-1.92 -1.92 35.84 35.84"
                            stroke="#cef53d"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              stroke="#000000"
                              strokeWidth="2.496"
                            >
                              {" "}
                              <path d="M22,3H10C8.9,3,8,3.9,8,5v22.6c0,0.8,0.5,1.5,1.2,1.8c0.8,0.3,1.6,0.1,2.2-0.4l4.6-4.6l4.6,4.6c0.4,0.4,0.9,0.6,1.4,0.6 c0.3,0,0.5,0,0.8-0.2c0.8-0.3,1.2-1,1.2-1.8V5C24,3.9,23.1,3,22,3z"></path>{" "}
                            </g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path d="M22,3H10C8.9,3,8,3.9,8,5v22.6c0,0.8,0.5,1.5,1.2,1.8c0.8,0.3,1.6,0.1,2.2-0.4l4.6-4.6l4.6,4.6c0.4,0.4,0.9,0.6,1.4,0.6 c0.3,0,0.5,0,0.8-0.2c0.8-0.3,1.2-1,1.2-1.8V5C24,3.9,23.1,3,22,3z"></path>{" "}
                            </g>
                          </svg>
                        </div>
                      </div>
                    )}
                    <img
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
                      {" "}
                      {formattedDate}
                    </p>

                    <p className="font- text-gray-500 mt-4 text-xs">
                      #{customBag._id}
                    </p>
                    <div className="flex justify-between mr-1">
                      <p className="font-bold text-black-900  ">
                        Name: {customBag.name ? customBag.name : "No Name"}
                      </p>
                      <CustomEditButton
                        onClick={() => showNameModal(customBag._id)}
                      >
                        <EditOutlined className="pl-1" />{" "}
                      </CustomEditButton>
                    </div>

                    <div className="flex justify-between mr-2">
                      <div className="font-bold text-black-900 flex items-center">
                        <p className="mr-2">Color:</p>
                        {customBag.color ? (
                          <ColorSwatch
                            key={customBag.color}
                            color={`#${customBag.color}`}
                          />
                        ) : (
                          <p>No Color</p>
                        )}
                      </div>
                      <p className=" font-bold text-black-900 mr-2 ">
                        Quantity: 1
                      </p>
                    </div>
                    <p className="mb-2 text-lg font-bold">
                      Price:{" "}
                      <span className="text-[#FF5733]">
                        {prices[customBag._id]?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </p>

                    <CustomButton
                      type="primary"
                      onClick={() => handleOrderBag(customBag)}
                      className="mt-2"
                      block
                    >
                      Add to Cart
                    </CustomButton>

                    <CustomDelButton
                      onClick={() => handleDeleteBag(customBag._id)}
                      className="mt-4"
                      content="This action will delete the current custom."
                      title="Are you sure you want to delete this custom?"
                    >
                      <DeleteOutlined className="text-lg text-white mb-1" />
                    </CustomDelButton>
                    <button
                      onClick={() => handleMakeCustomPublic(customBag._id)}
                      disabled={customBag.public_status !== 0}
                      type="button"
                      className={`w-full text-white bg-gradient-to-r 
                        ${
                          customBag.public_status !== 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800"
                        }
                        font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
                    >
                      Public Custom
                    </button>
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
              onClick={() => navigate("/customize")}
            >
              Customize my bag
            </span>
          </a>
        </div>
      )}
      <StyledModal
        title="Enter Product Name"
        open={modalVisible}
        onOk={handleSaveProductName}
        onCancel={hideNameModal}
      >
        <Input
          placeholder="Change Bag Custom Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </StyledModal>
    </div>
  );
};

export default MyCustom;
