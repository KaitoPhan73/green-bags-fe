import React from "react";
import {
  ReloadOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center bg-black text-white py-4 pr-4 pl-2 space-y-4 h-auto">
      <button className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full">
        <ReloadOutlined />
      </button>
      <button className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full">
        <ZoomInOutlined />
      </button>
      <button className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full">
        <ZoomOutOutlined />
      </button>
      <button className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full">
        <LeftOutlined />
      </button>
      <button className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full">
        <RightOutlined />
      </button>
    </div>
  );
};

export default Sidebar;
