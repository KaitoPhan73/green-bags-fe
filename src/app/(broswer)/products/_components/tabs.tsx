"use client";

import { useState } from "react";
import { useUrlParamChange } from "@/components/hooks/url";
import { Button } from "@/components/ui/button";
import { TCategoryResponse } from "@/schema/category.schema";
import { TTableResponse } from "@/types/Table";
type Props = { categories: TTableResponse<TCategoryResponse> };

export function TabTypeProducts({ categories }: Props) {
  const [activeTab, setActiveTab] = useState(categories.listResult[0].id);
  const { updateUrlParam } = useUrlParamChange();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    updateUrlParam("type", tab);
  };

  return (
    <div className="w-[400px]">
      <div className="flex border border-[#CDA274]  rounded-lg gap-2">
        {categories.listResult?.map((category) => {
          const isActive = activeTab === category.id;
          return (
            <Button
              key={category.id}
              onClick={() => handleTabClick(category.id)}
              className={`flex-1 py-2 text-center ${
                isActive ? "bg-[#CDA274] text-white" : "bg-white text-gray-700"
              } border-b-2 border-transparent ${
                isActive
                  ? "hover:bg-[#CDA274]"
                  : "hover:bg-gray-200 hover:text-black"
              }`}
            >
              {category.categoryName}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
