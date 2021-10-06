//老板主界面
import React from 'react'
import { connect } from 'react-redux'
import {getUserList} from '../../redux/actions'
import UserList from '../../components/user-list/user-list'

class Laoban extends React.Component {
    componentDidMount() {
        this.props.getUserList('dashen')
    }
    render() {
        // console.log(this.props.userList)
        return(
            <UserList userList={this.props.userList}/>
        )
    }
}

const mapStateToProps = state => {
    return {
        userList: state.userList
    }
}
export default connect(mapStateToProps, {getUserList})(Laoban)