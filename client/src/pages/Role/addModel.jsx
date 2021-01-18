import React from 'react'
import { Modal,Form,Input,message } from 'antd';
import {reqRoleAdd} from '../../api'

export default function AddModel(props){
	const {data,showAdd,setShowAdd,setData} = props
	const [formAdd] = Form.useForm();
	function addHandleOk(e){
		formAdd
		  .validateFields()
		  .then((values) => {
		      formAdd.resetFields();
			  addRole(values.roleName)
		  })
		  .catch((info) => {
		    console.log('Validate Failed:', info);
		  });
		setShowAdd(false)
	}
	function addCancel(){
		setShowAdd(false)
	}
	async function addRole(roleName){
		const result = await reqRoleAdd(roleName)
		if(result.status === 0){
			message.success('添加成功')
			const newData = result.data
			setData([...data,newData])
		}
	}
	return (
		<Modal
		  title="创建角色"
		  visible={showAdd}
		  onOk={addHandleOk}
		  onCancel={addCancel}
		>
			<Form form={formAdd} name="userForm" labelCol={{ span: 4}}
				wrapperCol={{span: 12}}>
				<Form.Item
				  name="roleName"
				  label="角色名称"
				  rules={[
					{
					  required: true,
					  message: '请输入角色名称!'
					},
				  ]}
				>
				  <Input />
				</Form.Item>
			</Form>
		</Modal>
	)
}