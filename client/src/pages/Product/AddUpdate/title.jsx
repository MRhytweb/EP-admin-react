import React from 'react'
import {withRouter} from 'react-router-dom'
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

function OTitle(props){
	const {text} = props.location.state
	return (
		<div>
			<Button type="link" onClick={()=>{
				props.history.goBack()
			}}>
				<ArrowLeftOutlined />
			</Button>
			<span>{text}</span>
		</div>
	)
}
export default withRouter(OTitle)