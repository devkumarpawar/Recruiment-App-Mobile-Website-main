//消息主界面
import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

class Message extends React.Component {
    getLastMsgs = (chatMsgs, userid) => {        
        //找出每个聊天的lastmsg
        const lastMsgObjs = {}
        chatMsgs.forEach(msg => {
            //对msg进行个体的统计.
            //发给我， 并且未读
            if(msg.to === userid && !msg.read) {
                msg.unReadCount = 1
            } else {
                msg.unReadCount = 0
            }
            if (!lastMsgObjs[msg.chat_id]) {
                lastMsgObjs[msg.chat_id] = msg
            } else {
                //已经有lastmsg，不确定读还是未读
                const unReadCount = lastMsgObjs[msg.chat_id].unReadCount + msg.unReadCount
                if (msg.create_time > lastMsgObjs[msg.chat_id].create_time) {
                    lastMsgObjs[msg.chat_id] = msg
                }
                lastMsgObjs[msg.chat_id].unReadCount = unReadCount
            }
        })
         //得到所有lastmsg数组
        const lastMsgs = Object.values(lastMsgObjs)
        //数组消息排序，新消息置顶 按照createtime降序
        lastMsgs.sort(function(m1, m2) { //bubble sort
            //如果<0, m1放前面， 如果==0，不变。如果>0, m2放前面
            return m2.create_time - m1.create_time
        })
        return lastMsgs
    }
    render() {
        const {users, chatMsgs} = this.props.chat
        
        //对chatmsgs根据chat_id进行分组, 取出最后一条消息
        const lastMsgs = this.getLastMsgs(chatMsgs, this.props.user._id)
        return(
            <List style={{marginTop:50, marginBotton:50}}>
                {
                    lastMsgs.map(msg => {
                        // 为了取到头像和用户名，得到对方用户的id
                        const targetUserId = msg.to === this.props.user._id ? msg.from : msg.to
                        const targetUser = users[targetUserId]
                        return (
                            <List.Item
                                key={msg._id}
                                extra={<Badge text={msg.unReadCount}/>}
                                thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`).default : null}
                                arrow='horizontal'
                                onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
                            >
                            {msg.content}
                            <List.Item.Brief>
                                {/* 显示发送人头像 */}
                                {targetUser.username}
                            </List.Item.Brief>
                            </List.Item>
                        )
                    })
                }
            </List>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        chat: state.chat
    }
}
export default connect(mapStateToProps, null)(Message)