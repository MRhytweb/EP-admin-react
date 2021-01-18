import React from 'react'
import { Card, Table, Space, Button} from 'antd';
import {PlusOutlined, ArrowRightOutlined} from '@ant-design/icons'
import {reqCategoryList, reqCategoryAdd, reqCategoryUpdate} from '../../api'
import AddModal from './AddModal'
import UpDateModal from './UpDateModal'

export default class Category extends React.Component{
	state = {
		data:[],
		subData:[],
		title:'一级分类列表',
		isLoading:false,
		reqId:'0',
		modalStatus:0,//为0时都隐藏，为1时显示addModal，为2时显示updateModal
	}
	//添加框部分
	showAdd = ()=>{
		this.setState({
			modalStatus:1
		})
	}
	addModal = async(values) => {
	  //隐藏
	  this.setState({
	  	modalStatus:0
	  })
	  const result = await reqCategoryAdd(values)
	  if(result.status === 0){
		  if(values.parentId === this.state.reqId){
			  this.getDateList()
			  return 
		  }
		  if(values.parentId === '0'){
			  const data = await reqCategoryList('0')
			  if(data.status === 0){
				  this.setState({
				  	data:data.data,
				  })
			  }
		  }
	  }
	  
	}
	//更改框部分
	showUpdate = (obj)=>{
		this.clickObj = obj
		this.setState({
			modalStatus:2
		})
	}
	updateModal = async(value)=>{
		//隐藏
		this.setState({
			modalStatus:0
		})
		//发送请求
		const categoryId = this.clickObj._id
		const categoryName = value.categoryName
		const result = await reqCategoryUpdate(categoryId,categoryName)
		//成功后重新渲染
		if(result.status === 0){
			this.getDateList()
		}
	}
	
	hiddenModal = ()=>{
		this.setState({
			modalStatus:0
		})
	}
	
	createColumns(){
		this.columns = [
		  {
		    title: '分类名称',
		    dataIndex: 'name',
		    key: '_id',
		  },
		  {
		    title: '操作',
		    key: 'action',
			width:200,
		    render: (obj) => (
		      <Space size="middle">
				<Button type="link" onClick={()=>{this.showUpdate(obj)}}>修改分类</Button>
				{this.state.reqId === '0' ? 
				<Button type="link" onClick={()=>{this.upDataReqIdAndTitle(obj)}}>查看子分类</Button> : null}
		      </Space>
		    ),
		  },
		];
	}
	changeCategory=(e)=>{
		console.log(e.target.value)
	}
	upDataReqIdAndTitle(obj){
		this.setState({
			title:(<Space>
				<Button type="link" onClick={this.showFirstList}>一级分类列表</Button>
				<ArrowRightOutlined />
				<span>{obj.name}</span>
			</Space>),
			reqId:obj._id
			},()=>{
				this.getDateList()
			})
	}
	showFirstList=()=>{
		this.setState({
			title:'一级分类列表',
			reqId:'0'
		})
	}
	async getDateList(){
		this.setState({
			isLoading:true
		})
		const data = await reqCategoryList(this.state.reqId)
		this.setState({
			isLoading:false
		})
		if(data.status !== 0) return
		if(this.state.reqId === '0'){
			this.setState({
				data:data.data,
			})
		}else{
			this.setState({
				subData:data.data,
			})
		}
		
	}
	componentDidMount(){
		this.createColumns()
		this.getDateList()
	}
	render(){
		const clickObj = this.clickObj||{}
		return(
			<Card
			  type="inner"
			  title={this.state.title}
			  extra={<Button type="primary" icon={<PlusOutlined />} onClick={this.showAdd}>添加</Button>}
			>
			  <Table 
			  columns={this.columns} 
			  dataSource={this.state.reqId === '0'?this.state.data:this.state.subData} 
			  bordered 
			  loading = {this.state.isLoading}
			  rowKey='_id'
			  pagination={{
				  pageSizeOptions:['3','5','8'],
				  defaultPageSize:3,
				  showSizeChanger:true,
				  showQuickJumper:true,
				  hideOnSinglePage:true}}
			  />
			 
			  <AddModal
			    visible={this.state.modalStatus === 1}
			    onCreate={this.addModal}
			    onCancel={this.hiddenModal}
				data={this.state.data}
				reqId={this.state.reqId}
			  />
			  <UpDateModal
			    visible={this.state.modalStatus === 2}
			    onCreate={this.updateModal}
			    onCancel={this.hiddenModal}
				defaultText = {clickObj.name}
			  />
			</Card>
		)
	}
}