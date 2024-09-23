// import React, { useEffect, useRef, useState } from "react";
// import BagSlider from "./BagSlider";
// import Sidebar from "./SideBar";
// import BagSelected from "./BagSelector";
// import { useGetUserProfile } from "../../../../api/User/user";
// import { API_ENDPOINTS } from "../../../../api/api-endpoint";
// import { useMutation, useQueryClient } from "react-query";
// import { Button, Input, Modal, notification } from "antd";
// import http from "../../../../config/http";
// import html2canvas from "html2canvas";
// import Compressor from "compressorjs";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import CustomBagSteps from "../../UI/StepCustomBag";
// import {
//   usePostCustomBagMutation,
//   useUpdateCustomNameMutation,
// } from "../../api/../../../api/custom";
// import { useRouter } from "next/navigation";

// const CustomBagV2 = () => {
//   const [step, setStep] = useState(1);
//   const [selectedBagId, setSelectedBagId] = useState(null);
//   const [selectedColor, setSelectedColor] = useState("#FFFFFF");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [stickers, setStickers] = useState([]);
//   const [textItems, setTextItems] = useState([]);
//   const [imageURL, setImageURL] = useState(null);
//   const [compressedBlob, setCompressedBlob] = useState(null);
//   const steps = ["Select Bag", "Customize Bag", "Review & Order"];

//   const [modalVisible, setModalVisible] = useState(false);
//   const [productName, setProductName] = useState("");
//   const [bagId, setBagId] = useState(null);
//   const postCalled = useRef(false);

//   const [currentText, setCurrentText] = useState("");
//   const [textStyle, setTextStyle] = useState({
//     fontFamily: "Arial",
//     color: "#000000",
//     stroke: "#000000",
//     shadow: "#000000",
//     fontSize: 16,
//     letterSpacing: 1,
//     lineHeight: 1.2,
//     rotate: 0,
//     textAlign: "left",
//   });
//   const [isTextSubmitted, setIsTextSubmitted] = useState(false);
//   const [activeTab, setActiveTab] = useState("1");

//   const navigate = useRouter();

//   const IMGUR_CLIENT_ID = "884e8514127eed3";

//   // const { data: userData, isFetching, error, refetch } = useGetUserProfile();

//   // Function to handle showing the modal
//   const showNameModal = () => {
//     setModalVisible(true);
//   };

//   // Function to handle hiding the modal
//   const hideNameModal = () => {
//     setModalVisible(false);
//   };

//   // const onUpdateNameSuccess = () => {
//   //   hideNameModal();
//   // };

//   const onUpdateNameError = (error) => {
//     console.error("Failed to update custom name:", error);
//   };

//   // const { mutate: updateCustomNameMutation } = useUpdateCustomNameMutation(
//   //   onUpdateNameSuccess,
//   //   onUpdateNameError
//   // );

//   const handleSaveProductName = () => {
//     updateCustomNameMutation({ customBagId: bagId, name: productName });
//   };

//   const onSuccess = (data) => {
//     setBagId(data._id); // Assuming the bag ID is in the _id field
//     showNameModal();
//   };

//   const onError = (error) => {
//     console.error("Failed to post custom bag:", error);
//   };

//   // const { mutate: postCustomBagMutation } = usePostCustomBagMutation(
//   //   onSuccess,
//   //   onError
//   // );

//   const handlePostCustomBag = () => {
//     if ( compressedBlob) {
//       const file = new File([compressedBlob], "custom-bag.jpg", {
//         type: "image/jpeg",
//       });
//       const formData = new FormData();
//       // formData.append("user_id", userData._id);
//       formData.append("image", file);

//       postCustomBagMutation({ input: formData, selectedColor });
//     } else {
//       console.error("User data or image Blob is missing");
//     }
//   };

//   useEffect(() => {
//     if (compressedBlob && !postCalled.current) {
//       postCalled.current = true;
//       handlePostCustomBag();
//     }
//   }, [compressedBlob]);

