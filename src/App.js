import './App.css';
import { Upload, Button, message,Modal, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {useState, useEffect} from 'react'
import {UPLOAD_URL, getAllFolderNameList, useDebounce, createNewFolder} from './utils/index';



function App() {
  const [fileList, setFileList] = useState()
  const [modalVisible, setModalVisible] = useState(false);
  const [folderInputValue, handleFolderInputValue] = useState('');
  const [folderNameIsDuplication, setFolderNameIsDuplication] = useState(false);// 通过接口判断文件夹名称是否重复
  const debouncedFolderInputValue = useDebounce(folderInputValue, 500);

  useEffect(()=>{
    initFolderName()
    initFileList()
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
  const initFileList = ()=>{
    let cacheUploadFileList = JSON.parse(localStorage.getItem('uploadFileList'))
    setFileList(cacheUploadFileList)
  }

  // 用户自定义在后端 upload 目录的名称
  const initFolderName = ()=>{
    let folderName = localStorage.getItem('folderName');
    if(!folderName){
      setModalVisible(true);
    }
  }
  useEffect(()=>{
    getAllFolderNameList().then(response => {
      const {data: folderNameList} = response;
      if(folderNameList.includes(debouncedFolderInputValue)){
        setFolderNameIsDuplication(true);
      } else {
        setFolderNameIsDuplication(false);
      }
    })
  }, [debouncedFolderInputValue]);

  const handleClickOk = ()=>{
    createNewFolder(debouncedFolderInputValue).then((response)=>{
      if(response.code === 200){
        setModalVisible(false);
        localStorage.setItem('folderName', 'true');
      }
    })
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
      <Modal
        title="请输入您的专属文件夹名称"
        visible={modalVisible}
        closeIcon={null}
        footer={
          <Button type='primary' onClick={handleClickOk}>确定</Button>
        }
      >
        <Input value={folderInputValue} onChange={(e)=>{handleFolderInputValue(e.target.value)}}/>
        {
          folderNameIsDuplication ? <p style={{color:"red"}}>该文件夹名称重复,请重新输入</p> : null
        }
      </Modal>
    </div>
  );
}

export default App;
