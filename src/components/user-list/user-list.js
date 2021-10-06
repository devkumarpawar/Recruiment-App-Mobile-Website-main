import React from 'react'
import { WingBlank, WhiteSpace, Card } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
class UserList extends React.Component {
    render() {
        return(
            <WingBlank style={{marginBottom: 50, marginTop: 45}}>
                <QueueAnim type="scale">
                    {this.props.userList.map(user => (
                        <div key={user._id}>
                            <WhiteSpace />
                                <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                    <Card.Header
                                        thumb={user.header ? require(`../../assets/images/${user.header}.png`).default : null}
                                        extra={user.username}
                                    />
                                    <Card.Body>
                                        <div>Position: {user.post}</div>
                                        {user.company && <div>Company: {user.company}</div>}
                                        {user.salary && <div>Salary: {user.salary}</div>}
                                        <div>Summary: {user.info}</div>
                                    </Card.Body>
                                </Card>
                        </div>
                    ))}
                </QueueAnim>
            </WingBlank>
        )
    }
}

export default withRouter(UserList)