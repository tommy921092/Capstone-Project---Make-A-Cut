import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';

export const setCurrentUser = (user) => {
    return {
        type: "SET_CURRENT_USER",
        user
    }
}

export const userLogin = (data) => {
    return dispatch => {
        return axios.post('/api/auth/user',data).then(res=>{
            const token = res.data.token;

            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token);
            dispatch(setCurrentUser(jwtDecode(token)))
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