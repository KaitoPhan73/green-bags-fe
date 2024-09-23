"use client";

import { useState } from "react";
import { useUrlParamChange } from "@/components/hooks/url";
import { Button } from "@/components/ui/button";
type Option = {
  label: string;
  value: string;
};

type Props = { options: Option[] };

export function TabTypeProducts({ options }: Props) {
  const [activeTab, setActiveTab] = useState(options[0].value);
  const { updateUrlParams } = useUrlParamChange();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    updateUrlParams("type", tab);
  };

  return (
    <div className="w-[400px]">
      <div className="flex border border-[#CDA274]  rounded-lg gap-2">
        {options.map((type) => {
          const isActive = activeTab === type.value;
          return (
            <Button
              key={type.value}
              onClick={() => handleTabClick(type.value)}
              className={`flex-1 py-2 text-center ${
                isActive ? "bg-[#CDA274] text-white" : "bg-white text-gray-700"
              } border-b-2 border-transparent ${
                isActive
                  ? "hover:bg-[#CDA274]"
                  : "hover:bg-gray-200 hover:text-black"
              }`}
            >
              {type.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
