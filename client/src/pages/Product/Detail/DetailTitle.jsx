import React from 'react'
import {withRouter} from 'react-router-dom'
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

function DetailTitle(props){
	return (
		<div>
			<Button 
				type="link" 
				style={{padding:'0 10px'}} 
				onClick={()=>{
					props.history.goBack()
				}}
			>
				<ArrowLeftOutlined style={{fontSize:'1.2rem'}}/>
			</Button>
			<span>商品管理</span>
		</div>
	)
}
export default withRouter(DetailTitle)