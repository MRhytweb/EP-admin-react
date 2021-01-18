import React from 'react'
import {withRouter} from 'react-router-dom'
import { Button, Table } from 'antd';
import PropTypes from 'prop-types'
import {PAGE_SIZE} from '../../../config/productConfig'
import {reqProductUpdateStatus} from '../../../api'


 function ProductFrom(props){
	const {pageNum,match,history} = props
	
	const data = props.list
	const columns = [
	  {
	    title: '商品名称',
	    dataIndex: 'name',
		key: 'name',
		width: '12%'
	  },
	  {
	    title: '商品描述',
	    dataIndex: 'desc',
		key: 'desc',
		width: '60%'
	  },
	  {
	    title: '价格',
		key: 'price',
		render:(product)=>`￥${product.price}`
	  },
	  {
		  title:'状态',
		  key:'status',
		  render: (product) => {
			  const {status} = product
			  let newStatus = status===1?0:1
			  return (
			  <div>
				  <Button type="primary" 
					onClick={()=>{updateStatus(product,newStatus)}}>
					{status===1?'下架':'上架'}
				  </Button>
				  <span>{status===1?'在售':'售完'}</span>
			  </div>
			  )
		  }
	  },
	  {
	  	  title:'操作',
		  key:'action',
	  	  render: (product) =>{
			  return (
			  <div>
				  <Button type="link" onClick={()=>{
					  history.push(match.url+'/detail',product)
				  }}>详情</Button>
				  <Button type="link" onClick={()=>{
					  history.push(match.url+'/addupdate',{product,text:'修改商品'})
				  }}>修改</Button>
			  </div>
			  )
		  }
	  },
	];
	async function updateStatus(product,newStatus){
		const {_id} = product
		const res = await reqProductUpdateStatus({productId: _id,status:newStatus})
		if(res.status===0){
			props.refresh()
		}
	}
	function pageChange(page,pageSize){
		props.setPage(page)
	}
	return (
		<Table 
			bordered 
			columns={columns} 
			dataSource={data} 
			pagination={{ 
				current:pageNum,
				pageSize: PAGE_SIZE,
				total:props.total,
				onChange:(page,pageSize)=>{pageChange(page,pageSize)} 
			}}  
		/>
	)
}
ProductFrom.propTypes = {
	list:PropTypes.array.isRequired,
	total:PropTypes.number.isRequired,
	setPage:PropTypes.func.isRequired
}

export default withRouter(ProductFrom)