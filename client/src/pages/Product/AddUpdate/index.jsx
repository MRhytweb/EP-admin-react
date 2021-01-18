import React,{useState,useEffect,useRef} from 'react'
import OTitle from './title'
import PicturesWall from './picturesWall'
import RichTextBox from './richTextBox'
import { Card, Form, Input, Cascader, Button, message } from 'antd';
import {reqCategoryList,reqProductAdd,reqProductUpdate} from '../../../api'

const {Item} = Form
const { TextArea } = Input;

export default function AddUpdate(props){
	let {product,text} = props.location.state
	const [form] = Form.useForm()
	const pictureRef = useRef()
	const richTextRef = useRef()
	const [options,setOptions] = useState([])
	const [choose,setChoose] = useState([])
	
	const formItemLayout = {
	  labelCol: {
	    xs: { span: 24 },
	    sm: { span: 3 },
	  },
	  wrapperCol: {
	    xs: { span: 24 },
	    sm: { span: 8 },
	  },
	};
	async function onFinish(value){
		value.imgs = pictureRef.current.getImgName()
		value.detail = richTextRef.current.getRichBox()
		if(value.classify.length<2){
			value.pCategoryId = '0'
			value.categoryId = value.classify[0]
		}else{
			value.pCategoryId = value.classify[0]
			value.categoryId = value.classify[1]
		}
		let result
		
		if(text === '修改商品'){
			value._id = product._id
			result = await reqProductUpdate(value)
		}else{
			result = await reqProductAdd(value)
		}
		if(result.status === 0){
			message.success('提交完成')
			props.history.goBack()
		}
	}
	
	//级联部分
	useEffect(()=>{
		(async()=>{
			//创建时
			let options
			const result = await reqCategoryList(0)
			if(result.status === 0){
				options = result.data.map(item=>({
					label:item.name,
					value:item._id,
					isLeaf:false
				}))
				setOptions(options)
			}
			//修改时
			if(product){
				let defaultC = []
				if(product.pCategoryId === '0'){
					defaultC.push(product.categoryId)
				}else{
					defaultC.push(product.pCategoryId)
					defaultC.push(product.categoryId)
					//遍历options，找到对应product.pCategoryId的数据，在上面加上children
					const targetOption = options.filter(item=>{
						return item.value === product.pCategoryId
					})[0]
					const result = await reqCategoryList(targetOption.value)
					
					if(result.status === 0){
						if(result.data.length>0){
							targetOption.children = result.data.map(item=>({
								value:item._id,
								label:item.name,
								isLeaf:true
							}))
						}else{
							targetOption.isLeaf = true
						}
						setOptions([...options])
					}
				}
				//设置默认选项的value,这里initialValues 不能被 setState 动态更新，需要用 setFieldsValue 来更新
				form.setFieldsValue({ classify: defaultC })
			}
		})()
	},[])
	function onChange(value, selectedOptions){
		setChoose(value)
	}
	async function loadData(selectedOptions){
	    const targetOption = selectedOptions[selectedOptions.length - 1];
	    targetOption.loading = true;
	    const result = await reqCategoryList(targetOption.value)
	     targetOption.loading = false;
		if(result.status === 0){
			if(result.data.length>0){
				targetOption.children = result.data.map(item=>({
					value:item._id,
					label:item.name,
					isLeaf:true
				}))
			}else{
				//二级列表的长度为0
				targetOption.isLeaf = true
			}
			setOptions([...options])
		}
	};
	return (
		<Card title={<OTitle/>}>
		  <Form
			{...formItemLayout}
			form={form}
			name="register"
			onFinish={onFinish}
			initialValues={{...product}}
			scrollToFirstError
		  >
			  <Item
				name="name"
				label="商品名称"
				rules={[
				  {
					required: true,
					message: '请填写商品名称',
				  },
				]}
			  >
				<Input />
			  </Item>
			  <Item
				name="desc"
				label="商品描述"
				rules={[
				  {
					required: true,
					message: '请填写商品描述',
				  },
				]}
			  >
				<TextArea rows={1} placeholder='请输入商品描述'/>
			  </Item>
			  <Item
				name="price"
				label="商品价格"
				rules={[
				  {
					required: true,
					message: '请填写商品价格',
				  },
				  ({ getFieldValue }) => ({
					  validator(rule, value) {
						if (!value || 0 < value) {
						  return Promise.resolve();
						}
						return Promise.reject('价格必须为大于0的数字!');
					  },
					}),
				]}
			  >
				<Input prefix="￥" suffix="RMB" />
			  </Item>
			  <Item
				name="classify"
				label="商品分类"
				rules={[
				  {
					required: true,
					message: '请选择商品分类',
				  },
				]}
			  >
				<Cascader
					options={options}
					loadData={loadData}
					onChange={onChange}
					changeOnSelect
				/>
			  </Item>
			  <Item
				name="imgs"
				label="商品图片"
				labelCol={{span:3}}
				wrapperCol={{span:20}}
			  >
				<PicturesWall ref={pictureRef}/>
			  </Item>
			  <Item
				name="detail"
				label="商品详情"
				labelCol={{span:3}}
				wrapperCol={{span:20}}
			  >
			  	<RichTextBox ref={richTextRef}/>			
			  </Item>
				
			  <Item>
				  <Button type="primary" htmlType="submit">
					提交
				  </Button>
			  </Item>
		  </Form>
		</Card>
	)
}

