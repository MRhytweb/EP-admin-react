import {message} from 'antd'
import {HEAD_TITLE,USER,RESET_USER} from './action-types.js'
import { reqLogin } from '../api'
import {localSet,localRemove} from '../utils/localStorage.js'

export const setHeadTitle = (headTitle)=>({
	type:HEAD_TITLE,
	data:headTitle
})

export const user = (user)=>({
	type:USER,
	data:user
})

export const login = (username,password)=>{
	return async dispatch => {
		const result = await reqLogin(username,password)
		if(result.status === 0){
			localSet(result.data)
			dispatch(user(result.data))
		}else{
			message.error('登录失败，请重试')
		}
	}
}
export const logout = ()=>{
	localRemove()
	return {
		type:RESET_USER
	}
}
