import React from 'react'
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import { Menu } from 'antd';

import './index.less'
import logo from '../../assets/img/logo.jpg'
import menuList from '../../config/menuConfig'
import { setHeadTitle } from '../../redux/actions'

const { SubMenu } = Menu;

class Sider extends React.Component{
	handleClick = e => {
	    //console.log('sider click ', e);
	};
	hasAuth(item){
		const {key,isPublic} = item
		const username = this.props.user.username
		const menus = this.props.user.role.menus
		if(username === 'admin'||isPublic || menus.indexOf(key)>=0){
			return true
		}else{
			return false
		}
	}
	randerMenu(menuList){
		return menuList.map(item=>{
			//判断是否有权限
			if(!this.hasAuth(item)){
				return
			}
			if(!item.children){
				const path = this.props.location.pathname
				if(item.key === path || path.indexOf(item.key)===0){
					this.props.setHeadTitle(item.title)
				}
				return (
					<Menu.Item key={item.key}>
						<Link 
							to={item.key} 
							onClick={()=>{
								this.props.setHeadTitle(item.title)
							}}>
							<span >
								{item.icon}
								<span>{item.title}</span>
							</span>
						</Link>
					</Menu.Item>
				)
			}else{
				return (
					<SubMenu
					  key={item.key}
					  title={
						<span>
						  {item.icon}
						  <span>{item.title}</span>
						</span>
					  }
					>
						{this.randerMenu(item.children)}
					</SubMenu>
				)
			}
		})
	}
	render(){
		const path = this.props.location.pathname
		const openKeyArr=[]
		for(let item of menuList){
			if(item.children){
				for(let subItem of item.children){
					if((subItem.key === path || path.indexOf(subItem.key)===0) && !openKeyArr.includes(item.key)){
						openKeyArr.push(item.key)
					}
				}
			}
		}
		let selectPath
		for(let item of menuList){
			if(path === item.key){
				selectPath = item.key
			}else if(item.children){
				const cItem = item.children.find(cItem=>path.indexOf(cItem.key)===0)
				if(cItem){
					selectPath = cItem.key
				}
			}
		}
		
		return (
			<div className='sider'>
				<Link to='/' className='sider-header'>
					<img src={logo} alt='logo'/>
					<h1>电商管理</h1>
				</Link>
				<Menu
					onClick={this.handleClick}
					style={{ width: '100%'}}
					mode="inline"
					selectedKeys={selectPath}
					defaultOpenKeys={openKeyArr}
				>
					{this.randerMenu(menuList)}
				</Menu>
			</div>
		)
	}
}


export default connect(
	state => ({user:state.user}),
	{setHeadTitle}
)(withRouter(Sider))