// src/components/contentTabs/InputTextTab.js
import React, { useState } from "react";
import { Button, Input, Select, Slider, Radio } from "antd";
import {
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const InputTextTab = ({
  onTextSubmit,
  onTextUpdate,
  onTextStyleChange,
  text,
  textStyle,
  isTextSubmitted,
  setIsTextSubmitted,
}) => {
  const handleAddText = () => {
    onTextSubmit(text);
  };

  const handleTextChange = (e) => {
    const updatedText = e.target.value;
    onTextUpdate(updatedText);
  };

  const handleStyleChange = (key, value) => {
    const newStyle = { ...textStyle, [key]: value };
    onTextStyleChange(newStyle);
  };

  const handleDone = () => {
    setIsTextSubmitted(false);
  };
  if (isTextSubmitted) {
    return (
      <TextStylingTab
        text={text}
        textStyle={textStyle}
        onStyleChange={handleStyleChange}
        onDone={handleDone}
      />
    );
  }

  return (
    <div className="m-4 ml-10">
      <h2 className="font-bold text-lg">Nhập chữ của bạn phía bên dưới</h2>
      <p className="text-gray-600 text-[12px]">
        Văn bản, Trích dẫn,...Bạn thích cái nào
      </p>
      <div className=" mt-10 w-[90%]">
        <TextArea
          rows={4}
          value={text}
          onChange={handleTextChange}
          placeholder="Enter your text here"
          className="mb-4 w-full"
        />
        <Button
          type="primary"
          onClick={handleAddText}
          className="w-[100px] bg-black "
        >
          ADD TEXT
        </Button>
      </div>
      <div className="text-gray-400 mt-4 text-[9px] mt-16 w-4/5 m-4 ">
        <p>
          Túi Tote là một chiếc túi lớn, thường không lót, có hai quai xách gắn
          vào hai bên túi. Túi Tote thường được làm từ các vật liệu bền như vải
          bạt, vải cotton hoặc vải denim, và thường được dùng để đựng đồ tạp
          hóa, sách hoặc các vật dụng khác. Chúng cũng được ưa chuộng như một
          phụ kiện thời trang.
        </p>
      </div>
    </div>
  );
};

const TextStylingTab = ({ text, textStyle, onStyleChange, onDone }) => {
  const fonts = [
    "Be Vietnam",
    "Open Sans",
    "Roboto",
    "Source Sans Pro",
    "Playfair Display",
    "Arial",
    "Times New Roman",
    "Garamond",
    "Bookman",
    "Noto Serif",
    "Sedgwick Ave",
    "Amatic SC",
    "Patrick Hand",
    "Mali",
    "Bangers",
    "Lobster",
    "Dancing Script",
    "Pacifico",
    "Bungee Shade",
    "Saira Stencil One",
    "Srisakdi",
    "Charmonman",
    "Montserrat",
    "Lato",
    "Raleway",
    "Poppins",
    "Nunito",
    "Merriweather",
    "Josefin Sans",
    "Ubuntu",
    "Slabo 27px",
    "Fira Sans",
    "Alegreya",
    "PT Serif",
    "Muli",
    "Vollkorn",
    "Caveat",
    "Inconsolata",
    "Zilla Slab",
    "Quicksand",
    "Raleway Dots",
    "Cinzel",
    "Anton",
    "Permanent Marker",
    "Great Vibes",
    "Oswald",
    "Abril Fatface",
    "Sacramento",
    "Baloo 2",
    "Yanone Kaffeesatz",
    "Varela Round",
    "Roboto Slab",
    "Titillium Web",
    "Overpass",
    "Bitter",
    "Heebo",
    "Fjalla One",
    "Barlow",
    "Teko",
    "Asap",
  ];

  return (
    <div className="m-4 ">
      <div className="bg-white p-4">
        <p
          style={{
            fontFamily: textStyle.fontFamily,
            color: textStyle.color,
            WebkitTextStroke: `none`, // Không có stroke
            textShadow: `2px 2px ${
              textStyle.shadowColor || "rgb(201, 207, 207)"
            }`,
            fontSize: `${textStyle.fontSize}px`,
            letterSpacing: `${textStyle.letterSpacing}px`,
            lineHeight: textStyle.lineHeight,
            transform: `rotate(${textStyle.rotate}deg)`,
            textAlign: textStyle.textAlign,
          }}
        >
          {text}
        </p>
      </div>
      <div className="mt-8 overflow-y-auto h-[450px]">
        <div className="flex items-center mb-4">
          <label className="w-[27%]">Font</label>
          <Select
            value={textStyle.fontFamily}
            onChange={(value) => onStyleChange("fontFamily", value)}
            className="w-2/3"
          >
            {fonts.map((font, index) => (
              <Option key={index} value={font}>
                {font}
              </Option>
            ))}
          </Select>
        </div>
        <div className="flex items-center mb-4">
          <label className="w-[27%]">Color</label>
          <input
            type="color"
            value={textStyle.color}
            onChange={(e) => onStyleChange("color", e.target.value)}
            className="w-2/3"
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="w-[27%]">Stroke</label>
          <input
            type="color"
            value={textStyle.stroke}
            onChange={(e) => onStyleChange("stroke", e.target.value)}
            className="w-2/3"
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="w-[27%]">Shadow</label>
          <input
            type="color"
            value={textStyle.shadow}
            onChange={(e) => onStyleChange("shadow", e.target.value)}
            className="w-2/3"
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="w-[27%]">Size</label>
          <Slider
            min={10}
            max={72}
            value={textStyle.fontSize}
            onChange={(value) => onStyleChange("fontSize", value)}
            className="w-2/3"
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="w-[27%]">Stretch</label>
          <Slider
            min={50}
            max={200}
            value={textStyle.stretch}
            onChange={(value) => onStyleChange("stretch", value)}
            className="w-2/3"
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="w-[27%]">Spacing</label>
          <Slider
            min={0}
            max={10}
            value={textStyle.letterSpacing}
            onChange={(value) => onStyleChange("letterSpacing", value)}
            className="w-2/3"
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="w-[27%]">Line Height</label>
          <Slider
            min={1}
            max={3}
            step={0.1}
            value={textStyle.lineHeight}
            onChange={(value) => onStyleChange("lineHeight", value)}
            className="w-2/3"
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="w-[27%]">Rotate</label>
          <Slider
            min={0}
            max={360}
            value={textStyle.rotate}
            onChange={(value) => onStyleChange("rotate", value)}
            className="w-2/3"
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="w-[27%]">Align</label>
          <Radio.Group
            onChange={(e) => onStyleChange("textAlign", e.target.value)}
            value={textStyle.textAlign}
            className="w-2/3"
          >
            <Radio.Button value="left">
              <AlignLeftOutlined />
            </Radio.Button>
            <Radio.Button value="center">
              <AlignCenterOutlined />
            </Radio.Button>
            <Radio.Button value="right">
              <AlignRightOutlined />
            </Radio.Button>
          </Radio.Group>
        </div>
        <Button
          type="primary"
          onClick={onDone}
          className="w-[100px] bg-black mt-4"
        >
          DONE
        </Button>
      </div>
    </div>
  );
};

export default InputTextTab;
