import React from "react";
import CustomDetail from "./detail-custom";
import { Separator } from "@/components/ui/separator";
import { getAllCustomsById } from "@/api/custom";

export default async function Detail(props: any) {
  const { slug } = props.params;
  const response = await getAllCustomsById(slug);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">History Detail</h3>
      </div>
      <Separator />
      <CustomDetail dataSource={response.payload} />
    </div>
  );
}
