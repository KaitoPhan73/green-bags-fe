// BagSelected.js
import React, { useState } from "react";
import bags from "../../../../../utils/Bags";
import { Button, Tabs } from "antd";
import {
  CameraOutlined,
  FontSizeOutlined,
  SkinOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import DigitalPrinting from "./contentTabs/DigitalPrinting";
import ClipArtTab from "./contentTabs/ClipArtTab";
import InputTextTab from "./contentTabs/InputTextTab";
import DecorationTab from "./contentTabs/DecorationTab";
import BagImage from "./BagImage";
import CustomSteps from "../../UI/StepCartCustom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios"; // Thêm axios nếu bạn chưa có

const { TabPane } = Tabs;

const BagSelected = ({
  selectedBagId,
  onSwapProduct,
  selectedColor,
  onColorSelect,
  onImageSelect,
  selectedImage,
  stickers,
  setStickers,
  textItems,
  setTextItems,
  handleTextClick,
  currentText,
  setCurrentText,
  textStyle,
  setTextStyle,
  setImageURL,
  imageURL,
  handleExportImage,
}) => {
  const [isTextSubmitted, setIsTextSubmitted] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const selectedBag = bags.find((bag) => bag.id === selectedBagId);
  const handleImageSelect = (image) => {
    setStickers((prevStickers) => [
      ...prevStickers,
      {
        uniqueId: Date.now(), // Unique ID for the sticker
        image: image,
        x: 50,
        y: 50,
        width: 100,
        height: 100,
      },
    ]);
  };

  // const handleImageSelect = async (image) => {
  //   setSelectedImages((prev) => [...prev, image]); // Cập nhật hình ảnh đã chọn
  //   setStickers((prevStickers) => [
  //     ...prevStickers,
  //     {
  //       uniqueId: Date.now(), // Unique ID for the sticker
  //       image: image,
  //       x: 50,
  //       y: 50,
  //       width: 100,
  //       height: 100,
  //     },
  //   ]);
  //   // Gọi hàm upload hình ảnh lên Cloudinary
  //   await uploadImageToCloudinary(image);
  // };

  // const uploadImageToCloudinary = async (image) => {
  //   const formData = new FormData();
  //   formData.append("file", image);
  //   formData.append("upload_preset", "greenbag"); // Cloudinary preset

  //   try {
  //     const response = await axios.post(
  //       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
  //       formData
  //     );

  //     console.log(
  //       "Upload thành công. Dữ liệu nhận được từ Cloudinary:",
  //       response.data
  //     );
  //     // Bạn có thể làm gì đó với dữ liệu nhận được, ví dụ lưu URL vào state
  //     setImageURL(response.data.secure_url);
  //   } catch (error) {
  //     console.error("Tải lên ảnh thất bại:", error);
  //   }
  // };

  const handleRemoveSelectedImage = (uniqueId) => {
    setStickers((prevStickers) =>
      prevStickers.filter((sticker) => sticker.uniqueId !== uniqueId)
    );
  };

  const handleDrop = (item, delta) => {
    setStickers((prev) =>
      prev.map((sticker) =>
        sticker.uniqueId === item.uniqueId
          ? { ...sticker, x: delta.x, y: delta.y }
          : sticker
      )
    );
  };

  const handleResize = (item, size) => {
    setStickers((prev) =>
      prev.map((sticker) =>
        sticker.uniqueId === item.uniqueId ? { ...sticker, ...size } : sticker
      )
    );
  };

  const handleDeleteSticker = (uniqueId) => {
    setStickers((prev) =>
      prev.filter((sticker) => sticker.uniqueId !== uniqueId)
    );
  };

  const handleTextUpdate = (updatedText) => {
    setCurrentText(updatedText);
  };

  const handleTextStyleChange = (style) => {
    setTextStyle(style);
    setTextItems((prevTextItems) =>
      prevTextItems.map((item) =>
        item.text === currentText ? { ...item, ...style } : item
      )
    );
  };

  const handleRemoveText = (uniqueId) => {
    setTextItems((prevTextItems) =>
      prevTextItems.filter((item) => item.uniqueId !== uniqueId)
    );
  };

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
    setIsTextSubmitted(true);
    setCurrentText(text);
  };

  const tabItems = [
    // {
    //   key: "1",
    //   label: <ToolOutlined className="custom-tab-icon" />,
    //   children: <DigitalPrinting onColorSelect={onColorSelect} />,
    // },
    {
      key: "2",
      label: <CameraOutlined className="custom-tab-icon" />,
      children: <ClipArtTab onImageSelect={handleImageSelect} />,
    },
    {
      key: "3",
      label: <FontSizeOutlined className="custom-tab-icon" />,
      children: (
        <InputTextTab
          onTextSubmit={handleTextSubmit}
          onTextUpdate={handleTextUpdate}
          onTextStyleChange={handleTextStyleChange}
          text={currentText}
          textStyle={textStyle}
          isTextSubmitted={isTextSubmitted}
          setIsTextSubmitted={setIsTextSubmitted}
        />
      ),
    },
    // {
    //   key: "4",
    //   label: <SkinOutlined className="custom-tab-icon" />,
    //   children: <DecorationTab />,
    // },
  ];

  return (
    <>
      <div className="flex items-center text-white">
        <div className="w-1/2 flex justify-end mr-10">
          <DndProvider backend={HTML5Backend}>
            <BagImage
              imageUrl="/images/mautui.png"
              color={selectedColor}
              stickers={stickers}
              onDrop={handleDrop}
              onResize={handleResize}
              onDeleteSticker={handleDeleteSticker}
              textItems={textItems}
              onTextRemove={handleRemoveText}
              onTextClick={handleTextClick}
              imageURL={imageURL}
              setImageURL={setImageURL}
              handleExportImage={handleExportImage}
            />
          </DndProvider>
        </div>
        <div className="w-4/5 p-4 ">
          <Tabs
            defaultActiveKey="1"
            tabPosition="top"
            centered
            className="h-[750px] w-[630px] bg-gray-100"
            items={tabItems}
          />
          <Button
            onClick={onSwapProduct}
            className="mt-4 bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700 w-[200px]"
          >
            Đổi sản phẩm
          </Button>
        </div>
      </div>
    </>
  );
};

export default BagSelected;
