import React from 'react'
import {withRouter} from 'react-router-dom'
import {Button} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function AddButton(props){
	const state={
		text:'添加商品'
	}
	return (
		<Button 
		  type="primary" 
		  icon={<PlusOutlined />} 
		  onClick={()=>{
			props.history.push('/product/addupdate',state)
		}}>添加</Button>
	)
}
export default withRouter(AddButton)

