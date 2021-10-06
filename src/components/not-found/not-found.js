import React from 'react'
import { Button } from 'antd-mobile'

class NotFound extends React.Component {
    render() {
        return(
            <div>
                <div>
                    <h2 style={{textAlign:'center', color:'red'}}>Sorry, Page not Found</h2>
                    <Button
                        type="primary"
                        onClick={() => {this.props.history.replace("/")}}
                    >Go Back</Button>
                </div>
            </div>
        )
    }
}

export default NotFound