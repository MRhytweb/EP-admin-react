import React,{useState,useEffect} from 'react'
import { Card, List } from 'antd';
import DetailTitle from './DetailTitle'
import './index.less'
import {reqCategoryInfo} from '../../../api'
import {IMG_BASE_URL} from '../../../config/productConfig'

const {Item} = List
export default function Detail(props){
	const {state} = props.location
	const [cateName,setCateName] = useState('')
	const [pCateName,setPCateName] = useState('')
	useEffect(()=>{
		if(state.pCategoryId === 0){
			(async function(){
				const result = await reqCategoryInfo(state.categoryId)
				setCateName(result.data.name)
			})()
		}else{
			(async function(){
				const results = await Promise.all([reqCategoryInfo(state.pCategoryId),reqCategoryInfo(state.categoryId)])
				setPCateName(results[0].data.name)
				setCateName(results[1].data.name)
			})()
		}
	},[state.pCategoryId,state.categoryId])
	
	return (
		<Card title={<DetailTitle/>} className='detail'>
		  <List bordered >
			<Item>
				<span className='left'>商品名称:</span>
				<span>{state.name}</span>
			</Item>
			<Item>
				<span className='left'>商品描述:</span>
				<span>{state.desc}</span>
			</Item>
			<Item>
				<span className='left'>商品价格:</span>
				<span>{state.price}元</span>
			</Item>
			<Item>
				<span className='left'>所属分类:</span>
				{state.pCategoryId === 0?<span>{cateName}</span>:<span>{pCateName+'-->'+cateName}</span>}
			</Item>
			<Item>
				<span className='left'>商品图片:</span>
				
				{state.imgs.map(item=><img key={item} src={IMG_BASE_URL+item} alt='图片'/>)}
			</Item>
			<Item>
				<span className='left'>商品详情:</span>
				<span dangerouslySetInnerHTML={{ __html:state.detail }}></span>
			</Item>
		  </List>
		</Card>
	)
}