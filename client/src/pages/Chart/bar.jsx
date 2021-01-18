import React from 'react'
import ReactEcharts from 'echarts-for-react';
import { Card,Button } from 'antd';

export default class ChartBar extends React.Component{
	state = {
		sales:[9, 43, 160, 257, 320, 250, 160],
		stock:[10, 52, 200, 334, 390, 330, 220]
	}
	updata=()=>{
		this.setState({
			sales:this.state.sales.map(item=>item+1),
			stock:this.state.stock.map(item=>item-1)
		})
	}
	getOption=(sales,stock)=>{
		return {
			color: ['#3398DB','#008c8c'],
			legend: {
				data: ['销量', '库存']
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {            // 坐标轴指示器，坐标轴触发有效
					type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: ['电脑', '手机', '图书', '男装', '女装', '童装', '食品'],
					axisTick: {
						alignWithLabel: true
					}
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: [
				{
					name: '销量',
					type: 'bar',
					barWidth: '30%',
					data: sales
				},
				{
					name: '库存',
					type: 'bar',
					barWidth: '30%',
					data: stock
				}
			]
		}
	}
	render(){
		return(
			<Card title={<Button type="primary" onClick={this.updata}>更新</Button>}>
				<Card title="柱状图1">
					<ReactEcharts
					  option={this.getOption(this.state.sales,this.state.stock)}
					  notMerge={true}
					  lazyUpdate={true}
					  theme={"theme_name"} />
				</Card>
			</Card>
		)
	}
}