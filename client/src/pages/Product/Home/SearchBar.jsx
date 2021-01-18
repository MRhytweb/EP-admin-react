import React from 'react'
import {Form,Row ,Select, Input, Button} from 'antd';
import PropTypes from 'prop-types'

const { Option } = Select;
const { Item} =Form
export default function SearchBar(props){
	function onFinish(value){
		const {productSelect,productKey} = value
		props.setbarKey(productKey)
		props.setbarSearch(productSelect)
		props.setPage(1)
	}
	return(
		<Form onFinish={onFinish} initialValues={{'productSelect':'productName'}}>
			<Row>
				<Item name="productSelect" style={{margin:0}}>
					<Select style={{ width: 120 }}>
					  <Option value="productName">按名称搜索</Option>
					  <Option value="productDesc">按描述搜索</Option>
					</Select>
				</Item>
				<Item name="productKey" style={{margin:0}}>
					<Input placeholder="关键字" style={{ width: 120, margin:'0 10px' }}/>
				</Item>
				<Item style={{margin:0}}>
					<Button type="primary" htmlType="submit">搜索</Button>
				</Item>
			</Row>
			
		</Form>
	)
}

SearchBar.propTypes = {
	setbarKey:PropTypes.func.isRequired,
	setbarSearch:PropTypes.func.isRequired,
	setPage:PropTypes.func.isRequired
}