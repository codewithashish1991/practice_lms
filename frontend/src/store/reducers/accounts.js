import { USER_INFO } from './../actions/';

const userDefaultInfo = JSON.parse(localStorage.getItem('session_data'));
const initState = {
    account: {
        token: (userDefaultInfo && userDefaultInfo.token) ? userDefaultInfo.token : null,
        user: (userDefaultInfo && userDefaultInfo.user) ? userDefaultInfo.user : {},
    },
};
export function userInfo(state = initState, action) {
    switch (action.type) {
    case USER_INFO:
        return {
            ...state,
            account: action.value,
        };
    default:
        return state;
    }
}
