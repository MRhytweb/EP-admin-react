import { combineReducers } from 'redux'
import {HEAD_TITLE,USER,RESET_USER} from './action-types.js'
import { localGet } from '../utils/localStorage'

const initHeadTitle = '首页'
function headTitle(state=initHeadTitle,action){
	switch(action.type){
		case HEAD_TITLE:
			return action.data;
		default:
			return state
	}
}

const initUser = localGet()
function user(state=initUser,action){
	switch(action.type){
		case USER:
			return action.data;
		case RESET_USER:
			return {};
		default:
			return state
	}
}
export default combineReducers({
	headTitle,
	user
})