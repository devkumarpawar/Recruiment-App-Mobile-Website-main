//老板信息完善
import React from 'react'
import { connect } from 'react-redux'
import HeadSelector from '../../components/header-selector/header-selector'
import { List, NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import { updateUser } from '../../redux/actions'
import { Redirect } from 'react-router-dom'
class LaobanInfo extends React.Component {
    state = {
        header: '',//头像
        post: '',//职位
        info: '',
        company: '',
        salary: ''
        }
    setHeader = (header) => {
        this.setState({
            header: header
        })
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    save = () => {
        this.props.updateUser(this.state)
        // console.log(this.state)
    }

    render() {
        if(this.props.user.header) {
            const path = this.props.type === 'dashen' ? '/dashen' : '/laoban'
            return <Redirect to={path}/>
        }
        return (
            <div>
                <NavBar>Job Hunter Profile</NavBar>
                <HeadSelector setHeader={this.setHeader}/>
                <List>
                    <InputItem
                        placeholder="Job Title:"
                        onChange={val => {this.handleChange('post', val)}}
                    >Job Title
                    </InputItem>
                    <InputItem
                        placeholder="Company:"
                        onChange={val => {this.handleChange('company', val)}}
                    >Company
                    </InputItem>
                    <InputItem
                        placeholder="Salary:"
                        onChange={val => {this.handleChange('salary', val)}}
                    >Salary
                    </InputItem>
                    <TextareaItem
                        title="Required:"
                        rows={3}
                        onChange={val => {this.handleChange('info', val)}}
                    ></TextareaItem>
                    <Button onClick={this.save} type="primary">Save</Button>
                </List>
                
            </div>
        )
    }
}

const mapStateToProps =state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, {updateUser})(LaobanInfo)