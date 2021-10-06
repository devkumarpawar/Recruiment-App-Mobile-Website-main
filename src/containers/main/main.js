import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'
import { getRedirectTo} from '../../utils'
import { connect } from 'react-redux'
import { getUser } from '../../redux/actions'
import Cookies from 'js-cookie'
import { NavBar } from 'antd-mobile'
import './main.less'
class Main extends React.Component {
    navList = [
        {
            path: '/laoban',
            component: Laoban,
            title: "Job Seeker List",
            icon: 'dashen',
            text: 'Job Seeker'
        },
        {
            path: '/dashen',
            component: Dashen,
            title: 'Job Hunter List',
            icon: 'laoban',
            text: 'Job Hunter'
        },
        {
            path: '/message',
            component: Message,
            title: 'Message',
            icon: 'message',
            text: 'Message'
        },
        {
            path: '/personal',
            component: Personal,
            title: 'Personal Center',
            icon: 'personal',
            text: 'Me'
        }
    ]
    componentDidMount() {
        const userid = Cookies.get('userid')
        if(userid && !this.props.user._id) {
            this.props.getUser()
            // console.log(this.props)
        }
    }
    render() {
        //读取cookie中userid,如果有，读取redux中user状态， 如果user没有_id，
        const userid = Cookies.get('userid')
        // //如果没有， 自动重定向到登录界面
        if(!userid) {
            return (
                <Redirect to='/login' />
            )
        }
        //有cookie，读取redux user状态
        const { user } = this.props
        // debugger
        if(!user._id) {
            return null
        } else {
            //如果请求根路径
            let path = this.props.location.pathname
            if(path === '/') {
                path = getRedirectTo(user.type, user.header)
                return (
                    <Redirect to={path} />
                )
            } 
            // 自己加上， 否则dashen也可以访问／dashen。老板也可以访问／laoban
            if(user.type === 'laoban' && path === '/dashen') {
                return (
                    <Redirect to={path+'!'} />
                )
            }
            if(user.type === 'dashen' && path === '/laoban') {
                return (
                    <Redirect to={path+'!'} />
                )
            }
        }
        const currentNav = this.navList.find(nav => nav.path === this.props.location.pathname) //得到当前nav
        if(currentNav) {
            //决定哪个路由需要隐藏
            if(this.props.user.type === 'laoban') {
                this.navList[1].hide = true
            } else {
                this.navList[0].hide = true
            }
        }
        // 过滤掉hide：true的nav
        const navList = this.navList.filter(nav => !nav.hide)//留下来false的

        return (
            <div>
                { currentNav && <NavBar className="sticky-header">{ currentNav.title }</NavBar> }
                <Switch>
                    {
                        this.navList.map(nav => <Route key={nav.component} exact path ={nav.path} component={nav.component}></Route>)
                    }
                    <Route exact path = "/laobaninfo" component={LaobanInfo}></Route>
                    <Route exact path = "/dasheninfo" component={DashenInfo}></Route>
                    <Route exact path = "/chat/:userid" component={Chat}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
                { currentNav && <NavFooter navList={navList} unReadCount={this.props.unReadCount} /> }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        unReadCount: state.chat.unReadCount
    }
}
export default connect(mapStateToProps, { getUser })(Main)