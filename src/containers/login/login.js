import React from 'react'
import Logo from '../../components/logo/logo'
import {NavBar, WingBlank, List, InputItem, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/actions'
import { Redirect } from 'react-router-dom'
class Login extends React.Component {
    state = {
        username: '',
        password: '',
    }

    handleChange = (name, val) => {
        this.setState ({
            [name]: val
        })
    }

    toRegister = () => {
        this.props.history.push('./register')
    }

    login = () => {
        this.props.login(this.state)
        // console.log(this.props)
    }
    render() {
        if (this.props.user.redirectTo) {
            return <Redirect to={this.props.user.redirectTo}/>
        }
        return (
            <div>
                <NavBar>Silicon Valley</NavBar>
                <Logo />
                <WingBlank>
                    {this.props.user.msg && <div className="error-msg">{this.props.user.msg}</div>}
                    <List>
                        <InputItem onChange={val => this.handleChange('username', val)} placeholder="Username">Username</InputItem>
                        <WhiteSpace />
                        <InputItem onChange={val => this.handleChange('password', val)} placeholder="Password" type="password">Password</InputItem>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.login}>Signin</Button>
                        <WhiteSpace />
                        <Button onClick={this.toRegister}>Not registered</Button>
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
export default connect(mapStateToProps, {login})(Login)