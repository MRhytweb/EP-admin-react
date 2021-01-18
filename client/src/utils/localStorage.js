import store from 'store'
const USER = 'user-key'
export function localSet(user){
	store.set(USER, user)
}
export function localGet(){
	return store.get(USER) || {}
}
export function localRemove(){
	store.remove(USER)
}