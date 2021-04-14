import './App.css';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {useState, useEffect} from 'react'

let UPLOAD_URL;
if(process.env.REACT_APP_ENV === 'dev'){
  UPLOAD_URL = 'http://localhost:3003'
} else {
  UPLOAD_URL = 'http://canyou.rickricks.com:7777'
}


function App() {
  const [fileList, setFileList] = useState()

  // const [defaultFileList, setDefaultFileList] = useState([])

  useEffect(()=>{
    let cacheUploadFileList = JSON.parse(localStorage.getItem('uploadFileList'))
    setFileList(cacheUploadFileList)
    console.log(typeof cacheUploadFileList);
  }, [])

  const handleFileUpload = (info)=>{
    if (info.file.status !== 'uploading') {
      const uploadFileObj = info.file;
      // eslint-disable-next-line array-callback-return
      let currentUploadFileObj = info.fileList.find((file)=>{
        if(file.uid === uploadFileObj.uid){
          return true
        }
      })
      if(currentUploadFileObj){
        // todo 根据后端返回的数据, 修改
        currentUploadFileObj.url = currentUploadFileObj.response.path
      }
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
    setFileList([...info.fileList])
    localStorage.setItem('uploadFileList', JSON.stringify(info.fileList))
  }


  return (
    <div className="App">
      <Upload
        onChange={handleFileUpload}
        action={`${UPLOAD_URL}/upload`}
        fileList={fileList}
      >
        <Button icon={<UploadOutlined />}>上传 HTML 或者图片</Button>
      </Upload>
    </div>
  );
}

export default App;
