// src/components/contentTabs/ClipArtTab.js
import React, { useState } from "react";
import { Modal, Input, Row, Col, Image, Button, Upload, message } from "antd"; // Import message here
import items from "../../../../../../utils/Items";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import axios from "axios"; // Don't forget to import axios if it's not already imported

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

const ClipArtTab = ({ onImageSelect, selectedImage }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [isMyImagesModalVisible, setIsMyImagesModalVisible] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [tempUploadFiles, setTempUploadFiles] = useState([]); // New state for temporary files

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleImageSelect = (image) => {
    onImageSelect(image);
    setIsModalVisible(false);
  };

  const handleSelectImage = (image) => {
    onImageSelect(image);
    setIsMyImagesModalVisible(false);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showUploadModal = () => {
    setIsUploadModalVisible(true);
  };

  const showMyImagesModal = () => {
    setIsMyImagesModalVisible(true);
  };

  const handleUploadCancel = () => {
    setIsUploadModalVisible(false);
  };

  const handleMyImagesCancel = () => {
    setIsMyImagesModalVisible(false);
  };

  // Change to store files without uploading immediately
  const handleUploadChange = ({ fileList }) => {
    setTempUploadFiles(fileList.map((file) => file.originFileObj)); // Store files temporarily
    setUploadedImages(
      fileList.map((file) => URL.createObjectURL(file.originFileObj))
    );
  };

  // Function to upload selected files when the Select button is clicked
  // const handleUploadSelect = async () => {
  //   const uploadedImageUrls = [];

  //   for (const file of tempUploadFiles) {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("upload_preset", "greenbag"); // Replace with your Cloudinary upload preset

  //     try {
  //       const response = await axios.post(
  //         `https://api.cloudinary.com/v1_1/dsmdqayv6/image/upload`, // Replace with your Cloudinary cloud name
  //         formData
  //       );
  //       uploadedImageUrls.push(response.data.secure_url);
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //       message.error("Failed to upload image. Please try again.");
  //     }
  //   }

  //   setUploadedImages(uploadedImageUrls);
  //   setTempUploadFiles([]); // Clear temporary files after upload
  //   setIsUploadModalVisible(false); // Close the upload modal after upload
  // };

  // const handleUploadSelect = async () => {
  //   const uploadedImageUrls = [];

  //   for (const file of tempUploadFiles) {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("upload_preset", "greenbag"); // Replace with your Cloudinary upload preset

  //     try {
  //       const response = await axios.post(
  //         `https://api.cloudinary.com/v1_1/dsmdqayv6/image/upload`, // Replace with your Cloudinary cloud name
  //         formData
  //       );
  //       uploadedImageUrls.push(response.data.secure_url);
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //       message.error("Failed to upload image. Please try again.");
  //     }
  //   }

  //   // Save uploaded image URLs to localStorage
  //   if (uploadedImageUrls.length > 0) {
  //     const existingImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]');
  //     const updatedImages = [...existingImages, ...uploadedImageUrls];
  //     localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
  //   }

  //   setUploadedImages(uploadedImageUrls);
  //   setTempUploadFiles([]); // Clear temporary files after upload
  //   setIsUploadModalVisible(false); // Close the upload modal after upload
  // };

  const handleUploadSelect = async () => {
    const uploadedImageUrls = [];

    for (const file of tempUploadFiles) {
      const reader = new FileReader();

      // Convert file to base64 string
      reader.onload = () => {
        const base64String = reader.result;

        // Push the base64 string to the array
        if (typeof base64String === "string") {
          uploadedImageUrls.push(base64String);
        }

        // Save base64 images to localStorage after processing all files
        if (uploadedImageUrls.length === tempUploadFiles.length) {
          const existingImages = JSON.parse(
            localStorage.getItem("uploadedImages") || "[]"
          );
          const updatedImages = [...existingImages, ...uploadedImageUrls];
          localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));

          setUploadedImages(uploadedImageUrls); // Update state with uploaded images
          setTempUploadFiles([]); // Clear temporary files after upload
          setIsUploadModalVisible(false); // Close the upload modal after upload
        }
      };

      reader.onerror = () => {
        console.error("Error reading file:", file.name);
        message.error("Failed to read file. Please try again.");
      };

      // Read the file as a base64 string
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="m-4 ml-10">
        <h2 className="font-bold text-lg">Thêm một bức ảnh nào</h2>
        <p className="text-gray-600 text-[12px]">
          Duyệt qua Danh mục Clip Art của chúng tôi hoặc tải lên hình ảnh của
          riêng bạn.
        </p>
      </div>
      <div className="mt-10 mx-6">
        <div className=" flex justify-between items-center border-b py-4 ">
          <div>
            <Button
              type="link"
              onClick={showModal}
              className="text-lg font-semibold"
            >
              CLIP ART
            </Button>
            <p className="ml-4">Ngàn bức tranh</p>
          </div>
          <p className="mr-6" onClick={showModal}>
            <RightOutlined />
          </p>
        </div>
        <div className="flex justify-between items-center border-b py-4">
          <div>
            <Button
              type="link"
              onClick={showUploadModal}
              className="text-lg font-semibold"
            >
              UPLOAD IMAGES
            </Button>
            <p className="ml-4">Tải ảnh của bạn</p>
          </div>
          <p className="mr-6" onClick={showUploadModal}>
            <RightOutlined />
          </p>
        </div>
        <div className="py-4 flex justify-between items-center">
          <div>
            <Button
              type="link"
              onClick={showMyImagesModal}
              className="text-lg font-semibold"
            >
              MY IMAGES
            </Button>
            <p className="ml-4">Chọn ảnh của bạn</p>
          </div>
          <p className="mr-6" onClick={showMyImagesModal}>
            <RightOutlined />
          </p>
        </div>
      </div>
      <div className="text-gray-400 mt-4 text-[9px] mt-16 w-4/5 m-4 ml-10">
        <p>
          A Tote Bag Is A Large, Typically Unlined Bag With Two Handles That Are
          Attached To The Sides Of The Bag. Tote Bags Are Typically Made From
          Durable Materials Such As Canvas, Cotton, Or Denim, And They Are Often
          Used For Carrying Groceries, Books, Or Other Items. They Are Also
          Popular As A Fashion Accessory.
        </p>
      </div>

      <StyledModal
        title="Upload Images"
        open={isUploadModalVisible}
        onCancel={handleUploadCancel}
        footer={
          <Button onClick={handleUploadSelect}>Chấp Nhận Các Ảnh</Button> // Add Select button for upload
        }
      >
        <Upload
          listType="picture-card"
          multiple={true}
          onChange={handleUploadChange}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </StyledModal>

      <StyledModal
        title="Ảnh của tôi"
        open={isMyImagesModalVisible}
        onCancel={handleMyImagesCancel}
        footer={null}
      >
        <Row gutter={[16, 16]}>
          {uploadedImages.map((image, index) => (
            <Col key={index} span={8}>
              <div className="relative">
                <Image
                  src={image}
                  alt={`uploaded-img-${index}`}
                  width={100}
                  height={100}
                  className="cursor-pointer"
                />
                <Button
                  className="absolute bottom-0 left-0"
                  onClick={() => handleSelectImage(image)}
                >
                  Select
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </StyledModal>

      <StyledModal
        title="Vẽ ảnh"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
          {filteredItems.map((item) => (
            <Col p={4} key={item.id}>
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="cursor-pointer"
                />
                <Button
                  className="absolute bottom-0 left-0"
                  onClick={() => handleImageSelect(item.image)}
                >
                  Select
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </StyledModal>
    </div>
  );
};

export default ClipArtTab;
