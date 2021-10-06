//老板信息完善
import React from 'react'
import { connect } from 'react-redux'
import HeadSelector from '../../components/header-selector/header-selector'
import { List, NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import './dashen-info.less'
import { updateUser } from '../../redux/actions'
import { Redirect } from 'react-router-dom'

class DashenInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            header: '',//头像
            post: '',//职位
            info: ''
        }
    }
    
    setHeader = (header) => {
        this.setState({
            header: header
        })
    }

    handleChange = (name, value) =>{
        this.setState({
            [name]: value
        })
    }

    save = () => {
        this.props.updateUser(this.state)
    }

    render() {
        if(this.props.user.header) {
            const path = this.props.user.type === 'dashen' ? '/dashen' : '/laoban' 
            return <Redirect to={path} />
        }
        return (
            <div>
                <NavBar>Job Seeker Profile</NavBar>
                <HeadSelector setHeader={this.setHeader} />
                <List className="dashen-input">
                    <InputItem
                        placeholder="Job Title"
                        onChange={(val) => {this.handleChange('post', val)}}
                    >Job Search:</InputItem>
                    <TextareaItem
                        title="Experience:"
                        rows={3}
                        onChange={val => {this.handleChange('info', val)}}
                    ></TextareaItem>
                </List>
                <Button onClick={this.save} type="primary">Save</Button>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, {updateUser})(DashenInfo)