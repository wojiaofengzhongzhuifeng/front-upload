import React, {useEffect, useState} from 'react';
import { Tree, Button } from 'antd';
import {useFolderPathContext, getFolderSubContentList, UPLOAD_URL} from '../../utils/index';
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
  const {folderPathList} = useFolderPathContext();
  let history = useHistory();
  const [treeData, setTreeData] = useState([]);
  const [expandKeyList, setExpandKeyList] = useState([]);

  useEffect(()=>{
    getFolderSubContentListWrapper().then((subContentList)=>{
      let needAppendTreeData = convertToTreeData(subContentList);
      setTreeData(needAppendTreeData)
    })
  }, [])

  const convertToTreeData = (resData, parentKey)=>{
    return resData && resData.map((subContent)=>{
      let treeDataItem;
      if(subContent.isDir && subContent.hasChildren){
        treeDataItem = { title: subContent.name, key: `${subContent.name}`}
      } else {
        if(parentKey){
          treeDataItem = { title: subContent.name, key: `${parentKey}/${subContent.name}`, isLeaf: true  }
        } else {
          treeDataItem = { title: subContent.name, key: `${subContent.name}`, isLeaf: true  }
        }
      }
      return treeDataItem
    });
  }
  const getFolderSubContentListWrapper = async ()=>{
    if(folderPathList.length === 0){history.push("/");return}
    const subContentListResponse = await getFolderSubContentList(folderPathList);
    const {data: subContentList} = subContentListResponse;
    return subContentList
  }
  const onLoadData = ({ key, children }) => {
    let tempKeyArray = key.split('/');
    key = tempKeyArray[tempKeyArray.length - 1];
    return new Promise(async resolve => {
      if (children) {resolve();return;}
      const subContentListResponse = await getFolderSubContentList([...folderPathList, key]);
      let needAppendTreeData = convertToTreeData(subContentListResponse.data, key);

      setTreeData(origin =>
        updateTreeData(origin, key, needAppendTreeData),
      );
      resolve();
    });
  }
  const onSelect = (selectKeys, e)=>{
    let selectNodeKey = e.node.key;
    if(e.node.isLeaf){
      let previewUrl = `${UPLOAD_URL}/upload/${folderPathList.join('/')}/${selectNodeKey}`
      window.open(previewUrl)
    }
  }
  const onExpand = (expandKeys)=>{
    console.log(expandKeys);
    setExpandKeyList(expandKeys);
  }
  const onClickTest = ()=>{
    console.log('folderPathList', folderPathList);
    console.log('expandKeyList', expandKeyList);
    console.log('treeData', treeData);
  }

  return (
    <div style={{display:"flex"}}>
      <Tree loadData={onLoadData} treeData={treeData} onSelect={onSelect} onExpand={onExpand} expandedKeys={expandKeyList}/>
      <Button onClick={onClickTest}>test 查看当前路径</Button>
    </div>
  )
}
export default FileSystemComponent