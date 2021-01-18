import React,{useState,useEffect} from 'react'
import { Card } from 'antd';
import OButton from './oButton'
import OTable from './oTable'
import AddAndUpdate from './addAndUpdateModel'
import { reqUserList } from '../../api'

export default function User(props){
	const [showModel,setShowModel] = useState(false)
	const [users,setUsers] = useState([])
	const [roles,setRoles] = useState([])
	const [selectUser,setSelectUser] = useState({})
	const getUsersData = async()=>{
		const result = await reqUserList()
		if(result.status===0){
			setUsers(result.data.users)
			setRoles(result.data.roles)
		}
	}
	useEffect(()=>{
		getUsersData()
	},[])
	useEffect(()=>{
		if(!showModel){
			setSelectUser({})
		}
	},[showModel])
	return(
		<Card title={<OButton setShowModel={setShowModel}/>}>
			<OTable 
				users={users} 
				roles={roles} 
				setShowModel={setShowModel} 
				setSelectUser={setSelectUser}
				getUsersData={getUsersData}
			/>
			<AddAndUpdate 
				showModel={showModel} 
				setShowModel={setShowModel}
				selectUser={selectUser}
				roles={roles}
				getUsersData={getUsersData}
			/>
		</Card>
	)
}