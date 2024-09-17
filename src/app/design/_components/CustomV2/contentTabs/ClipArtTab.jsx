// src/components/contentTabs/ClipArtTab.js
import React, { useState } from "react";
import { Modal, Input, Row, Col, Image, Button, Upload } from "antd";
import items from "../../../../../utils/Items";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import styled from "styled-components";

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

const ClipArtTab = ({ onImageSelect }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [isMyImagesModalVisible, setIsMyImagesModalVisible] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

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

  const handleUploadChange = ({ fileList }) => {
    setUploadedImages(
      fileList.map((file) => URL.createObjectURL(file.originFileObj))
    );
  };

  return (
    <div>
      <div className="m-4 ml-10">
        <h2 className="font-bold text-lg">ADD AN IMAGE TO YOUR DESIGN</h2>
        <p className="text-gray-600 text-[12px]">
          Browse Our Clip Art Catalog Or Upload Your Own Image.
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
            <p className="ml-4">Browse Thousands Of Images</p>
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
            <p className="ml-4">Upload Your Own Pictures Or Logo</p>
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
            <p className="ml-4">Choose From Your Saved Images</p>
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
        footer={null}
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
        title="My Images"
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
        title="Clip Art"
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
