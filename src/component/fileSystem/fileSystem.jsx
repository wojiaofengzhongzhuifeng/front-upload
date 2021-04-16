import React, {useEffect, useState} from 'react';
import { Tree } from 'antd';
import {useFolderPathContext, getFolderSubContentList} from '../../utils/index';
import { useHistory } from "react-router-dom";


// It's just a simple demo. You can use tree map to optimize update perf.
function updateTreeData(list, key, children) {
  return list.map(node => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });
}

function FileSystemComponent(){
  const {folderPathList, setFolderPathList} = useFolderPathContext();
  let history = useHistory();
  const [treeData, setTreeData] = useState([]);

  useEffect(()=>{
    getFolderSubContentListWrapper().then((subContentList)=>{
      let needAppendTreeData = convertToTreeData(subContentList);
      setTreeData(needAppendTreeData)
    })
  }, [])

  const convertToTreeData = (resData)=>{
    let needAppendTreeData = resData && resData.map((subContent)=>{
      let treeDataItem;
      if(subContent.isDir && subContent.hasChildren){
        treeDataItem = { title: subContent.name, key: subContent.name}
      } else {
        treeDataItem = { title: subContent.name, key: subContent.name, isLeaf: true  }
      }
      return treeDataItem
    });
    return needAppendTreeData
  }
  const getFolderSubContentListWrapper = async ()=>{
    if(folderPathList.length === 0){history.push("/");return}
    const subContentListResponse = await getFolderSubContentList(folderPathList);
    const {data: subContentList} = subContentListResponse;
    return subContentList
  }
  const onLoadData = ({ key, children }) => {
    setFolderPathList([...folderPathList, key]);
    return new Promise(resolve => {
      if (children) {resolve();return;}
      setFolderPathList(async current => {
        const subContentListResponse = await getFolderSubContentList(current);
        let needAppendTreeData = convertToTreeData(subContentListResponse.data);

        setTreeData(origin =>
          updateTreeData(origin, key, needAppendTreeData),
        );
        resolve();
        return current
      })
    });
  }

  return (
    <div style={{display:"flex"}}>
      <Tree loadData={onLoadData} treeData={treeData}/>
    </div>
  )
}
export default FileSystemComponent