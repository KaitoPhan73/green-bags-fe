// import React, { useState, useEffect } from "react";
// import { Modal, Input, Row, Col, Image, Button, Upload, message } from "antd";
// import items from "../../../../../../utils/Items";
// import { PlusOutlined, RightOutlined } from "@ant-design/icons";
// import styled from "styled-components";
// import axios from "axios";

// const StyledModal = styled(Modal)`
//   .ant-modal-title {
//     color: #cef53d !important;
//   }

//   .ant-modal-close {
//     color: rgb(0 0 0 / 45%) !important;
//   }

//   .ant-modal-content {
//     background-color: #00000059 !important;
//   }
// `;

// const ClipArtTab = ({ onImageSelect, selectedImage }) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [tempUploadFiles, setTempUploadFiles] = useState([]);

//   useEffect(() => {
//     // Load images from localStorage when component mounts
//     const storedImages = JSON.parse(
//       localStorage.getItem("uploadedImages") || "[]"
//     );
//     if (storedImages.length < 5) {
//       setUploadedImages(storedImages);
//     }

//     // Cleanup function to clear localStorage on unmount
//     return () => {
//       localStorage.removeItem("uploadedImages");
//     };
//   }, []);

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleImageSelect = (image) => {
//     onImageSelect(image);
//     setIsModalVisible(false);
//   };

//   const filteredItems = items.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleUploadCancel = () => {
//     setIsUploadModalVisible(false);
//   };

//   const handleUploadChange = ({ fileList }) => {
//     if (fileList.length > 5) {
//       message.error("Bạn chỉ được tải tối đa 5 ảnh!");
//       return;
//     }
//     setTempUploadFiles(fileList.map((file) => file.originFileObj));
//     setUploadedImages(
//       fileList.map((file) => URL.createObjectURL(file.originFileObj))
//     );
//   };

//   const handleUploadSelect = async () => {
//     const uploadedImageUrls = [];

//     for (const file of tempUploadFiles) {
//       const reader = new FileReader();

//       reader.onload = () => {
//         const base64String = reader.result;

//         if (typeof base64String === "string") {
//           uploadedImageUrls.push(base64String);
//         }

//         if (uploadedImageUrls.length === tempUploadFiles.length) {
//           const existingImages = JSON.parse(
//             localStorage.getItem("uploadedImages") || "[]"
//           );
//           const updatedImages = [...existingImages, ...uploadedImageUrls];
//           localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));

//           setUploadedImages(updatedImages);
//           setTempUploadFiles([]);
//           setIsUploadModalVisible(false);
//         }
//       };

//       reader.onerror = () => {
//         console.error("Error reading file:", file.name);
//         message.error("Failed to read file. Please try again.");
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div>
//       <div className="m-4 ml-10">
//         <h2 className="font-bold text-lg">Thêm một bức ảnh nào</h2>
//         <h5 className="text-white bg-pink-500 p-4 rounded-lg text-center text-[14px] font-semibold shadow-lg">
//           Duyệt qua Danh mục Clip Art của chúng tôi hoặc tải lên hình ảnh của
//           riêng bạn.
//           <span className="block mt-2 text-red-800">
//             Lưu ý rằng hãy thiết kế ảnh kéo thả đúng theo khung hình! Sai cấu
//             trúc sẽ bị hủy kết quả.
//           </span>
//         </h5>
//       </div>
//       <div className="mt-10 mx-6">
//         <div className="flex justify-between items-center border-b py-4 ">
//           <div>
//             <Button
//               type="link"
//               onClick={showModal}
//               className="text-lg font-semibold"
//             >
//               CLIP ART
//             </Button>
//             <p className="ml-4">Ngàn bức tranh</p>
//           </div>
//           <p className="mr-6" onClick={showModal}>
//             <RightOutlined />
//           </p>
//         </div>
//         <div className="flex justify-between items-center border-b py-4">
//           <div>
//             <Button
//               type="link"
//               onClick={() => setIsUploadModalVisible(true)}
//               className="text-lg font-semibold"
//             >
//               UPLOAD IMAGES
//             </Button>
//             <p className="ml-4">Tải ảnh của bạn</p>
//           </div>
//           <p className="mr-6" onClick={() => setIsUploadModalVisible(true)}>
//             <RightOutlined />
//           </p>
//         </div>
//         <div className="py-4 flex justify-between items-center">
//           <div>
//             <Button type="link" className="text-lg font-semibold">
//               MY IMAGES
//             </Button>
//             <p className="ml-4">Chọn ảnh của bạn</p>
//           </div>
//         </div>
//       </div>

//       <div className="uploaded-images mt-4">
//         <Row gutter={[16, 16]} className="mr-20 ml-20 justify-center">
//           {uploadedImages.map((image, index) => (
//             <Col key={index} span={8} className="justify-center">
//               <Image
//                 src={image}
//                 alt={`uploaded-img-${index}`}
//                 width={100}
//                 height={100}
//                 className="cursor-pointer"
//                 onClick={() => onImageSelect(image)}
//               />
//             </Col>
//           ))}
//         </Row>
//       </div>

//       <StyledModal
//         title="Upload Images"
//         open={isUploadModalVisible}
//         onCancel={handleUploadCancel}
//         footer={
//           <Button
//             onClick={handleUploadSelect}
//             disabled={
//               tempUploadFiles.length === 0 || tempUploadFiles.length > 5
//             }
//           >
//             Chấp Nhận Các Ảnh
//           </Button>
//         }
//       >
//         <Upload
//           listType="picture-card"
//           multiple={true}
//           onChange={handleUploadChange}
//           disabled={uploadedImages.length >= 5}
//         >
//           <div>
//             <PlusOutlined />
//             <div style={{ marginTop: 8 }}>Upload</div>
//           </div>
//         </Upload>
//       </StyledModal>

//       <StyledModal
//         title="Vẽ ảnh"
//         open={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         footer={null}
//         width={800}
//       >
//         <Input
//           placeholder="Search"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
//           {filteredItems.map((item) => (
//             <Col p={4} key={item.id}>
//               <div className="relative">
//                 <Image
//                   src={item.image}
//                   alt={item.name}
//                   width={64}
//                   height={64}
//                   className="cursor-pointer"
//                 />
//                 <Button
//                   className="absolute bottom-0 left-0"
//                   onClick={() => handleImageSelect(item.image)}
//                 >
//                   Select
//                 </Button>
//               </div>
//             </Col>
//           ))}
//         </Row>
//       </StyledModal>
//     </div>
//   );
// };

// export default ClipArtTab;

import React, { useState, useEffect } from "react";
import { Modal, Input, Row, Col, Image, Button, Upload, message } from "antd";
import items from "../../../../../../utils/Items";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import axios from "axios";

const StyledModal = styled(Modal)`
  .ant-modal-title {
    color: #cef53d !important;
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
  const [uploadedImages, setUploadedImages] = useState([]);
  const [tempUploadFiles, setTempUploadFiles] = useState([]);

  useEffect(() => {
    // Load images from localStorage when component mounts
    const storedImages = JSON.parse(
      localStorage.getItem("uploadedImages") || "[]"
    );
    if (storedImages.length < 10) {
      setUploadedImages(storedImages);
    }

    // Cleanup function to clear localStorage on unmount
    return () => {
      localStorage.removeItem("uploadedImages");
    };
  }, []);

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

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUploadCancel = () => {
    setIsUploadModalVisible(false);
  };

  const handleUploadChange = ({ fileList }) => {
    if (fileList.length > 10) {
      message.error("Bạn chỉ được tải tối đa 10 ảnh!");
      return;
    }
    setTempUploadFiles(fileList.map((file) => file.originFileObj));
    setUploadedImages(
      fileList.map((file) => URL.createObjectURL(file.originFileObj))
    );
  };

  const handleUploadSelect = async () => {
    const uploadedImageUrls = [];

    for (const file of tempUploadFiles) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result;

        if (typeof base64String === "string") {
          uploadedImageUrls.push(base64String);
        }

        if (uploadedImageUrls.length === tempUploadFiles.length) {
          const existingImages = JSON.parse(
            localStorage.getItem("uploadedImages") || "[]"
          );
          const updatedImages = [...existingImages, ...uploadedImageUrls];
          localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));

          setUploadedImages(updatedImages);
          setTempUploadFiles([]);
          setIsUploadModalVisible(false);
        }
      };

      reader.onerror = () => {
        console.error("Error reading file:", file.name);
        message.error("Failed to read file. Please try again.");
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="m-4 ml-10">
        <h2 className="font-bold text-lg">Thêm một bức ảnh nào</h2>
        <h5 className="text-white bg-pink-500 p-4 rounded-lg text-center text-[14px] font-semibold shadow-lg">
          Duyệt qua Danh mục Clip Art của chúng tôi hoặc tải lên hình ảnh của
          riêng bạn.
          <span className="block mt-2 text-red-800">
            Lưu ý rằng hãy thiết kế ảnh kéo thả đúng theo khung hình! Sai cấu
            trúc sẽ bị hủy kết quả.
          </span>
        </h5>
      </div>
      <div className="mt-10 mx-6">
        <div className="flex justify-between items-center border-b py-4 ">
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
              onClick={() => setIsUploadModalVisible(true)}
              className="text-lg font-semibold"
            >
              UPLOAD IMAGES
            </Button>
            <p className="ml-4">Tải ảnh của bạn</p>
          </div>
          <p className="mr-6" onClick={() => setIsUploadModalVisible(true)}>
            <RightOutlined />
          </p>
        </div>
        <div className="py-4 flex justify-between items-center">
          <div>
            <Button type="link" className="text-lg font-semibold">
              MY IMAGES
            </Button>
            <p className="ml-4">Chọn ảnh của bạn</p>
          </div>
        </div>
      </div>

      <div className="uploaded-images mt-4">
        <Row gutter={[16, 16]} className="mr-30 ml-20 pl-5 justify-center">
          {uploadedImages.map((image, index) => (
            <Col key={index} span={4} className="justify-center"> {/* Changed span to 4 for 5 images per row */}
              <Image
                src={image}
                alt={`uploaded-img-${index}`}
                width={80} // Adjusted width
                height={80} // Adjusted height
                className="cursor-pointer"
                onClick={() => onImageSelect(image)}
              />
            </Col>
          ))}
        </Row>
      </div>

      <StyledModal
        title="Upload Images"
        open={isUploadModalVisible}
        onCancel={handleUploadCancel}
        footer={
          <Button
            onClick={handleUploadSelect}
            disabled={
              tempUploadFiles.length === 0 || tempUploadFiles.length > 10
            }
          >
            Chấp Nhận Các Ảnh
          </Button>
        }
      >
        <Upload
          listType="picture-card"
          multiple={true}
          onChange={handleUploadChange}
          disabled={uploadedImages.length >= 10}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
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
        <Row gutter={[5, 5]} style={{ marginTop: "16px" }}>
          {filteredItems.map((item, index) => (
            <Col p={4} key={item.id}>
              <div className="relative">
                <Image
                  src={item.image}
                  alt={`uploaded-img-${index}`}
                  width={64}
                  height={64}
                  className="cursor-default"
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

