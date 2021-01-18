import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

//登录
export const reqLogin = (username,password) => ajax('/login',{username,password},'POST')
//添加用户
export const reqUserAdd = (obj) => ajax('/manage/user/add',obj,'POST')
//更新用户
export const reqUserUpdate = (obj) => ajax('/manage/user/update',obj,'POST')
//获取所有用户列表
export const reqUserList = () => ajax('/manage/user/list')
//删除用户
export const reqUserDelete = (userId) => ajax('/manage/user/delete',{userId},'POST')
//获取一级或某个二级分类列表
export const reqCategoryList = (parentId) => ajax('/manage/category/list',{parentId})
//添加分类
export const reqCategoryAdd = (obj) => ajax('/manage/category/add',obj,'POST')
//更新品类名称
export const reqCategoryUpdate = (categoryId,categoryName) => ajax('/manage/category/update',{categoryId,categoryName},'POST')
//根据分类ID获取分类
export const reqCategoryInfo = (categoryId) => ajax('/manage/category/info',{categoryId})
// 获取商品分页列表
export const reqProductList = (obj) => ajax('/manage/product/list',obj)
// 根据ID/Name搜索产品分页列表
export const reqProduct = (obj) => ajax('/manage/product/search',obj)
//添加商品
export const reqProductAdd = (obj) => ajax('/manage/product/add',obj,'POST')
//更新商品
export const reqProductUpdate = (obj) => ajax('/manage/product/update',obj,'POST')
//对商品进行上架/下架处理
export const reqProductUpdateStatus = (obj) => ajax('/manage/product/updateStatus',obj,'POST')

//删除图片
export const reqImgDelete = (name) => ajax('/manage/img/delete',{name},'POST')
//添加角色
export const reqRoleAdd = (roleName) => ajax('/manage/role/add',{roleName},'POST')
//获取角色列表
export const reqRoleList = () => ajax('/manage/role/list')
//更新角色(给角色设置权限)
export const reqRoleUpdate = (obj) => ajax('/manage/role/update',obj,'POST')
//获取天气信息(支持jsonp)
export const reqWeather = (city) => {
	return new Promise((resolve,reject)=>{
		const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
		jsonp(url,{},(err,data)=>{
			if(!err && data.status === 'success'){
				const {dayPictureUrl,weather} = data.results[0].weather_data[0]
				resolve({dayPictureUrl,weather})
			}else{
				message.error('天气获取失败')
			}
		})
	})
}