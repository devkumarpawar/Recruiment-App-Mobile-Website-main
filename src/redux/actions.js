// import { reqRegister, reqLogin} from '../api'
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG, MSG_READ } from './action-types'
import axios from 'axios'
import io from 'socket.io-client'

////同步action
//授权成功
const authSuccess = (user) => {
    return {
        type: AUTH_SUCCESS,
        user: user
    }
}
//授权失败
const errorMsg = (msg) => {
    return {
        type: ERROR_MSG,
        msg: msg
    }
}
//接收用户
const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user: user
    }
}
export const resetUser = (msg) => {
    return {
        type: RESET_USER,
        msg: msg
    }
}
//接收用户列表
const receiveUserList = (userList) => {
    return {
        type: RECEIVE_USER_LIST,
        userList: userList
    }
}
//接收消息列表
const receiveMsgList =({users, chatMsgs, userid}) => {
    return {
        type: RECEIVE_MSG_LIST,
        data: {users, chatMsgs, userid}
    }
}
//接收一个消息的action
const receiveMsg =(chatMsg, userid) => {
    return {
        type: RECEIVE_MSG,
        data: {chatMsg, userid}
    }
}
//读完某个聊天消息同步action
const msgRead = ({count, from, to}) => {
    return {
        type: MSG_READ,
        data: {count, from, to}
    }
}

async function getMsgList(dispatch, userid){
    initIO(dispatch, userid)
    const response = await axios.get('/msglist')
    const result = response.data
    if(result.code === 0) {
        const {users, chatMsgs} = result.data
        dispatch(receiveMsgList({users, chatMsgs, userid}))
    }
}
/////异步action
//注册
export const register = (user) => {
    const {username, password, password2, type } = user
    //前台验证
    if (!username) {
        return errorMsg('Please Enter Username')
    }
    if (password !== password2) {
        return errorMsg('Password Not Match')
    }
    return async dispatch => {
        const response = await axios.post("/register", { username, password, type })
        const result = response.data
        if (result.code === 0) {
            // 获取消息列表
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }

    }

//登录
export const login = (user) => {
    const { username, password } = user
    //前台验证
    if (!username) {
        return errorMsg('Please Enter Username')
    }
    if (!password) {
        return errorMsg('Please Enter Password')
    }
    //表单数据合法
    return async dispatch => {
        const response = await axios.post("/login", { username, password })
        const result = response.data
        if (result.code === 0) {
            // 获取消息列表
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}

// 更新用户 （save button）
export const updateUser = (user) => {
    return async dispatch => {
        const response = await axios.post("/update", user)
        const result = response.data
        if(result.code === 0) {
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}
//获取用户信息，自动登录功能
export const getUser = ()=> {
    return async dispatch => {
        const response = await axios.get("/user")
        const result = response.data
        if(result.code === 0) {
            // 获取消息列表
            getMsgList(dispatch, result.data._id)
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}
//获取用户列表
export const getUserList = (type) => {
    return async dispatch => {
        const response = await axios.get(`/userlist/${type}`)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUserList(result.data))
        }
    }
}


function initIO(dispatch, userid) {
    //连接服务器, 得到与服务器连接对象
    if (!io.socket) {
        io.socket = io('ws://localhost:4000')
        //接收服务器发送的消息
        io.socket.on('receiveMsg', function(chatMsg) {
            console.log('客户端接收服务器发送的消息', chatMsg)
            //只有当chatmsg与我相关，才会分发同步action保存消息
            if(userid === chatMsg.from || userid === chatMsg.to) {
                dispatch(receiveMsg(chatMsg, userid))
            }
        })
    }
}
//发送消息异步action
export const sendMsg = ({from, to, content}) => {
    return dispatch => {
        console.log("客户端向服务器发送消息", {from, to, content})
        io.socket.emit('sendMsg', {from, to, content})
    }
}

//读取消息异步action
export const readMsg = (from, to) => {
    return async dispatch => {
        const response = await axios.post("/readmsg", {from})
        const result = response.data
        if(result.code === 0) {
            const count = result.data
            dispatch(msgRead({count, from, to}))
        }
    }
}