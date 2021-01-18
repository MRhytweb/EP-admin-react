import React from 'react'
import ReactEcharts from 'echarts-for-react';
import { Card } from 'antd';

export default class ChartPie extends React.Component{
	getOption=()=>{
		return {
			backgroundColor: '#2c343c',

			title: {
				text: '访问来源',
				left: 'center',
				top: 20,
				textStyle: {
					color: '#ccc'
				}
			},

			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
			},

			visualMap: {
				show: false,
				min: 80,
				max: 600,
				inRange: {
					colorLightness: [0, 1]
				}
			},
			series: [
				{
					name: '访问来源',
					type: 'pie',
					radius: '55%',
					center: ['50%', '50%'],
					data: [
						{value: 335, name: '直接访问'},
						{value: 310, name: '邮件营销'},
						{value: 274, name: '联盟广告'},
						{value: 235, name: '视频广告'},
						{value: 400, name: '搜索引擎'}
					].sort(function (a, b) { return a.value - b.value; }),
					roseType: 'radius',
					label: {
						color: 'rgba(255, 255, 255, 0.3)'
					},
					labelLine: {
						lineStyle: {
							color: 'rgba(255, 255, 255, 0.3)'
						},
						smooth: 0.2,
						length: 10,
						length2: 20
					},
					itemStyle: {
						color: '#c23531',
						shadowBlur: 200,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					},

					animationType: 'scale',
					animationEasing: 'elasticOut',
					animationDelay: function (idx) {
						return Math.random() * 200;
					}
				}
			]
		};
	}
	render(){
		return(
			<Card title="饼图1">
				<ReactEcharts
				  option={this.getOption()}
				  notMerge={true}
				  lazyUpdate={true}
				  theme={"theme_name"} />
			</Card>
		)
	}
}