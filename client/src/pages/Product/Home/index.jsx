import React,{useState,useEffect} from 'react'
import { Card } from 'antd';
import {reqProductList,reqProduct} from '../../../api'
import {PAGE_SIZE} from '../../../config/productConfig'

import SearchBar from './SearchBar'
import AddButton from './AddButton'
import ProductFrom from './ProductFrom'


export default function Home(props){
	const [Plist,setPlist] = useState([])
	const [total,setTotal] = useState(0)
	const [pageNum,setPageNum] = useState(1)
	const [key,setKey] = useState('')
	const [select,setSelect] = useState('productName')
	
	
	//得到普通的商品列表
	async function getProduct(pageSize,pageNum){
		const result = await reqProductList({
			pageSize,
			pageNum
		})
		if(result.status === 0){
			let {total,list} = result.data
			list = list.map(item=> {
				item.key=item._id
				return item
			})
			setPlist(list)
			setTotal(total)
		}
	}
	
	//得到选中的商品列表
	async function getProductSelect(pageSize,pageNum,searchType,key){
		const result = await reqProduct({
			pageSize,
			pageNum,
			[searchType]:key
		})
		if(result.status === 0){
			let {total,list} = result.data
			list = list.map(item=> {
				item.key=item._id
				return item
			})
			setPlist(list)
			setTotal(total)
		}
	}
	
	useEffect(()=>{
		if(key === ''){
			getProduct(PAGE_SIZE,pageNum)
		}else{
			getProductSelect(PAGE_SIZE,pageNum,select,key)
		}
	},[pageNum,key,select])
	
	return (
		<Card 
			title={<SearchBar 
				setbarKey={key=>setKey(key)}
				setbarSearch={select=>setSelect(select)}
				setPage={pageNum=>setPageNum(pageNum)}
			/>} 
			extra={<AddButton 
			/>}
		>
			<ProductFrom 
				list={Plist} 
				total={total} 
				pageNum={pageNum}
				setPage={pageNum=>setPageNum(pageNum)}
				refresh={()=>{getProductSelect(PAGE_SIZE,pageNum,select,key)}}
			/>
		</Card>
	)
}
