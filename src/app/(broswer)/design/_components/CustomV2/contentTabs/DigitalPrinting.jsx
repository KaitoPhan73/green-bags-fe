import React from "react";

const digitalPrintingColors = [
  "#FFFFFF",
  "#2E2E2E",
  "#4A4A4A",
  "#A9A9A9",
  "#B7410E",
  "#C0C0C0",
  "#191970",
  "#00FFFF",
  "#00008B",
  "#8A2BE2",
  "#F4A460",
  "#FF4500",
  "#2E8B57",
  "#DAA520",
  "#556B2F",
];

// const screenPrintingColors = [
//   "#8B0000",
//   "#FF6347",
//   "#FF8C00",
//   "#FFD700",
//   "#9ACD32",
//   "#00FF00",
//   "#32CD32",
//   "#008000",
//   "#00FA9A",
//   "#40E0D0",
//   "#20B2AA",
//   "#00CED1",
//   "#4682B4",
//   "#0000FF",
//   "#4169E1",
//   "#8A2BE2",
//   "#4B0082",
//   "#9932CC",
//   "#8B008B",
//   "#FF00FF",
//   "#FF1493",
//   "#FF69B4",
//   "#C71585",
//   "#DB7093",
//   "#F08080",
//   "#CD5C5C",
//   "#DC143C",
//   "#B22222",
//   "#A52A2A",
// ];

const ColorSwatch = ({ color, onSelect }) => (
  <div
    className="w-6 h-6 rounded cursor-pointer"
    style={{ backgroundColor: color }}
    onClick={() => onSelect(color)}
  ></div>
);
const DigitalPrinting = ({ onColorSelect }) => {
  return (
    <div className="m-4 ml-10">
      <h1 className="font-bold text-lg">VẢI TÚI TRẮNG</h1>
      <p className="text-gray-600 text-[12px]">
        Sản phẩm: Áo thun cotton Gildan, màu xám thể thao
      </p>
      <p className="text-gray-600 text-[12px]">
        In kỹ thuật số: Mặt trước: có, Mặt sau: không
      </p>
      <div className="w-4/5 mt-10">
        <div className="flex my-4 text-[12px] ">
          <h3 className="text-black font-bold mr-4">In kỹ thuật số </h3>
          <p>(giao hàng từ 1 - 2 ngày)</p>
        </div>
        <div className="grid grid-cols-10 gap-2">
          {digitalPrintingColors.map((color) => (
            <ColorSwatch key={color} color={color} onSelect={onColorSelect} />
          ))}
        </div>

        {/* <div className="flex mb-4 mt-10 text-[12px]">
          <h3 className="text-black  font-bold mr-4">Screen Printing </h3>
          <p>(12 Piece Minimum - Ship in 5-6 Days)</p>
        </div>
        <div className="grid grid-cols-10 gap-2">
          {screenPrintingColors.map((color) => (
            <ColorSwatch key={color} color={color} onSelect={onColorSelect} />
          ))}
        </div> */}
        <p className="text-gray-400 mt-4 text-[15px] mt-16">
          Túi tote là một chiếc túi lớn, thường không có đường viền, có hai tay
          cầm Gắn vào hai bên của túi. Túi tote thường được làm từ Các vật liệu
          bền như vải, cotton hoặc denim và chúng thường Được sử dụng để đựng
          hàng tạp hóa, sách hoặc các vật dụng khác. Họ cũng vậy Phổ biến như
          một phụ kiện thời trang.
        </p>
      </div>
    </div>
  );
};

export default DigitalPrinting;
