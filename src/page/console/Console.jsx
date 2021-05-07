import React from 'react';
import { Menu } from 'antd';

const { SubMenu } = Menu;


const Console = ()=>{
  return (
    <div>
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Menu.Item key="1">全部人员存储情况</Menu.Item>
        <Menu.Item key="2">个人存储情况</Menu.Item>
      </Menu>
    </div>
  )
}
export default Console
