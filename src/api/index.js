// 包含了n个接口的请求函数模块

// 注册
import ajax from './ajax'
export const reqRegister = (user) => {
    ajax('/regsiter', user, 'POST')
} 
//登录
export const reqLogin = ({ username, password }) => {
    ajax('/login', { username, password }, 'POST')
}
//用户更新
export const reqUpdate = (user) => {
    ajax('/update', user, 'POST')
}