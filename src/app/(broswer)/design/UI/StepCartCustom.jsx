import React from "react";
import styled from "styled-components";
import { Steps } from "antd";

const { Step } = Steps;

const StyledSteps = styled(Steps)`
  .ant-steps-item {
    .ant-steps-item-icon {
      width: 40px !important;
      padding-top: 2px !important;
      height: 40px !important;
      background-color: #cff53e !important; /* Default background for non-current steps */
      border-color: #cff53e !important; /* Border color for non-current steps */
      color: white !important; /* Default text color for non-current steps */
      font-weight: 700 !important; /* Default font weight for non-current steps */
      font-size: 19px !important; /* Font size for step title */

      &.ant-steps-item-finish {
        background-color: #f48fb1 !important; /* Background color for completed steps */
        border-color: #f48fb1 !important; /* Border color for completed steps */
        color: white !important; /* Text color for completed steps */
        &::before {
          content: "✓" !important; /* Change number to check mark for completed steps */
        }
      }

      &.ant-steps-item-active {
        background-color: #cff53e !important; /* Background color for current step */
        border-color: #cff53e !important; /* Border color for current step */
        color: black !important; /* Text color for current step */
        font-weight: bold !important; /* Bold font weight for current step */
      }

      &.ant-steps-item-process {
        background-color: #cff53e !important; /* Background color for current step */
        border-color: #cff53e !important; /* Border color for current step */
        color: black !important; /* Text color for current step */
        font-weight: bold !important; /* Bold font weight for current step */
      }

      &:not(.ant-steps-item-finish):not(.ant-steps-item-active):not(
          .ant-steps-item-process
        ) {
        background-color: #cff53e !important; /* Background color for future steps */
        border-color: #cff53e !important; /* Border color for future steps */
        color: white !important; /* Text color for future steps */
      }
    }

    .ant-steps-item-title {
      font-size: 18px !important; /* Font size for step title */
      font-weight: bold !important; /* Font weight for step title */
    }
  }
`;

const CustomSteps = ({ current }) => {
  return (
    <StyledSteps current={current} className="my-10 custom-steps ">
      <Step title="Shopping cart" />
      <Step title="Checkout Details" />
      <Step title="Order complete" />
    </StyledSteps>
  );
};

export default CustomSteps;
