import React from 'react';
import { Table } from 'antd';
import getDate from '../../utils/getDate'
const columns = [
  {
    title: '角色名称',
    dataIndex: 'name',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
	render: getDate
  },
  {
    title: '授权时间',
    dataIndex: 'auth_time',
	render: getDate
  },
  {
    title: '授权人',
    dataIndex: 'auth_name',
  },
];



 const OTable = (props) => {
	 const data = props.data
	 const setRole = props.setRole
	 const role = props.role
	 function onRow(record, index){
		return {
			 onClick: event => {
				setRole(record)
			 }
		};
	 }
  return (
    <div>
      <Table
	    bordered
        rowSelection={{
          type: 'radio',
          selectedRowKeys: [role._id],
		  onSelect:(record)=>{
			  setRole(record)
		  }
        }}
		onRow={onRow}
        columns={columns}
        dataSource={data}
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