import React from "react";
import styled from "styled-components";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const StyledButton = styled(Button)`
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

const ConfirmButton = ({ onClick, className, children, title, content }) => {
  const showConfirm = () => {
    confirm({
      title: title || "Are you sure you want to export the image?",
      icon: <ExclamationCircleOutlined />,
      content: content || "Hành đông này không thể hoàn tác",
      okText: "Xác nhận",
      cancelText: "Từ chối",
      onOk() {
        onClick();
      },
    });
  };

  return (
    <Button
      onClick={showConfirm}
      className={className}
      title={title}
      content={content}
    >
      {children}
    </Button>
  );
};

export default ConfirmButton;
