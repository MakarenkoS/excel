export function parse(value = '') {
    if(value.startsWith('=')) {
        try {
            return eval(value.slice(1))
        } catch(e) {
            value
        }
        
    }
    return value
}