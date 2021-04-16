import FileSystemComponent from '../component/fileSystem/fileSystem';
import {useFolderPathContext} from "../utils";

function FileSystem(){
  const {folderPathList, setFolderPathList} = useFolderPathContext();
  return (
    <div>
      <h1>FileSystem</h1>
      <p>当前选择的 zip 为{folderPathList[1]}</p>
      <FileSystemComponent />
    </div>
  )
}
export default FileSystem