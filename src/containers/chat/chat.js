import React from 'react'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { sendMsg, readMsg } from '../../redux/actions'
// import './chat.css'
import styles from './chat.module.less'
const smile = <svg t="1610609428532" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2828" width="22" height="22"><path d="M512 63.9C264.5 63.9 63.9 264.5 63.9 512S264.5 960.1 512 960.1 960.1 759.5 960.1 512 759.5 63.9 512 63.9z m271.6 719.7c-35.3 35.3-76.4 63-122.1 82.3-47.3 20-97.6 30.2-149.5 30.2S409.8 886 362.5 865.9c-45.7-19.3-86.8-47-122.1-82.3s-63-76.4-82.3-122.1c-20-47.3-30.2-97.6-30.2-149.5s10.1-102.2 30.2-149.5c19.3-45.7 47-86.8 82.3-122.1s76.4-63 122.1-82.3c47.3-20 97.6-30.2 149.5-30.2s102.2 10.1 149.5 30.2c45.7 19.3 86.8 47 122.1 82.3s63 76.4 82.3 122.1c20 47.3 30.2 97.6 30.2 149.5S886 614.2 865.9 661.5c-19.3 45.7-47 86.8-82.3 122.1z" fill="#8a8a8a" p-id="2829"></path><path d="M704.1 384.2m-64.1 0a64.1 64.1 0 1 0 128.2 0 64.1 64.1 0 1 0-128.2 0Z" fill="#8a8a8a" p-id="2830"></path><path d="M320.1 384.2m-64.1 0a64.1 64.1 0 1 0 128.2 0 64.1 64.1 0 1 0-128.2 0Z" fill="#8a8a8a" p-id="2831"></path><path d="M512.1 831.7c141.2 0 255.7-114.5 255.7-255.7H256.5c-0.1 141.3 114.4 255.7 255.6 255.7z" fill="#8a8a8a" p-id="2832"></path></svg>
class Chat extends React.Component {
    state = {
        content: "",
        isShow: false //是否显示表情列表
    }

    //第一次render之前
    componentWillMount() {
        const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
                        ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
                        ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
                        ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
        this.emojis = emojis.map(item => {
            return {text: item}
        })
    }
    // 消息滑到底部
    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight)
    }
    // 发送消息到更新列表到底部
    componentDidUpdate() {
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentWillUnmount() {
        //发请求更新未读消息数量
        //目标用户id
        const targetId = this.props.match.params.userid
        this.props.readMsg(targetId, this.props.user._id)
    }

    toggleShow = () => {
        this.setState({isShow: !this.state.isShow})
        if(!this.state.isShow) {
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }

    handleSend = () => {
        //收集数据
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()
        //发送请求
        if(content) {
            this.props.sendMsg({from, to, content})
        }
        //清楚输入数据
        this.setState({content: "", isShow:false})
    }
    handleEnterKey = (e) => {
        if(e.keyCode === 13) {
            this.handleSend()
        }
    }
    render() {
        // console.log(this.props)
        const { user } = this.props
        const { users, chatMsgs } = this.props.chat
        //计算当前聊天id
        const meId = user._id
        if(!users[meId]) { //如果还没有获取到数据，不做任何显示
            return null
        }
        const targetId = this.props.match.params.userid
        const chatId = [meId, targetId].sort().join('_')
        // chatMsgs过滤掉和别人的聊天记录
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
        //得到目标用户头像
        const targetIcon = users[targetId].header ? require(`../../assets/images/${users[targetId].header}.png`).default : null
        return(
            <div className={styles.container}>
                <NavBar
                    className={styles.stickyHeader}
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {users[targetId].username}
                </NavBar>
                <List className={styles.content}>
                    {msgs.map(msg => {
                            //对方发给我
                            if(meId === msg.to) {
                                return (
                                    <List.Item
                                        key={msg._id}
                                        thumb={targetIcon}
                                    >{msg.content}
                                    </List.Item>
                                )
                            } else {
                                return (                           
                                    <List.Item
                                        key={msg._id}
                                        className={styles.chatMe}
                                        extra='Me'
                                        >
                                        {msg.content}
                                    </List.Item>
                                )
                            }
                    })}
                </List>
                <div className={styles.stickyBottom}>
                    <InputItem
                        placeholder="Text Message"
                        value={this.state.content}
                        onChange={val => {this.setState({content: val})}}
                        extra={
                                <span>
                                    <span onClick={this.toggleShow} className={styles.smile}>{smile}</span>
                                    <span onClick={this.handleSend}>Send</span>
                                </span>
                            }
                        onKeyUp={(e) => {this.handleEnterKey(e)}}
                        onFocus={() => {this.setState({isShow:false})}}
                    ></InputItem>
                    {this.state.isShow &&
                        <Grid
                        data={this.emojis}
                        columnNum={8}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={(item) => {
                            this.setState({content: this.state.content + item.text})
                        }}
                        />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        chat: state.chat
    }
}
export default connect(mapStateToProps, {sendMsg, readMsg})(Chat)