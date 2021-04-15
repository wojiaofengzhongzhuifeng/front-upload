import React, {useEffect} from 'react';
import { Tree, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';


function FileSystemComponent(){

  useEffect(()=>{

  }, [])

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
            {
              title: 'leaf',
              key: '0-0-0-2',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [
            {
              title: 'leaf',
              key: '0-0-1-0',
            },
          ],
        },
        {
          title: 'parent 1-2',
          key: '0-0-2',
          children: [
            {
              title: 'leaf',
              key: '0-0-2-0',
            },
            {
              title: 'leaf',
              key: '0-0-2-1',
            },
          ],
        },
      ],
    },
  ]
  const onExpand = (e, a) => {
    console.log('Trigger Expand', e, a);
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