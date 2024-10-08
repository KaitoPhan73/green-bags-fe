import { Button, Modal, Steps, Upload } from "antd";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BreadcrumbWithBackButton from "../../../components/UI/Breadcrum";
import CustomSteps from "../../../components/UI/StepCartCustom";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { useUploadImage } from "../../../api/transactionApi";

const { Step } = Steps;

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
  .anticon svg {
    color: white;
  }
  .ant-upload div div {
    color: white;
  }
`;

const OrderComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(location.state.cartItems || []);
  const [orderKey, setOrderKey] = useState(location.state.orderKey || []);
  const [total, setTotal] = useState(location.state?.total || 0);
  const [orderId, setOrderId] = useState(location.state?.orderId || "");
  const [paymentMethod, setPaymentMethod] = useState(
    location.state?.paymentMethod || "0"
  );
  console.log("paymentMethodComplete", location.state?.paymentMethod);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { mutate: uploadImage } = useUploadImage(); // Get the mutate function from the hook

  const handleUploadCancel = () => {
    setIsUploadModalVisible(false);
    setFileList([]); // Clear file list when modal is closed
  };

  const showUploadModal = () => {
    setIsUploadModalVisible(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleCompleteOrder = async () => {
    if (fileList.length === 0) {
      alert("Please upload an image.");
      return;
    }

    try {
      const file = fileList[0].originFileObj;
      console.log("Uploading file:", file); // Log the file
      await uploadImage({ id: orderId, file }); // Use the mutation to upload the image
      handleUploadCancel(); // Close modal on success
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image.");
    }
  };

  console.log("cartItemsCus", cartItems);
  console.log("orderKey", orderKey);
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className=" mb-8">
        <BreadcrumbWithBackButton currentTab={"Order Custom Bag Completed"} />
      </div>
      <h1 className="text-2xl font-semibold mb-10 text-center">
        My Cart Order Custom Bag
      </h1>
      <CustomSteps current={2} />
      {paymentMethod === 0 ? (
        <div className="flex item-center mx-auto justify-center">
          <div className="w-1/3">
            <div class="flex items-center justify-center text-center">
              <div>
                <div class="flex flex-col items-center space-y-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="text-green-600 w-28 h-28"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <h1 class="text-4xl text-center font-bold">Thank You !</h1>
                  <p>Your order have been received! Go to </p>
                  <p
                    className="text-blue underline"
                    onClick={() => navigate("/user/user-order")}
                  >
                    <button>My List Oder</button>
                  </p>
                  <div className="flex">
                    {cartItems.map((item) => (
                      <img
                        key={item?._id}
                        src={item?.image}
                        alt={item?.name}
                        style={{
                          width: "50%",
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
                    ))}
                  </div>
                  <div className="flex">
                    <a class="inline-flex items-center px-4 py-2 text-white bg-[#4848FF] border border-indigo-600 rounded rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
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
                        onClick={() => navigate("/")}
                      >
                        Home
                      </span>
                    </a>
                    <div className="text-sm font-medium cursor-pointer flex items-center bg-[#cff53e] border border-black-600 rounded rounded-full hover:bg-[#FF78C5] hover:text-white py-1 ml-4 px-4">
                      <img src="/images/iconCustom.png " className="w-8 mr-2" />
                      <span
                        onClick={() => navigate("/my-custom")}
                        className="text-sm fonyt-semibold"
                      >
                        My List Customize
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex item-center mx-auto justify-center  ">
            <div className="w-[50%]  flex flex-col text-center border-[1px] border-slate-400 rounded-xl p-8">
              <p className="text-lg ">Thank you!!!</p>
              <p className="text-2xl font-bold text-black">
                Your order have been received
              </p>
              {cartItems && (
                <div className="grid grid-cols-2 gap-3 my-3 mx-auto max-h-[500px] overflow-y-auto">
                  {cartItems.map((item, index) => (
                    <img
                      key={item?._id}
                      src={item?.image}
                      alt={item?.name}
                      style={{
                        width: "90%",
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
                  ))}
                </div>
              )}
            </div>
            <div className="w-[50%]  flex flex-col text-center border-[1px] border-slate-400 rounded-xl p-8 ml-3">
              <p className="text-2xl font-bold text-red-600">Notice!!!</p>
              <p className="text-sm ">
                Please make a tranfers for the following account with the
                content is order key:{" "}
                <strong className="text-xl">{orderKey}</strong> with total:{" "}
                <strong className="text-xl">
                  {total.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </strong>
              </p>

              <div className="flex flex-wrap my-3 item-center mx-auto">
                {paymentMethod && // Check if orderState is truthy
                  (paymentMethod === "1" ? (
                    <img src="/images/banking.jpg" alt="Banking" />
                  ) : paymentMethod === "2" ? (
                    <img src="/images/momo.jpg" alt="Momo" />
                  ) : null)}
              </div>
              <div className="flex justify-center my-6">
                <button
                  onClick={showUploadModal}
                  className="py-2 px-4    font-semibold bg-[#cff53e] rounded-md"
                >
                  Add Your Image Payment
                </button>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center items-center mt-4">
            <Link to="/my-custom" className="text-center">
              See My Order List
            </Link>
          </div>
        </div>
      )}
      <StyledModal
        title="Upload Images"
        open={isUploadModalVisible}
        onCancel={handleUploadCancel}
        footer={
          <>
            <Button onClick={handleUploadCancel}>Cancel</Button>
            <Button type="primary" onClick={handleCompleteOrder}>
              Complete Order
            </Button>
          </>
        }
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          beforeUpload={() => false} // Prevent automatic upload
          accept="image/*" // Restrict file types to images only
        >
          {fileList.length === 0 && (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </StyledModal>
    </div>
  );
};

export default OrderComplete;
