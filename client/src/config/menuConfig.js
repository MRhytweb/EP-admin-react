import React from 'react'
import {
  HomeOutlined,AppstoreOutlined, UserOutlined, AreaChartOutlined, SafetyCertificateOutlined,PieChartOutlined,BarChartOutlined,BarsOutlined,BarcodeOutlined,
} from '@ant-design/icons';
export default [
	{
		key:'/home',
		icon:<HomeOutlined/>,
		title:'首页',
		//就算不设置该权限也能看见
		isPublic:true,
	},
	{
		key:'/products',
		icon:<AppstoreOutlined/>,
		title:'商品',
		children:[
			{
				key:'/category',
				icon:<BarsOutlined/>,
				title:'品类管理'
			},
			{
				key:'/product',
				icon:<BarcodeOutlined/>,
				title:'商品管理'
			}
		]
	},
	{
		key:'/user',
		icon:<UserOutlined/>,
		title:'用户管理'
	},
	{
		key:'/role',
		icon:<SafetyCertificateOutlined/>,
		title:'角色管理'
	},
	{
		key:'/chart',
		icon:<AreaChartOutlined/>,
		title:'图形列表',
		children:[
			{
				key:'/chart/bar',
				icon:<BarChartOutlined/>,
				title:'柱形图'
			},
			{
				key:'/chart/line',
				icon:<AreaChartOutlined/>,
				title:'折线图'
			},
			{
				key:'/chart/pie',
				icon:<PieChartOutlined/>,
				title:'饼图'
			}
		]
	},
]