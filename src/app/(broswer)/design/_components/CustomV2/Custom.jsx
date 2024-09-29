import React, { useEffect, useRef, useState } from "react";
import BagSlider from "./BagSlider";
import BagSelected from "./BagSelector";
import CustomBagSteps from "../../UI/StepCustomBag";
import html2canvas from "html2canvas";
import Compressor from "compressorjs";
import { useRouter } from "next/navigation";
import { Button, Input, Modal } from "antd";
import {
  usePostCustomBagMutation,
  useUpdateCustomNameMutation,
} from "../../../../../api/Custom/custom";

const CustomBagV2 = () => {
  const [step, setStep] = useState(1);
  const [selectedBagId, setSelectedBagId] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [stickers, setStickers] = useState([]);
  const [textItems, setTextItems] = useState([]);
  const [compressedBlob, setCompressedBlob] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [productName, setProductName] = useState("");
  const [bagId, setBagId] = useState(null);
  const postCalled = useRef(false);

  const [currentText, setCurrentText] = useState("");
  const [textStyle, setTextStyle] = useState({
    fontFamily: "Arial",
    color: "#000000",
    stroke: "#000000",
    shadow: "#000000",
    fontSize: 16,
    letterSpacing: 1,
    lineHeight: 1.2,
    rotate: 0,
    textAlign: "left",
  });

  const navigate = useRouter();
  const steps = [
    "Chọn túi của bạn",
    "Thiết kế túi của bạn",
    "Đánh giá & Đăt hàng",
  ];

  const { mutate: postCustomBagMutation } = usePostCustomBagMutation(
    (data) => {
      setBagId(data._id);
      showNameModal();
    },
    (error) => {
      console.error("Failed to post custom bag:", error);
    }
  );

  const { mutate: updateCustomNameMutation } = useUpdateCustomNameMutation(
    () => {
      setModalVisible(false);
    },
    (error) => {
      console.error("Failed to update custom name:", error);
    }
  );

  const showNameModal = () => setModalVisible(true);
  const hideNameModal = () => setModalVisible(false);

  const handleSaveProductName = () => {
    updateCustomNameMutation({ customBagId: bagId, name: productName });
  };

  const handlePostCustomBag = () => {
    if (compressedBlob) {
      const file = new File([compressedBlob], "custom-bag.jpg", {
        type: "image/jpeg",
      });
      const formData = new FormData();
      formData.append("image", file);
      postCustomBagMutation({ input: formData, selectedColor });
    } else {
      console.error("Image Blob is missing");
    }
  };

  useEffect(() => {
    if (compressedBlob && !postCalled.current) {
      postCalled.current = true;
      handlePostCustomBag();
    }
  }, [compressedBlob]);

  const handleBagSelect = (bagId) => {
    setSelectedBagId(bagId);
    setStep(2);
  };

  const handleSwapProduct = () => {
    setStep(1);
    setSelectedBagId(null);
  };

  const handleColorSelect = (color) => setSelectedColor(color);

  const handleTextSubmit = (text) => {
    setTextItems((prevTextItems) => [
      ...prevTextItems,
      {
        uniqueId: Date.now(),
        text: text,
        ...textStyle,
        x: 50,
        y: 50,
        width: 150,
        height: 50,
      },
    ]);
    setCurrentText(text);
  };

  const handleTextClick = (textItem) => {
    setCurrentText(textItem.text);
    setTextStyle({
      fontFamily: textItem.fontFamily,
      color: textItem.color,
      stroke: textItem.stroke,
      shadow: textItem.shadow,
      fontSize: textItem.fontSize,
      letterSpacing: textItem.letterSpacing,
      lineHeight: textItem.lineHeight,
      rotate: textItem.rotate,
      textAlign: textItem.textAlign,
    });
    setStep(3);
  };

  const handleExportImage = async () => {
    const originalCanvas = await html2canvas(
      document.querySelector("#bagCanvas")
    );

    const resizedCanvas = document.createElement("canvas");
    const ctx = resizedCanvas.getContext("2d");

    const MAX_SIZE = 800;
    let { width, height } = originalCanvas;

    if (width > height) {
      if (width > MAX_SIZE) {
        height *= MAX_SIZE / width;
        width = MAX_SIZE;
      }
    } else {
      if (height > MAX_SIZE) {
        width *= MAX_SIZE / height;
        height = MAX_SIZE;
      }
    }

    resizedCanvas.width = width;
    resizedCanvas.height = height;
    ctx.drawImage(originalCanvas, 0, 0, width, height);

    resizedCanvas.toBlob(
      (blob) => {
        new Compressor(blob, {
          quality: 0.6,
          success(compressedBlob) {
            setCompressedBlob(compressedBlob);
          },
          error(err) {
            console.error(err.message);
          },
        });
      },
      "image/jpeg",
      0.6
    );
    setStep(3);
  };
  console.log("bloll", compressedBlob);

  const handleViewOrder = () => navigate.push("/my-custom");

  return (
    <div>
      <h1 className="amatic-sc-bold text-[40px] my-10  text-center">
        Tạo ra chiếc túi của bạn!
      </h1>
      <div className="p-4 max-w-7xl mx-auto">
        <CustomBagSteps current={step - 1} steps={steps} />
      </div>
      {step === 1 && <BagSlider onBagSelect={handleBagSelect} />}
      {step === 2 && (
        <BagSelected
          selectedBagId={selectedBagId}
          onSwapProduct={handleSwapProduct}
          selectedColor={selectedColor}
          onColorSelect={handleColorSelect}
          selectedImage={selectedImage}
          setStickers={setStickers}
          stickers={stickers}
          textItems={textItems}
          setTextItems={setTextItems}
          handleTextClick={handleTextClick}
          currentText={currentText}
          setCurrentText={setCurrentText}
          textStyle={textStyle}
          setTextStyle={setTextStyle}
          onTextSubmit={handleTextSubmit}
          setImageURL={setImageURL}
          imageURL={imageURL}
          handleExportImage={handleExportImage}
          setCompressedBlob={setCompressedBlob}
        />
      )}
      {step === 3 && (
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-green-600 w-28 h-28"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-4xl font-bold mt-4">Yay!</h1>
            <p>Ý tưởng thiết kế sản phẩm đã hoàn tất!</p>
            <div className="flex my-10">
              <a
                className="inline-flex items-center px-4 py-2 text-white bg-[#4848FF] border border-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring"
                onClick={() => setStep(1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                <span className="text-sm font-medium">Continue Customize</span>
              </a>
              <div
                className="text-sm font-medium cursor-pointer flex items-center bg-[#cff53e] border border-black-600 rounded-full hover:bg-[#FF78C5] hover:text-white py-1 ml-4 px-4"
                onClick={handleViewOrder}
              >
                <img
                  src="/images/iconCustom.png"
                  className="mr-2 w-5 h-5"
                  alt="Custom Icon"
                />
                <span>View Your Order</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal
        title="Name Your Custom Bag"
        visible={modalVisible}
        onOk={handleSaveProductName}
        onCancel={hideNameModal}
      >
        <Input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default CustomBagV2;
