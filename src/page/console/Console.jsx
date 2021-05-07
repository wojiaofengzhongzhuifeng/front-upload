import React, {useState, useEffect} from 'react';
import { Menu, Layout } from 'antd';
import {
  Switch,
  Route,
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import './style.css';


const { Header, Content, Footer, Sider } = Layout;

const AllPerson = ()=>{
  return (
    <div>AllPerson</div>
  )
}
const Person = ()=>{
  return (
    <div>Person</div>
  )
}


const Console = ({pathName})=>{
  const [selectedKeys, setSelectedKeys] = useState(['allPerson'])
  let history = useHistory();

  useEffect(()=>{
    const pathString = selectedKeys.join('/')
    history.push(`${pathName}/${pathString}`);
  }, [selectedKeys, history]);

  const onSelect = (item)=>{
    setSelectedKeys([...item.selectedKeys])
  }
  const onClickHome = ()=>{
    history.push('/');

  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible >
        <div className={'logo'} onClick={onClickHome}>返回主页面</div>
        <Menu theme="dark" mode="inline" onSelect={onSelect} selectedKeys={selectedKeys}>
          <Menu.Item key="allPerson" >
            全部人员存储情况
          </Menu.Item>
          <Menu.Item key="person">
            个人存储情况
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Switch>
              <Route path={`${pathName}/allPerson`}>
                <AllPerson />
              </Route>
              <Route path={`${pathName}/person`}>
                <Person />
              </Route>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>文件管理系统</Footer>
      </Layout>
    </Layout>
  )
}
export default Console
