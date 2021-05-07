import React from "react";
import {Tabs} from 'antd';

const { TabPane } = Tabs;

const AllPerson = ()=>{
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="表格" key="1">

        </TabPane>
        <TabPane tab="可视化" key="2">

        </TabPane>
      </Tabs>
    </div>
  )
}
export default  AllPerson;
