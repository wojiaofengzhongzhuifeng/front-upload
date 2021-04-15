import axios from 'axios';
import {useState, useEffect} from 'react';
import {message} from 'antd';

// 变量
let UPLOAD_URL;
if(process.env.REACT_APP_ENV === 'dev'){
  UPLOAD_URL = 'http://localhost:3003'
} else {
  UPLOAD_URL = 'http://canyou.rickricks.com:7777'
}
let ARCHIVE_LIST = ['application/zip'];


// 请求方法
const instance = axios.create({
  baseURL: UPLOAD_URL,
  timeout: 1000,
});
async function getAllFolderNameList(){
  const response = await instance.get('/allFolderName')
  if(response.data.code === 200){
    return response.data;
  } else {
    message.error(response.data.message);
  }
}
async function createNewFolder(newFolderName){
  const response = await instance.post('/folderName', {
    folderName: newFolderName
  });
  if(response.data.code !== 200){
    // return response.data.data;
    message.error(response.data.message);
  }
  return response.data;
}

async function getZipDownloadUrl(folderName){
  const response = await instance.get(`/zip?folderName=${folderName}`);
  if(response.data.code !== 200){
    message.error(response.data.message);
  }
  return response.data;
}

// 自定义 hooks
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};


export {UPLOAD_URL, instance, getAllFolderNameList, useDebounce, createNewFolder, getZipDownloadUrl, ARCHIVE_LIST};