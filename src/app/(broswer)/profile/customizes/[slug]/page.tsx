import React from "react";
import CustomDetail from "./detail-custom";
import { Separator } from "@/components/ui/separator";
import { getCustomsById } from "@/api/custom";

export default async function Detail(props: any) {
  const { slug } = props.params;
  const response = await getCustomsById(slug);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Chi tiết</h3>
      </div>
      <Separator />
      <CustomDetail data={response.payload} />
    </div>
  );
}
