import { combineReducers } from 'redux'
import { getRedirectTo } from '../utils'
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG, MSG_READ } from './action-types'

const initUser = {username: '', type: '', msg: '', redirectTo: ''}
// 产生user状态的reducer
function user(state=initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const { type, header } = action.user
            return {
                // ...state,
                ...action.user,
                redirectTo: getRedirectTo(type, header)
            }
        case ERROR_MSG:
            return {
            ...state,
            msg: action.msg
        }
        case RECEIVE_USER:
            return action.user
        case RESET_USER:
            return {
                ...initUser,
                msg: action.msg
            }

        default:
            return state
    }
}
// 产生userList状态的reducer
const initUserList = []
function userList(state=initUserList, action) {
    switch (action.type){
        case RECEIVE_USER_LIST:
            return action.userList
        default:
            return state
    }
}

//产生聊天状态的reducer
const initChat = {
    users: {}, //所有用户对象 {username:, header:}
    chatMsgs: [], //当前用户相关的聊天记录
    unReadCount: 0 //未读消息数量
}
function chat(state=initChat, action) {
    switch (action.type){
        case RECEIVE_MSG_LIST:
            const {users, chatMsgs, userid} = action.data
            return {
                users: users,
                chatMsgs: chatMsgs,
                unReadCount: chatMsgs.reduce(
                    (preTotal, msg) => {
                        return preTotal + (!msg.read && msg.to === userid ? 1 : 0)
                    }, 0)
            }
        case RECEIVE_MSG:
            // const {chatMsg, userid} = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, action.data.chatMsg],
                unReadCount: state.unReadCount + (!action.data.chatMsg.read&&action.data.chatMsg.to===action.data.userid ? 1 : 0)
            }
        case MSG_READ:
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if (msg.from === action.data.from && msg.to === action.data.to && !msg.read) {
                        //state 不可以修改, 产生新的state
                        return {...msg, read: true}
                    } else {
                        return msg
                    }
                }),
                unReadCount: state.unReadCount - action.data.count
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user,     //{}
    userList, //[]
    chat      //{}
})


export default rootReducer