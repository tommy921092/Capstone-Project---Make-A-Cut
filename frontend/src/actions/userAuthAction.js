import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';

export const setCurrentUser = (user) => {
    return {
        type: "SET_CURRENT_USER",
        user
    }
}

export const setCurrentMerchant = (user) => {
    return {
        type: "SET_CURRENT_MERCHANT",
        user
    }
}

export const userLogin = (data) => {
    return dispatch => {
        return axios.post('/api/auth/user', data).then(res => {
            const token = res.data.token;

            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token);
            dispatch(setCurrentUser(jwtDecode(token)))
        });
    }
}

export const loginFacebook = (data) => {
    return dispatch => {
        return axios.post('/api/auth/user/facebook', {
            access_token: data.accessToken,
            email: data.email
        }).then((res) => {
            if (res.status === 200) {
                const token = res.data.token;

                localStorage.setItem('jwtToken', token);
                setAuthorizationToken(token);
                dispatch(setCurrentUser(jwtDecode(token)))
            } else if (res.status === 202) {
                alert("Init Reg facebook, please login again")
            } else if (res.status === 201) {
                alert("you have already signup by local login, use email to login instead")
            }
        }).catch((err) => {
            alert(err)
        })
    }
}

export const loginGoogle = (data) => {
    return dispatch => {
        return axios.post('/api/auth/user/google', {
            access_token: data.accessToken,
            email: data.profileObj.email,
            fullname: data.profileObj.name
        }).then((res) => {
            if (res.status === 200) {
                const token = res.data.token;

                localStorage.setItem('jwtToken', token);
                setAuthorizationToken(token);
                dispatch(setCurrentUser(jwtDecode(token)))
            } else if (res.status === 202) {
                alert("Init Reg google, please login again")
            } else if (res.status === 201) {
                alert("you have already signup by local login, use email to login instead")
            }
        }).catch((err) => {
            alert(err)
        })
    }
}

export const merchantLogin = (data) => {
    return dispatch => {
        return axios.post('/api/auth/merchant', data).then(res => {
            const token = res.data.token;

            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token);
            dispatch(setCurrentMerchant(jwtDecode(token)))
        });
    }
}


export const logout = () => {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}