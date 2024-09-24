import React from "react";
import { VoucherGroupForm } from "../components/voucher-group-create";

const page = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <VoucherGroupForm />
      </div>
    </>
  );
};

export default page;
