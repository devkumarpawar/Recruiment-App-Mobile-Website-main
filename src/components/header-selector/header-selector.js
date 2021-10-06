//选择用户头像
import React from 'react'
import { List, Grid } from 'antd-mobile'
class HeadSelector extends React.Component {
    constructor(props) {
        super(props)
        this.headerList = []
        for (let i = 0; i < 20; i++) {
            this.headerList.push({
                text: `head${i+1}`,
                icon: require(`../../assets/images/head${i+1}.png`).default
            })
        }
        this.state = {
            icon: null //图默认没有
        }
    }

    handleClick = ({text, icon}) => {
        this.setState({icon: icon})
        this.props.setHeader(text)
    }

    render() {
        const listHeader = !this.state.icon ? 'Select an Avatar' : (
            <div>
                Selected:  <img style={{'verticalAlign':'middle'}} src={this.state.icon}/>
            </div>
        )

        return (
            <List
                renderHeader={() => listHeader}
            >
                <Grid
                    data={this.headerList}
                    columnNum={5}
                    onClick={this.handleClick}
                />
            </List>
        )
    }
}

export default HeadSelector