//   const handleBagSelect = (bagId) => {
//     setSelectedBagId(bagId);
//     setStep(2);
//   };

//   const handleSwapProduct = () => {
//     setStep(1);
//     setSelectedBagId(null);
//   };
//   const handleColorSelect = (color) => {
//     setSelectedColor(color);
//   };

//   const handleTextSubmit = (text) => {
//     setTextItems((prevTextItems) => [
//       ...prevTextItems,
//       {
//         uniqueId: Date.now(),
//         text: text,
//         ...textStyle,
//         x: 50,
//         y: 50,
//         width: 150,
//         height: 50,
//       },
//     ]);
//     setIsTextSubmitted(true);
//     setCurrentText(text);
//   };

//   const handleTextClick = (textItem) => {
//     setCurrentText(textItem.text);
//     setTextStyle({
//       fontFamily: textItem.fontFamily,
//       color: textItem.color,
//       stroke: textItem.stroke,
//       shadow: textItem.shadow,
//       fontSize: textItem.fontSize,
//       letterSpacing: textItem.letterSpacing,
//       lineHeight: textItem.lineHeight,
//       rotate: textItem.rotate,
//       textAlign: textItem.textAlign,
//     });
//     setIsTextSubmitted(true);
//     setActiveTab("3");
//   };

//   const handleExportImage = async () => {
//     const originalCanvas = await html2canvas(
//       document.querySelector("#bagCanvas")
//     );

//     // Create a new canvas with reduced size
//     const resizedCanvas = document.createElement("canvas");
//     const ctx = resizedCanvas.getContext("2d");

//     // Set the desired width and height (e.g., 800x800)
//     const MAX_WIDTH = 800;
//     const MAX_HEIGHT = 800;

//     let width = originalCanvas.width;
//     let height = originalCanvas.height;

//     if (width > height) {
//       if (width > MAX_WIDTH) {
//         height *= MAX_WIDTH / width;
//         width = MAX_WIDTH;
//       }
//     } else {
//       if (height > MAX_HEIGHT) {
//         width *= MAX_HEIGHT / height;
//         height = MAX_HEIGHT;
//       }
//     }

//     resizedCanvas.width = width;
//     resizedCanvas.height = height;
//     ctx.drawImage(originalCanvas, 0, 0, width, height);

//     // Convert the resized canvas to a Blob and compress it
//     resizedCanvas.toBlob(
//       (blob) => {
//         new Compressor(blob, {
//           quality: 0.6,
//           success(compressedBlob) {
//             setCompressedBlob(compressedBlob);
//           },
//           error(err) {
//             console.error(err.message);
//           },
//         });
//       },
//       "image/jpeg",
//       0.6
//     );
//     setStep(3);
//   };

//   const handleViewOrder = () => {
//     navigate("/my-custom");
//   };

//   return (
//     <div>
//       <h1 className="amatic-sc-bold  text-[40px] my-10 text-black text-center">
//         Let Custom Your Bag !
//       </h1>
//       {/* <Sidebar /> */}
//       <div className="p-4 max-w-7xl mx-auto">
//         <CustomBagSteps current={step - 1} steps={steps} />
//       </div>
//       {step === 1 && <BagSlider onBagSelect={handleBagSelect} />}
//       {step === 2 && (
//         <div>
//           <BagSelected
//             selectedBagId={selectedBagId}
//             onSwapProduct={handleSwapProduct}
//             selectedColor={selectedColor}
//             onColorSelect={handleColorSelect}
//             selectedImage={selectedImage}
//             setStickers={setStickers}
//             stickers={stickers}
//             textItems={textItems}
//             setTextItems={setTextItems}
//             handleTextClick={handleTextClick}
//             currentText={currentText}
//             setCurrentText={setCurrentText}
//             textStyle={textStyle}
//             setTextStyle={setTextStyle}
//             onTextSubmit={handleTextSubmit}
//             setImageURL={setImageURL}
//             imageURL={imageURL}
//             handleExportImage={handleExportImage}
//             setCompressedBlob={setCompressedBlob}
//           />
//         </div>
//       )}
//       {step === 3 && (
//         <div>
//           <div className="flex justify-center">
//             {/* <Button type="primary" className="w-1/2">
//               View My Custom Bag
//             </Button> */}
//             <div class="flex flex-col items-center ">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 class="text-green-600 w-28 h-28"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 stroke-width="1"
//               >
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>

