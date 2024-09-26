import React from "react";
import { FormCreateCategory } from "../_components/form-create-category";
const CreateCategory = async () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <FormCreateCategory />
      </div>
    </>
  );
};

export default CreateCategory;
