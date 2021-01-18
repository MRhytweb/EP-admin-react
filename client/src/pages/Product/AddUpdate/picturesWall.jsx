import React,{useState,useEffect,forwardRef,useImperativeHandle} from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqImgDelete} from '../../../api'

const uploadButton = (
  <div>
	<PlusOutlined />
	<div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

const PicturesWall = forwardRef((props,ref)=>{
	const imgList = props.value||[]
	const [fileList,setFileList] = useState([])
	const [previewImage,setPreviewImage] = useState('')
	const [previewVisible,setPreviewVisible] = useState(false)
	useEffect(()=>{
		let fileList = imgList.map((item,index)=>({
			uid: -index,
			name: item,
			status: 'done',
			url:'http://localhost:5000/upload/'+item
		}))
		setFileList(fileList)
	},[])
	async function handlePreview(file){
		if (!file.url && !file.preview) {
		  file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview)
		setPreviewVisible(true)
	}
	async function handleChange({ file,fileList }){
		if(file.status === 'done'){
			if(file.response.status===0){
				message.success('图片上传成功')
				file = fileList[fileList.length-1]
				file.name = file.response.data.name
				file.uid = file.response.data.name
				file.url = file.response.data.url
				setFileList([...fileList])
			}else{
				message.error('图片上传失败')
			}
		}else if(file.status === 'removed'){
			const name = file.name
			const result = await reqImgDelete(name)
			if(result.status === 0){
				message.success('删除成功')
			}
			setFileList([...fileList])
		}
	}
	function handleCancel(){
		setPreviewVisible(false)
	}
	useImperativeHandle(ref,()=>({
		getImgName
	}))
	function getImgName(){
		return fileList.map(item=>{
			const name = item.name
			return name
		})
	}
	return (
		<div>
			<Upload
			  accept='image/*'
			  name='image'
			  action="/manage/img/upload"
			  listType="picture-card"
			  fileList={fileList} //已经上传的文件数组
			  onPreview={handlePreview} //点击预览时的回调
			  onChange={handleChange} //文件改变时的回调
			>
			  {fileList.length >= 3 ? null : uploadButton}
			</Upload>
			<Modal
			  visible={previewVisible}
			  footer={null}
			  onCancel={handleCancel}//取消的回调
			>
			  <img alt="example" style={{ width: '100%' }} src={previewImage} />
			</Modal>
		</div>
	)
})
export default PicturesWall
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}