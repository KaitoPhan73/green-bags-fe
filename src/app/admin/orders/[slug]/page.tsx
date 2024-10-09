// import React from "react";
// import { FormUpdateOrder } from "./components/form-update-order";
// import { getBaseModelById } from "@/api/base-model";
// import { getAllCategoriesActive } from "@/api/category";
// import { getOrderById } from "@/api/order";
// import { getAccountById } from "@/api/account";

// const UpdateOrder = async ({ params }: { params: { slug: string } }) => {
//   const order = getOrderById(params.slug);
//   const user = getAccountById(params.slug);
//   const [orderResponse, userResponse] = await Promise.all([
//     order,
//     user,
//   ]);
//   return (
//     <>
//       <div className="flex h-full flex-1 flex-col">
//         <FormUpdateOrder
//           initialData={orderResponse.payload}
//           categories={userResponse.payload}
//         />
//       </div>
//     </>
//   );
// };

// export default UpdateOrder;
