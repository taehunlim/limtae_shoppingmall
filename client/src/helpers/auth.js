import cookie from 'js-cookie';


export const setCookie = (key, value) => {
    if(window !== 'undefined') {
        cookie.set(key, value, {
            expires : 7
        })
    }
}

const removeCookie = key => {
    if(window !== 'undefined') {
        cookie.remove(key, {
            expires: 7
        })
    }
}

export const getCookie = key => {
    if(window !== 'undefined') {
        return cookie.get(key)
    }
}

export const setLocalStorage =  (key, value) => {
    if(window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeLocalStorage = (key) => {
    if(window !== 'undefined') {
        localStorage.removeItem(key)
    }
}


export const isAuth = () => {
    if(window !== 'undefined') {
        const cookieChecked = getCookie('token')
        if(cookieChecked) {
            return JSON.parse(localStorage.getItem('user'))
            // parse == parshing
        }
        else {
            return false

        }
    }
}