//               <h1 class="text-4xl font-bold mt-4">Yay !</h1>
//               <p>Your design custom bag have been donee!</p>

//               <div className="flex my-10">
//                 <a class="inline-flex items-center px-4 py-2 text-white bg-[#4848FF] border border-indigo-600 rounded rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     class="w-3 h-3 mr-2"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     stroke-width="2"
//                   >
//                     <path
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       d="M7 16l-4-4m0 0l4-4m-4 4h18"
//                     />
//                   </svg>

//                   <span
//                     className="text-sm font-medium cursor-pointer"
//                     onClick={() => setStep(1)}
//                   >
//                     Continue Customize
//                   </span>
//                 </a>
//                 <div className="text-sm font-medium cursor-pointer flex items-center bg-[#cff53e] border border-black-600 rounded rounded-full hover:bg-[#FF78C5] hover:text-white py-1 ml-4 px-4">
//                   <img src="/images/iconCustom.png " className="w-8 mr-2" />
//                   <span
//                     onClick={handleViewOrder}
//                     className="text-sm fonyt-semibold"
//                   >
//                     My List Customize
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <Modal
//         title="Enter Product Name"
//         open={modalVisible}
//         onOk={handleSaveProductName}
//         onCancel={hideNameModal}
//       >
//         <Input
//           placeholder="Enter product name"
//           value={productName}
//           onChange={(e) => setProductName(e.target.value)}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default CustomBagV2;


import React, { useEffect, useRef, useState } from "react";
import BagSlider from "./BagSlider";
import BagSelected from "./BagSelector";
import CustomBagSteps from "../../UI/StepCustomBag";
import html2canvas from "html2canvas";
import Compressor from "compressorjs";
import { useRouter } from "next/navigation";
import { Button, Input, Modal } from "antd";
import { usePostCustomBagMutation, useUpdateCustomNameMutation } from "../../../../../api/Custom/custom";

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
  const steps = ["Select Bag", "Customize Bag", "Review & Order"];

  const { mutate: postCustomBagMutation } = usePostCustomBagMutation(
    (data) => {
      setBagId(data._id); // Assuming the bag ID is in the _id field
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
      const file = new File([compressedBlob], "custom-bag.jpg", { type: "image/jpeg" });
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
    const originalCanvas = await html2canvas(document.querySelector("#bagCanvas"));

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

  const handleViewOrder = () => navigate.push("/my-custom");

  return (
    <div>
      <h1 className="amatic-sc-bold text-[40px] my-10 text-black text-center">
        Let Custom Your Bag!
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
            <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-4xl font-bold mt-4">Yay!</h1>
            <p>Your custom bag design is complete!</p>
            <div className="flex my-10">
              <a className="inline-flex items-center px-4 py-2 text-white bg-[#4848FF] border border-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring" onClick={() => setStep(1)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                <span className="text-sm font-medium">Continue Customize</span>
              </a>
              <div className="text-sm font-medium cursor-pointer flex items-center bg-[#cff53e] border border-black-600 rounded-full hover:bg-[#FF78C5] hover:text-white py-1 ml-4 px-4" onClick={handleViewOrder}>
                <img src="/images/iconCustom.png" className="mr-2 w-5 h-5" alt="Custom Icon" />
                <span>View Your Order</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal title="Name Your Custom Bag" visible={modalVisible} onOk={handleSaveProductName} onCancel={hideNameModal}>
        <Input value={productName} onChange={(e) => setProductName(e.target.value)} />
      </Modal>
    </div>
  );
};

export default CustomBagV2;
