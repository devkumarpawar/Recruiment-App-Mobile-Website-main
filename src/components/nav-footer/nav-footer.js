import React from 'react'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import './nav-footer.less'
class NavFooter extends React.Component {
    render() {
        // console.log(this.props)
        return(
            <TabBar>
                {this.props.navList.map((nav) => (
                    <TabBar.Item
                        key={nav.path}
                        badge={nav.path==='/message' && this.props.unReadCount}
                        title={nav.text}
                        icon={{uri: require(`./images/${nav.icon}.png`).default}}
                        selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`).default}}
                        selected={this.props.location.pathname === nav.path}
                        onPress={() => this.props.history.replace(nav.path)}
                    ></TabBar.Item>
                ))}
            </TabBar>
        )
    }
}

export default withRouter(NavFooter)