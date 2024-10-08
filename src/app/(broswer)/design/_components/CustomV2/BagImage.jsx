import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { Rnd } from "react-rnd";
import styled from "styled-components";
import { useDrop } from "react-dnd";
import html2canvas from "html2canvas";
import Compressor from "compressorjs";
import ConfirmButton from "../../UI/ModalConfirm";
import { useRef } from "react";

const StyledButton = styled(ConfirmButton)`
  background-color: #cef53d;
  color: black;
  border: 1px solid black;
  border-radius: 8px; /* Adjust the value as needed for roundness */

  &:hover {
    background-color: black;
    color: white;
  }

  .ant-btn-primary {
    background: #ff16c7d4 !important;
  }
  width: 300px;

  .ant-modal .ant-modal-content {
    width: 500px;
  }
`;

const BagImage = ({
  color,
  imageUrl,
  stickers = [],
  onDrop,
  onResize,
  onDeleteSticker,
  onTextRemove,
  textItems = [],
  onTextClick, // Add this callback
  imageURL,
  setImageURL,
  handleExportImage,
}) => {
  const [hoveredSticker, setHoveredSticker] = useState(null);
  const [hoveredText, setHoveredText] = useState(null);

  const [fullyCoveredStickers, setFullyCoveredStickers] = useState([]);

  const [fullyCoveredText, setFullyCoveredText] = useState([]);

  const [, drop] = useDrop(() => ({
    accept: "sticker",
    drop: (item, monitor) => {
      const delta = monitor.getSourceClientOffset();
      onDrop(item, delta);
    },
  }));

  useEffect(() => {
    const newFullyCoveredText = textItems.filter((text) => {
      const maskRect = {
        left: 0,
        top: 0,
        right: 600,
        bottom: 521,
      };

      const textRect = {
        left: text.x,
        top: text.y,
        right: text.x + text.width,
        bottom: text.y + text.height,
      };

      return (
        textRect.left >= maskRect.left &&
        textRect.top >= maskRect.top &&
        textRect.right <= maskRect.right &&
        textRect.bottom <= maskRect.bottom
      );
    });

    setFullyCoveredText(newFullyCoveredText.map((text) => text.uniqueId));
  }, [textItems]);

  useEffect(() => {
    const newFullyCoveredStickers = stickers.filter((sticker) => {
      const maskRect = {
        left: 0,
        top: 0,
        right: 600,
        bottom: 521,
      };

      const stickerRect = {
        left: sticker.x,
        top: sticker.y,
        right: sticker.x + sticker.width,
        bottom: sticker.y + sticker.height,
      };

      return (
        stickerRect.left >= maskRect.left &&
        stickerRect.top >= maskRect.top &&
        stickerRect.right <= maskRect.right &&
        stickerRect.bottom <= maskRect.bottom
      );
    });

    setFullyCoveredStickers(
      newFullyCoveredStickers.map((sticker) => sticker.uniqueId)
    );
  }, [stickers]);

  return (
    <div className="border rounded-lg h-[521px] border-pink-500">
      <div className="w-[600px] h-auto relative">
        <div
          ref={drop}
          id="bagCanvas"
          className="relative w-[600px] h-[521px] border rounded-lg border-pink-500 p-2 overflow-hidden "
          style={{
            backgroundColor: "#e2e8f0	",
            backgroundImage: `url(${"/images/mautui.png"})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            // maskImage: "url('/images/mautui.png')",
            // WebkitMaskImage: "url('/images/mautui.png')",
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
          // style={{
          //   backgroundColor: "#e2e8f0",
          //   backgroundImage: `url('/images/mautui.png')`,
          //   backgroundSize: "cover",
          //   backgroundRepeat: "no-repeat",
          //   backgroundPosition: "center center",
          // }}
        >
          <img
            src={imageUrl}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Bag"
            style={{
              filter: `opacity(0.7) drop-shadow(0 0 0 ${color}) drop-shadow(0 0 0 ${color}) brightness(0.8) contrast(1.2)`,
            }}
          />
          {stickers.map((sticker, index) => (
            <Rnd
              key={sticker.uniqueId}
              default={{
                x: sticker.x,
                y: sticker.y,
                width: sticker.width,
                height: sticker.height,
              }}
              onDragStop={(e, d) => onDrop(sticker, { x: d.x, y: d.y })}
              onResizeStop={(e, direction, ref, delta, position) => {
                onResize(sticker, {
                  width: ref.style.width,
                  height: ref.style.height,
                  ...position,
                });
              }}
              bounds="parent"
              onMouseEnter={() => setHoveredSticker(sticker.uniqueId)}
              onMouseLeave={() => setHoveredSticker(null)}
            >
              <div
                className={`relative w-full h-full group ${
                  hoveredSticker === sticker.uniqueId ||
                  fullyCoveredStickers.includes(sticker.id)
                    ? "border border-dashed border-gray-500"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSticker(sticker.id)}
                onMouseLeave={() => setHoveredSticker(null)}
              >
                <img
                  src={sticker.image}
                  alt="Sticker"
                  className="w-full h-full"
                />

                <button
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  onClick={() => onDeleteSticker(sticker.uniqueId)}
                  style={{ zIndex: 10 }}
                >
                  X
                </button>
              </div>
            </Rnd>
          ))}
          {textItems.map((textItem, index) => (
            <Rnd
              key={textItem.uniqueId}
              default={{
                x: textItem.x + 150,
                y: textItem.y + 190,
                width: textItem.width,
                height: textItem.height,
              }}
              onDragStop={(e, d) => onDrop(textItem, { x: d.x, y: d.y })}
              onResizeStop={(e, direction, ref, delta, position) => {
                onResize(textItem, {
                  width: ref.style.width,
                  height: ref.style.height,
                  ...position,
                });
              }}
              bounds="parent"
              // onClick={() => onTextClick(textItem)} // Handle text item click
            >
              <div
                className={`relative w-full h-full group ${
                  hoveredText === textItem.id
                    ? "border border-dashed border-gray-500"
                    : ""
                }`}
                onMouseEnter={() => setHoveredText(textItem.id)}
                onMouseLeave={() => setHoveredText(null)}
              >
                <p
                  style={{
                    fontFamily: textItem.fontFamily,
                    color: textItem.color,
                    WebkitTextStroke: `1px ${textItem.stroke}`,
                    textShadow: `2px 2px ${textItem.shadow}`,
                    fontSize: `${textItem.fontSize}px`,
                    letterSpacing: `${textItem.letterSpacing}px`,
                    lineHeight: textItem.lineHeight,
                    transform: `rotate(${textItem.rotate}deg)`,
                    textAlign: textItem.textAlign,
                  }}
                >
                  {textItem.text}
                </p>
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  onClick={() => onTextRemove(textItem.uniqueId)}
                  style={{ zIndex: 10 }}
                >
                  X
                </button>
              </div>
            </Rnd>
          ))}
        </div>
        {/* Overlay for hover border */}
        {hoveredSticker !== null || fullyCoveredStickers.length > 0 ? (
          <div
            className="absolute top-0 left-0 w-[600px] h-[700px] pointer-events-none"
            style={{ zIndex: 10 }}
          >
            {stickers.map((sticker) => (
              <div
                key={sticker.uniqueId}
                className={`absolute border border-dashed border-gray-500 ${
                  hoveredSticker === sticker.uniqueId ||
                  fullyCoveredStickers.includes(sticker.uniqueId)
                    ? "block"
                    : "hidden"
                }`}
                style={{
                  top: sticker.y,
                  left: sticker.x,
                  width: sticker.width,
                  height: sticker.height,
                }}
              ></div>
            ))}
          </div>
        ) : null}

        {hoveredText !== null ? (
          <div
            className="absolute top-0 left-0 w-[600px] h-[700px] pointer-events-none"
            style={{ zIndex: 10 }}
          >
            {textItems.map((text) => (
              <div
                key={text.uniqueId}
                className={`absolute border border-dashed border-gray-500 ${
                  hoveredText === text.uniqueId ? "block" : "hidden"
                }`}
                style={{
                  top: text.y,
                  left: text.x,
                  width: text.width,
                  height: text.height,
                }}
              ></div>
            ))}
          </div>
        ) : null}
      </div>

      <StyledButton
        onClick={handleExportImage}
        className="mt-4"
        title="Bạn đồng ý xuất túi của bạn ra chứ?"
      >
        Xuất ảnh
      </StyledButton>
      {imageURL && (
        <div className="mt-4">
          <p>Image URL:</p>
          <a href={imageURL} target="_blank" rel="noopener noreferrer">
            {imageURL}
          </a>
        </div>
      )}
    </div>
  );
};

export default BagImage;
