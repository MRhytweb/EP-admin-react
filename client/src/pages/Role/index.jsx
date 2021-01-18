import React,{useState,useEffect} from 'react'
import { Card } from 'antd';
import Buttons from './Buttons'
import OTable from './oTable'
import AddModel from './addModel'
import UpdateModel from './updateModel'
import {reqRoleList} from '../../api'

export default function Role(props){
	const [data,setData] = useState([])
	const [targetRole,setTargetRole] = useState({})
	const [showAdd,setShowAdd] = useState(false)
	const [showSet,setShowSet] = useState(false)
	useEffect(()=>{
		(async()=>{
			const result = await reqRoleList()
			if(result.status === 0){
				setData(result.data)
			}
		})()
	},[])
	
	return (
		<div>
			<Card 
				title={<Buttons 
					targetRole={targetRole}
					setShowAdd={setShowAdd}
					setShowSet={setShowSet}
				/>}
			>
			  <OTable 
				data={data} 
				role={targetRole}
				setRole={setTargetRole}
			  />
			</Card>
			<AddModel 
				data={data}
				showAdd={showAdd}
				setData={setData}
				setShowAdd={setShowAdd}
			/>
			<UpdateModel 
				showSet={showSet}
				setShowSet={setShowSet}
				targetRole={targetRole}
			/>
			
		</div>
	)
}