import React from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import {connect} from 'react-redux'

import { Layout } from 'antd';
import MySider from '../../components/sider'
import Header from '../../components/header'
import MyFooter from '../../components/footer'

import Home from '../Home'
import Category from '../Category'
import Product from '../Product'
import User from '../User'
import Role from '../Role'
import ChartBar from '../Chart/bar'
import ChartLine from '../Chart/line'
import ChartPie from '../Chart/pie'

const {Footer, Sider, Content } = Layout;


class Admin extends React.Component{
	render(){
		const user = this.props.user
		if(!user.username || !user._id){
			return (<Redirect to={'/login'}/>)
		}
		return (
			<Layout style={{height:'100vh'}}>
			  <Sider style={{backgroundImage: 'linear-gradient(#21231e 10%, #001529)'}}>
				<MySider></MySider>
			  </Sider>
			  <Layout>
				<Header></Header>
				<Content style={{margin:'20px',background:'#fff',overflow:'auto'}}>
					<Switch>
						<Route path='/home' component={Home}/>
						<Route path='/category' component={Category}/>
						<Route path='/product' component={Product}/>
						<Route path='/user' component={User}/>
						<Route path='/role' component={Role}/>
						<Route path='/chart/bar' component={ChartBar}/>
						<Route path='/chart/line' component={ChartLine}/>
						<Route path='/chart/pie' component={ChartPie}/>
						<Redirect to='/home' />
					</Switch>
				</Content>
				<Footer style={{background:'#e0e0e0'}}><MyFooter></MyFooter></Footer>
			  </Layout>
			</Layout>
		)
	}
}

export default connect(
	state=>({user:state.user}),
	{}
)(Admin)