import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import './index.less'
import logo from './img/logo.jpg'
import { Form, Input, Button, message} from 'antd';
import {login} from '../../redux/actions.js'

import {reqLogin} from '../../api'
import memory from '../../utils/memory'
import {localSet} from '../../utils/localStorage'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
class Login extends React.Component{
	// onFinish = async(values) =>{
	// 	const result = await reqLogin(values.username,values.password)
	// 	if(result.status === 0){
	// 		message.success('登录成功')
	// 		memory.user = result.data
	// 		localSet(result.data)
	// 		this.props.history.replace('/home')
	// 	}else{
	// 		message.error(result.msg)
	// 	}
	// };
	onFinish = (values)=>{
		this.props.login(values.username,values.password)
	}
	onFinishFailed=errorInfo=>{
	    console.log('Failed:', errorInfo);
	};
	render(){
		const user = this.props.user
		if(user._id){
			return (<Redirect to={'/home'}/>)
		}
		return (
			<div className='login'>
				<header className='login-header'>
					<img src={logo} alt='logo'/>
					<h1>电商管理平台</h1>
				</header>
				<section className='login-content'>
					<h2>用户登录</h2>
					<Form
					  {...layout}
					  name="basic"
					  initialValues={{ remember: true }}
					  onFinish={this.onFinish}
					  onFinishFailed={this.onFinishFailed}
					>
					  <Form.Item
						label="用户名"
						name="username"
						rules={[{ required: true, message: '请填写用户名!' }]}
						initialValue='admin'
					  >
						<Input />
					  </Form.Item>
				
					  <Form.Item
						label="密码"
						name="password"
						rules={[{ required: true, message: '请填写密码!' },
								{ max: 12, message: '密码过长!' },
								{ min: 4, message: '密码过短!' },
								{ pattern: /^[\w]*$/, message: '密码由字母、数字或下划线组成!' }
						]}
						style={{height:'70px',marginBottom:'0px'}}
					  >
						<Input.Password />
					  </Form.Item>
					  <Form.Item {...tailLayout}>
						<Button type="primary" htmlType="submit">
						  登录
						</Button>
					  </Form.Item>
					</Form>
				</section>
			</div>
		)
	}
}


export default connect(
	state=>({user:state.user}),
	{login}
)(Login)