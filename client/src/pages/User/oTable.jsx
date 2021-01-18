import React from 'react';
import { Table, Button, message} from 'antd';
import getDate from '../../utils/getDate'
import {reqUserDelete} from '../../api'



 const OTable = (props) => {
	 const {users ,roles ,setSelectUser ,setShowModel,getUsersData} = props
	 const columns = [
	   {
	     title: '用户名',
	     dataIndex: 'username',
	   },
	   {
	     title: '邮箱',
	     dataIndex: 'email',
	   },
	   {
	     title: '电话',
	     dataIndex: 'phone',
	   },
	   {
	     title: '注册时间',
	     dataIndex: 'create_time',
	 	render: getDate
	   },
	   {
	     title: '所属角色',
	 	dataIndex:'role_id',
	 	render:(role_id)=>{
	 		const role = roles.find(item=>item._id === role_id)
			const name = role && role.name
	 		return <span>{name}</span>
	 	}
	   },
	   {
	     title: '操作',
	 	render:(role)=>(
	 		<div>
	 			<Button 
					type="link" 
					onClick={()=>{
						setSelectUser(role)
						setShowModel(true)
					}}
				>修改</Button>
	 			<Button 
					type="link" 
					onClick={async ()=>{
						const result = await reqUserDelete(role._id)
						if(result.status ===0){
							message.success('删除成功')
							getUsersData()
						}
					}}
				>删除</Button>
	 		</div>
	 	)
	   },
	 ];
  return (
    <div>
      <Table
	    bordered
        columns={columns}
        dataSource={users}
		rowKey='_id'
		pagination={{
		  pageSizeOptions:['3','5','8'],
		  defaultPageSize:3,
		  showSizeChanger:true,
		  showQuickJumper:true,
		  hideOnSinglePage:true}}
		/>
    </div>
  );
};
export default OTable