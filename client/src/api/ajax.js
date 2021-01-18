import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,param={},method='GET'){
	return new Promise((resover,reject)=>{
		let promise
		if(method==='GET'){
			promise = axios.get(url, {
			    params: param
			  })
		}else{
			promise = axios.post(url, param)
		}
		promise.then((resp=>{
			resover(resp.data)
		})).catch(error=>{
			message.error('错误信息:'+error.message)
		})
	})
	
}