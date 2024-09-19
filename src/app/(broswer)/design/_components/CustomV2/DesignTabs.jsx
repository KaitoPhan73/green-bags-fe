import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const DesignTabs = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Colors" key="1">
        {/* Colors options */}
      </TabPane>
      <TabPane tab="Text" key="2">
        {/* Text options */}
      </TabPane>
      <TabPane tab="Images" key="3">
        {/* Image options */}
      </TabPane>
      <TabPane tab="Stickers" key="4">
        {/* Stickers options */}
      </TabPane>
    </Tabs>
  );
};

export default DesignTabs;
