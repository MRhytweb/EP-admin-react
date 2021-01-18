import React from 'react'
import { Button } from 'antd';


export default function Buttons(props){
	const {targetRole,setShowAdd,setShowSet} = props
	return (
		<div>
			<Button 
				type="primary" 
				style={{marginRight:10}}
				onClick={()=>{
					setShowAdd(true)
				}}
			>创建角色</Button>
			<Button 
				type="primary" 
				disabled={!targetRole._id} 
				onClick={()=>{
					setShowSet(true)
				}}
			>
				设置角色权限
			</Button>
		</div>
	)
}