import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../redux/actions'

import { Modal } from 'antd';
import './index.less'
import memory from '../../utils/memory'
import {localRemove} from '../../utils/localStorage'
import getDate from '../../utils/getDate'
import {reqWeather} from '../../api'
import menuConfig from '../../config/menuConfig'

const { confirm } = Modal;
class Header extends React.Component{
	state = {
		curTime:'',
		dayPictureUrl:'',
		weather:''
	}
	getTitle=(configArr,path)=>{
		let title
		configArr.forEach(item=>{
			if(item.key === path){
				title = item.title
			}else if(item.children){
				//在‘/product/addupdate’中找到‘/product’的位置
				const cItem = item.children.find(cItem=>path.indexOf(cItem.key)===0)
				if(cItem){
					title = cItem.title
				}
			}
		})
		return title
	}
	logout=()=>{
		confirm({
		    title: '您确定要登出吗?',
		    onOk:()=>{
		      this.props.logout()
		    }
		  });
	}
	async componentDidMount(){
		const weatherInfo = await reqWeather('杭州')
		this.setState({
			dayPictureUrl:weatherInfo.dayPictureUrl,
			weather:weatherInfo.weather
		})
		this.timer = setInterval(()=>{
			this.setState({
				curTime:getDate(Date.now())
			})
		},1000)
	}
	componentWillUnmount(){
		clearInterval(this.timer)
	}
	render(){
		const user = this.props.user.username
		const path = this.props.location.pathname
		//let title = this.getTitle(menuConfig,path)
		
		
		return (
			<div className='header'>
				<div className='header-top'>
					<span>欢迎使用,{user}</span>
					<button onClick={this.logout}>退出</button>
				</div>
				<div className='header-bottom'>
					<div className='b-left'>{this.props.headTitle}</div>
					<div className='b-right'>
						<span>{this.state.curTime}</span>
						<img src={this.state.dayPictureUrl} alt='天气图标'/>
						<span>{this.state.weather}</span>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(
	state => ({headTitle: state.headTitle,user:state.user}),
	{logout}
)(withRouter(Header))
