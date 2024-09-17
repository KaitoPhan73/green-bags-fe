// src/components/contentTabs/DecorationTab.js
import React, { useState } from "react";
import { Radio, Input, Button } from "antd";

const DecorationTab = () => {
  const [method, setMethod] = useState("CMYK Printing");
  const [quantity, setQuantity] = useState(0);

  const handleCalculatePrice = () => {
    console.log("Method:", method, "Quantity:", quantity);
    // Add your logic to calculate the price
  };

  return (
    <div className="m-4 ml-10 mr-10">
      <h2 className="font-bold text-lg">CALCULATE THE PRICE AND ADD TO CART</h2>
      <p className="text-gray-600 text-[12px]">
        Please Select Your Decoration Method And Enter Your Quantities Below.
        After Your Price Has Been Calculated, Name Your Design And Then Click
        The Add To Cart Button.
      </p>
      <div className="mt-10">
        <div className="mb-6">
          <label className="block font-bold text-lg">DECORATION METHOD</label>
          <Radio.Group
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="mt-2"
          >
            <Radio value="CMYK Printing">CMYK Printing</Radio>
            <Radio value="Digital Printing">Digital Printing</Radio>
          </Radio.Group>
        </div>
        <div className="mb-6">
          <label className="block font-bold text-lg">QUANTITIES</label>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-2 w-1/4"
            min={1}
          />
        </div>
        <Button
          type="primary"
          onClick={handleCalculatePrice}
          className="bg-black text-white w-full h-10"
        >
          CALCULATE PRICE
        </Button>
      </div>
      <div className="text-gray-400 mt-10 text-[9px] w-4/5 m-4">
        <p>
          A Tote Bag Is A Large, Typically Unlined Bag With Two Handles That Are
          Attached To The Sides Of The Bag. Tote Bags Are Typically Made From
          Durable Materials Such As Canvas, Cotton, Or Denim, And They Are Often
          Used For Carrying Groceries, Books, Or Other Items. They Are Also
          Popular As A Fashion Accessory.
        </p>
      </div>
    </div>
  );
};

export default DecorationTab;
