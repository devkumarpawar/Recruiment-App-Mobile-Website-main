//没有header， 进入dasheninfo or laobaninfo。有header， 进入dashen or laoban
export function getRedirectTo(type, header) {
    let path = ""
    if(type === 'laoban'){
        path = '/laoban'
    } else {
        path = "/dashen"
    }
    if(!header){
        path += 'info'
    }
    return path
}