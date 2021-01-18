import React,{useEffect} from 'react'
import {withRouter} from "react-router-dom";
import {connect } from 'react-redux'
import {logout} from '../../redux/actions'
import { Modal,Form,Input,message,Select } from 'antd';
import {reqUserAdd ,reqUserUpdate} from '../../api'

const { Option } = Select;

function AddAndUpdateModel(props){
	const {showModel,setShowModel,selectUser,roles,getUsersData} = props
	
	const [formUser] = Form.useForm();
	useEffect(() => {
		let userData = selectUser._id?selectUser:{}
		if(!showModel){
			userData = {}
		}
	    formUser.setFieldsValue(userData);
	}, [showModel,formUser,selectUser])
	function addHandleOk(e){
		formUser
		  .validateFields()
		  .then(async(values) => {
		      formUser.resetFields();
			  if(selectUser._id){
				  //修改用户
				  values._id = selectUser._id
				  const result = await reqUserUpdate(values)
				  if(result.status === 0){
					  message.success('修改用户成功')
					  if(selectUser._id === props.user._id){
						  props.logout()
						  return 
					  }
				  }else{
					  message.error('修改用户失败')
				  }
			  }else{
				  //新增用户
				 const result = await reqUserAdd(values)
				 if(result.status === 0){
					  message.success('添加用户成功')
				 } 
			  }
			  getUsersData()
			  setShowModel(false)
		  })
		  .catch((info) => {
		    console.log('Validate Failed:', info);
		  });
		
	}
	function addCancel(){
		formUser.resetFields();
		setShowModel(false)
	}
	function createOptions(){
		return roles.map(item=><Option value={item._id} key={item._id}>{item.name}</Option>)
	}
	return (
		<Modal
		  title={selectUser._id?"修改用户":"添加用户"}
		  visible={showModel}
		  onOk={addHandleOk}
		  onCancel={addCancel}
		  getContainer={false}
		  initialValues={{}}
		>
			<Form 
				form={formUser} 
				name="userForm" 
				labelCol={{ span: 8}}
				wrapperCol={{span: 12}}
			>
				<Form.Item
				  name="username"
				  label="用户名"
				  rules={[
					{
					  required: true,
					  message: '请输入用户名!'
					},
				  ]}
				>
				  <Input />
				</Form.Item>
				
				{selectUser._id?null:(
					<Form.Item
					  name="password"
					  label="密码"
					  rules={[
						{ required: true,message: '请输入密码!'},
						{ max: 12, message: '密码过长!' },
						{ min: 4, message: '密码过短!' },
						{ pattern: /^[\w]*$/, message: '密码由字母、数字或下划线组成!' }
					  ]}
					>
					  <Input />
					</Form.Item>
				)}
				
				<Form.Item
				  name="phone"
				  label="手机号"
				  rules={[
					{required: true, message: '请输入手机号!'},
					{pattern:/^1[3|4|5|7|8][0-9]{9}$/,message:'手机号码格式不正确！'}
				  ]}
				>
				  <Input />
				</Form.Item>
				<Form.Item
				  name="email"
				  label="邮箱"
				  rules={[
					{ required: true,message: '请输入邮箱!'},
					{ pattern:/^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,message:'邮箱格式不正确'}
				  ]}
				>
				  <Input />
				</Form.Item>
				<Form.Item
				  name="role_id"
				  label="角色"
				  rules={[
					{
					  required: true,
					  message: '请选择角色名称!'
					},
				  ]}
				>
				  <Select >
					{createOptions()}
				  </Select>
				</Form.Item>
			</Form>
		</Modal>
	)
}


export default connect(
	state=>({user:state.user}),
	{logout}
)(withRouter(AddAndUpdateModel))
