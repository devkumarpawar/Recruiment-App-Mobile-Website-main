//个人主界面
import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'
import Cookies from 'js-cookie'
import { resetUser } from '../../redux/actions'

class Personal extends React.Component {
    logout = () => {
        alert('sd')
    }
    render() {
        const {username, info, header, company, post, salary} = this.props.user
        return(
            <div style={{marginTop: 45}}>
                <Result
                    img={<img src={require(`../../assets/images/${header}.png`).default} style={{width: 50}} />}
                    title={username}
                    message={company}
                />
                <List renderHeader={() => 'Personal Profile'}>
                    <List.Item multipleLine>
                        <List.Item.Brief>Position: {post}</List.Item.Brief>
                        <List.Item.Brief>Summary: {info}</List.Item.Brief>
                        {salary && <List.Item.Brief>Salary: {salary}</List.Item.Brief>}
                    </List.Item>
                </List>
                <WhiteSpace />
                <List>
                    <Button
                        onClick={() => Modal.alert('Sign Out', 'Are you sure?',[
                            {text: 'Cancel'},
                            {text: 'Ok', onPress: () => {
                                Cookies.remove('userid')
                                this.props.resetUser()
                            }}
                        ])}
                        type="warning"
                    >Sign Out</Button>
                </List>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, {resetUser})(Personal)