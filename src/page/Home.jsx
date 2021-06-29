import { Upload, Button, message,Modal, Input, Table, Tag, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";

import {
  UPLOAD_URL,
  getAllFolderNameList,
  useDebounce,
  createNewFolder,
  getZipDownloadUrl,
  ARCHIVE_LIST,
  useFolderPathContext,
  isCompressedPackage,
} from '../utils/index';


function Home() {
  const [fileList, setFileList] = useState()
  const [modalVisible, setModalVisible] = useState(false);
  const [folderInputValue, handleFolderInputValue] = useState('');
  const [folderNameIsDuplication, setFolderNameIsDuplication] = useState(false);// 通过接口判断文件夹名称是否重复
  const debouncedFolderInputValue = useDebounce(folderInputValue, 500);
  const [folderName, setFolderName] = useState();
  const {folderPathList, setFolderPathList} = useFolderPathContext();
  let history = useHistory();

  useEffect(()=>{
    initFolderName()
    initFileList()
  }, [])

  const handleFileUpload = (info)=>{
    if(!info.file.status){return}
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
    console.log(folderName);
    if(!folderName){
      setModalVisible(true);
    } else {
      setFolderPathList([folderName]);
      setFolderName(folderName);
    }
  }
  useEffect(()=>{
    if(debouncedFolderInputValue){
      getAllFolderNameList().then(response => {
        const {data: folderNameList} = response;
        if(folderNameList.includes(debouncedFolderInputValue)){
          setFolderNameIsDuplication(true);
        } else {
          console.log(debouncedFolderInputValue);
          setFolderPathList([debouncedFolderInputValue]);
          setFolderNameIsDuplication(false);
        }
      })
    }
  }, [debouncedFolderInputValue]);

  const handleClickOk = ()=>{
    createNewFolder(debouncedFolderInputValue).then((response)=>{
      if(response.code === 200){
        setModalVisible(false);
        localStorage.setItem('folderName', response.data);
        setFolderName(response.data);
      }
    })
  }

  const handleClickDown = async ()=>{
    const response = await getZipDownloadUrl(folderName);
    window.open(response.data);
  }

  const handleClickPreview = (file)=>{
    const {type, url} = file;
    console.log(file);
    const fileName = url.split(`/${folderPathList[0]}/`)[1].split('.')[0];

    if(ARCHIVE_LIST.includes(type)){
      setFolderPathList([...folderPathList, fileName]);
      history.push("/fileSystem");
    } else {
      window.open(url);
    }
  }

  // 上传之前做下检查
  // 检查点:
  // 1. 如果上传的是压缩包,那么只能是 zip
  const beforeUpload = (file, fileList)=>{
    let fileName = file.name;
    // 获取文件的格式
    let suffix = fileName.split('.')[1];
    let fileType = file.type;

    if(isCompressedPackage(fileType)){
      if(suffix !== 'zip'){
        message.error('目前只支持上传 zip 压缩包');
        return false
      } else {
        return true
      }
    } else {
      return true
    }
  }

  const onClickConsole = ()=>{
    history.push("/console");
  }

  // 点击分享按钮
  const handleClickShare = (file)=>{
    console.log(file);
  }

  // 自定义上传列表项
  const itemRender = (originNode, file, fileList, actions)=>{
    return (
      <div>
        <span onClick={()=>{handleClickPreview(file)}} style={{cursor: 'pointer'}}>{file.name}</span>
        <span onClick={()=>{handleClickShare(file)}} style={{cursor: 'pointer'}}>分享</span>
      </div>
    )
  }

  return (
    <div style={{display: 'flex', justifyContent: "center", alignItems: 'center'}}>
      <Upload
        onChange={handleFileUpload}
        action={`${UPLOAD_URL}/upload`}
        fileList={fileList}
        data={{
          folderName: folderName
        }}
        onPreview={handleClickPreview}
        beforeUpload={beforeUpload}
        itemRender={itemRender}
      >
        <Button icon={<UploadOutlined />} type='primary'>上传 HTML 或者图片</Button>
      </Upload>
      {window.IS_DEV ? <Button onClick={handleClickDown}>下载已上传文件</Button> : null}
      <Button onClick={onClickConsole}>进入管理界面</Button>
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
export default Home
