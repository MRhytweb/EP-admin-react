import React from 'react'
import { Button } from 'antd';


export default function Buttons(props){
	const { setShowModel } = props
	return (
		<div>
			<Button 
				type="primary" 
				onClick={()=>{
					setShowModel(true)
				}}
			>创建用户</Button>
		</div>
	)
}