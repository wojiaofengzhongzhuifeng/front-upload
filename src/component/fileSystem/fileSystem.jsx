import React, {useEffect, useState} from 'react';
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {useFolderPathContext, getFolderSubContentList} from '../../utils/index';
import { useHistory } from "react-router-dom";


function FileSystemComponent(){
  const {folderPathList, setFolderPathList} = useFolderPathContext();
  let history = useHistory();
  const [treeData, setTreeData] = useState([
    {
      title: "parent 1",
      key: "0-0",
      children: [

      ]
    }
  ]);

  useEffect(()=>{
    async function getFolderSubContentListWrapper(){
      if(folderPathList.length === 0){
        history.push("/");
        return
      }
      const subContentListResponse = await getFolderSubContentList(folderPathList);
      const {data: subContentList} = subContentListResponse;

      return subContentList
    }
    getFolderSubContentListWrapper().then((subContentList)=>{
      console.log(subContentList)
    })

  }, [folderPathList])

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  const onExpand = (expandList, expandItem) => {
    if(expandItem.expanded){
      let folderPathName = expandItem.node.key;
      setFolderPathList([...folderPathList, folderPathName])
    }
  };

  return (
    <div style={{display:"flex"}}>
      <Tree
        showLine
        switcherIcon={<DownOutlined />}
        defaultExpandedKeys={['0-0-0']}
        onSelect={onSelect}
        treeData={treeData}
        onExpand={onExpand}
      />
    </div>
  )
}
export default FileSystemComponent