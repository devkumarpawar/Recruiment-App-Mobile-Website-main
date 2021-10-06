import React from 'react'
import Logo from '../../components/logo/logo'
import {NavBar, WingBlank, List, InputItem, WhiteSpace, Radio, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/actions'
import { Redirect } from 'react-router-dom'
class Register extends React.Component {
    state = {
        username: '',
        password: '',
        password2: '',
        type: 'dashen'
    }

    handleChange = (name, val) => {
        this.setState ({
            [name]: val
        })
    }

    toLogin = () => {
        this.props.history.push('./login')
    }

    register = () => {
        this.props.register(this.state)
        
    }
    render() {
        if (this.props.user.redirectTo) {
            return <Redirect to= {this.props.user.redirectTo} />
        }
        return (
            <div>
                <NavBar>Silicon Valley</NavBar>
                <Logo />
                <WingBlank>
                    {this.props.user.msg && (<div className='error-msg'>{this.props.user.msg}</div>)}
                    <List>
                        <InputItem
                            onChange={val => this.handleChange('username', val)}
                            placeholder="Username"
                            >Username
                        </InputItem>
                        <WhiteSpace />
                        <InputItem onChange={val => this.handleChange('password', val)} placeholder="Password" type="password">Password</InputItem>
                        <WhiteSpace />
                        <InputItem onChange={val => this.handleChange('password2', val)} placeholder="Confirm Password" type="password">Password</InputItem>
                        <WhiteSpace />
                        <List.Item>
                            <span>User Category</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={this.state.type === 'dashen'} onChange={() => this.handleChange('type', 'dashen')}>Job Seeker</Radio>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={this.state.type === 'laoban'} onChange={() => this.handleChange('type', 'laoban')}>Job Hunter</Radio>
                        </List.Item>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.register}>Signup</Button>
                        <WhiteSpace />
                        <Button onClick={this.toLogin}>Already registered</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, {register})(Register)