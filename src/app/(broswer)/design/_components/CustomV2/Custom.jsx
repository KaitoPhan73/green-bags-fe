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
import { createCustomProduct } from "@/api/custom";
import useUserStore from "@/store/userStore";

const CustomBagV2 = ({ bags }) => {
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
  const { user, loadUserFromLocalStorage } = useUserStore();

  useEffect(() => {
    loadUserFromLocalStorage();
  }, [loadUserFromLocalStorage]);

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

  // Function to handle image selection and upload
  const handleImageSelect = async (image) => {
    // Update the selected image state
    setSelectedImage(image);

    // Upload the image to Cloudinary
    await uploadImageToCloudinary(image);
  };

  // Function to upload the image to Cloudinary
  const uploadImageToCloudinary = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "greenbag"); // Cloudinary preset
    formData.append("cloud_name", "dsmdqayv6"); // Replace with your Cloudinary cloud name

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      console.log(
        "Upload thành công. Dữ liệu nhận được từ Cloudinary:",
        response.data
      );

      setImageURL(response.data.secure_url);
    } catch (error) {
      console.error("Tải lên ảnh thất bại:", error);
    }
  };

  const handlePostCustomBag = async () => {
    if (compressedBlob) {
      const file = new File([compressedBlob], "custom-bag.jpg", {
        type: "image/jpeg",
      });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "greenbag"); // Replace with your upload preset

      try {
        // Call Cloudinary API to upload the image
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dsmdqayv6/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const result = await response.json();
        console.log("Image uploaded successfully:", result);

        // If needed, save the URL to state or perform other actions
        const imageUrl = result.secure_url; // Uploaded image URL
        console.log("Image URL:", imageUrl);

        // Call function to handle saved image
        postCustomBagMutation({ input: { imageUrl }, selectedColor });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
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
    handlePostCustomBag();

    try {
      const imageUrls = [];

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

      await new Promise((resolve) => {
        resizedCanvas.toBlob(
          (blob) => {
            uploadToCloudinary(blob, (imageUrl) => {
              console.log("Canvas image uploaded:", imageUrl);
              imageUrls.push(imageUrl);
              setStep(3);
              resolve();
            });
          },
          "image/jpeg",
          0.6
        );
      });

      await handleUploadImagesFromLocalStorage(imageUrls);

      console.log("Image export process finished.");
      setImageURL(imageUrls);

      const customValue = JSON.stringify(
        imageUrls.map((url) => url) 
      );
      const postData = {
        productId: "bf0bed81-7666-40e7-a02f-2f4b73808043",
        optionId: "bea14739-6b7c-4855-a698-0f19dc708576",
        imageURL: imageUrls[0],
        customValue: customValue,
        status: "PROCESSING",
        userId: user.id,
        totalPrice: 150000,
      };

      console.log("Posting to API with data:", postData);
      await postToApi(postData);
      localStorage.removeItem("uploadedImages");
    } catch (err) {
      console.error("An error occurred during the export process:", err);
    }
  };
  const postToApi = async (data) => {
    try {
      await createCustomProduct(data);
    } catch (error) {
      console.error("Error posting to API:", error);
    }
  };
  console.log("selectedBagId", selectedBagId);
  // Function to upload an image blob to Cloudinary (unchanged)
  const uploadToCloudinary = (blob, callback) => {
    new Compressor(blob, {
      quality: 0.6,
      success(compressedBlob) {
        const formData = new FormData();
        formData.append("file", compressedBlob);
        formData.append("upload_preset", "greenbag");
        fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        )
          .then(async (response) => {
            if (!response.ok) {
              throw new Error(`Upload failed: ${response.statusText}`);
            }
            const data = await response.json();
            callback(data.secure_url);
          })
          .catch((err) => {
            console.error("Image upload failed:", err);
          });
      },
      error(err) {
        console.error("Image compression failed:", err.message);
      },
    });
  };

  const handleUploadImagesFromLocalStorage = async (imageUrls) => {
    try {
      const existingImages = JSON.parse(
        localStorage.getItem("uploadedImages") || "[]"
      );

      if (existingImages.length === 0) {
        console.log("No images in localStorage to upload.");
        return;
      }

      for (const localImageUrl of existingImages) {
        const response = await fetch(localImageUrl);
        const blob = await response.blob();

        await new Promise((resolve) => {
          uploadToCloudinary(blob, (imageUrl) => {
            console.log("Local image uploaded:", imageUrl);
            imageUrls.push(imageUrl);
            resolve();
          });
        });
      }
      console.log(
        "All images from localStorage have been uploaded to Cloudinary."
      );
    } catch (err) {
      console.error("An error occurred during the upload process:", err);
    }
  };

  console.log("Compressed Blob:", compressedBlob);
  console.log("Image URL:", imageURL);

  const handleViewOrder = () => navigate.push("/profile/customizes");

  return (
    <div>
      <h1 className="amatic-sc-bold text-[40px] my-10  text-center">
        Tạo ra chiếc túi của bạn!
      </h1>
      <div className="p-4 max-w-7xl mx-auto">
        <CustomBagSteps current={step - 1} steps={steps} />
      </div>
      {step === 1 && <BagSlider onBagSelect={handleBagSelect} bags={bags} />}
      {step === 2 && (
        <BagSelected
          selectedBagId={selectedBagId}
          onSwapProduct={handleSwapProduct}
          selectedColor={selectedColor}
          onColorSelect={handleColorSelect}
          selectedImage={selectedImage}
          setStickers={setStickers}
          stickers={stickers}
          onImageSelect={handleImageSelect}
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
                <span className="text-sm font-medium">Tiếp tục thiết kế</span>
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
                <span>Xem lịch sử thiết kế</span>
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
