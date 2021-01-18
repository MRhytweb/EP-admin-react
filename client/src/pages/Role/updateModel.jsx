import React,{useState,useEffect} from 'react'
import { Modal,Form,Input,message,Tree } from 'antd';
import {connect} from 'react-redux'
import {reqRoleUpdate} from '../../api'
import menuList from '../../config/menuConfig'

function UpdateModel(props){
	const {showSet, setShowSet,targetRole } = props
	const userName = props.user.username||''
	const [expandedKeys, setExpandedKeys] = useState(targetRole.menus);
	const [checkedKeys, setCheckedKeys] = useState(targetRole.menus);
	const [selectedKeys, setSelectedKeys] = useState([]);
	const [autoExpandParent, setAutoExpandParent] = useState(true);
	const setHandleOk = async ()=>{
		const obj = targetRole
		obj.menus=checkedKeys
		obj.auth_time=new Date().getTime()
		obj.auth_name=userName
		const result = await reqRoleUpdate(obj)
		if(result.status===0){
			message.success('权限设置成功')
		}
		setShowSet(false)
	}
	const setCancel = (e)=>{
	    setShowSet(false)
	};
	
	//展开/收起节点时触发
	const onExpand = (expandedKeys) => {
		setExpandedKeys(expandedKeys);
		setAutoExpandParent(false);
	};
	//点击复选框触发
	const onCheck = (checkedKeys) => {
		setCheckedKeys(checkedKeys);
	};
	//点击树节点触发
	const onSelect = (selectedKeys, info) => {
		setSelectedKeys(selectedKeys);
	};
	//id变化时更新menus  
	useEffect(()=>{
		setExpandedKeys(targetRole.menus)
		setCheckedKeys(targetRole.menus)
	},[targetRole._id])
	
	return (
		<Modal
		  title="设置权限"
		  visible={showSet}
		  onOk={setHandleOk}
		  onCancel={setCancel}
		>
			<Form.Item 
				labelCol={{ span: 6}} 
				wrapperCol={{span: 12}}
				label="角色名称"
			>
				<Input value={targetRole.name} disabled/>
			</Form.Item>
			
			<Tree
			  checkable
			  onExpand={onExpand}
			  expandedKeys={expandedKeys}
			  autoExpandParent={autoExpandParent}
			  onCheck={onCheck}
			  checkedKeys={checkedKeys}
			  onSelect={onSelect}
			  selectedKeys={selectedKeys}
			  treeData={menuList}
			/>
		</Modal>
	)
}

export default connect(
	state=>({
		user:state.user
	})
)(UpdateModel)