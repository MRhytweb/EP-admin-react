import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './Home/index'
import AddUpdate from './AddUpdate/index'
import Detail from './Detail/index'

export default function Product({match}){
	return(
		<Switch>
			<Route path={match.url} exact component={Home}/>
			<Route path={match.url+'/addupdate'} component={AddUpdate}/>
			<Route path={match.url+'/detail'} component={Detail}/>
			<Redirect to={match.url} />
		</Switch>
	)
}

