// 能发送ajax请求的函数模块, 返回值 promise
import axios from 'axios'
export default function ajax(url, data={}, type='GET') {
    if (type = "GET") {
        // data: {username: 'tom', password: 123}
        // paramStr: username=tom&password=123
        let paramStr = ''
        Object.keys(data).forEach(key => {
            paramStr += key + '=' + data[key] + '&' 
        })
        if (paramStr) {
            paramStr = paramStr.substring(0, paramStr.length - 1)
        }
        return axios.get(url + '?' + paramStr)
    } else {
        return axios.post(url, data)
    }
}
