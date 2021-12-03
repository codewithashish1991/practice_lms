import * as selectors from './../selectors/';
import {
    setCategorieList,
    setStoreSession,
} from './../actions/';

const tokenExpireMessage = 'Your token expired. You have to login first';

export function register(data) {
    return (dispatch, getState, api) => api
        .registerUser(data)
        .then(res => res);
}

export function ftPassword(email) {
    return (dispatch, getState, api) => api
        .forgotPassword(email)
        .then(res => res);
}

export function login(data) {
    return (dispatch, getState, api) => api
        .loginUser(data)
        .then(res => res);
}

export function logout() {
    return (dispatch, getState, api) => {
        const token = selectors.getUserToken(getState());
        return api
            .logoutUser(token)
            .then((res) => {
                localStorage.clear();
                const userData = {
                    user: {},
                    token: null,
                };
                dispatch(setStoreSession(userData));
                return res;
            });
    };
}

export function userDetails(id) {
    return (dispatch, getState, api) => api
        .userInfo(id)
        .then(res => res);
}

export function profileUpdate(data) {
    return (dispatch, getState, api) => {
        const token = selectors.getUserToken(getState());
        return api
            .updateUserInfo(data, token)
            .then((res) => {
                if (res.detail === 'Invalid token.') {
                    alert(tokenExpireMessage); // eslint-disable-line no-alert
                    localStorage.clear();
                    const userData = {
                        user: {},
                        token: null,
                    };
                    dispatch(setStoreSession(userData));
                    window.location.href = '/student-login';
                    return null;
                }
                return res;
            });
    };
}

export function setEventRegister(data) {
    return (dispatch, getState, api) => {
        const token = selectors.getUserToken(getState());
        return api
            .eventRegister(data, token)
            .then((res) => {
                if (res.detail === 'Invalid token.') {
                    alert(tokenExpireMessage); // eslint-disable-line no-alert
                    localStorage.clear();
                    const userData = {
                        user: {},
                        token: null,
                    };
                    dispatch(setStoreSession(userData));
                    window.location.href = '/student-login';
                    return null;
                }
                return res;
            });
    };
}

export function setUserReview(data) {
    return (dispatch, getState, api) => {
        const token = selectors.getUserToken(getState());
        return api
            .addUserReview(data, token)
            .then((res) => {
                if (res.detail === 'Invalid token.') {
                    alert(tokenExpireMessage); // eslint-disable-line no-alert
                    localStorage.clear();
                    const userData = {
                        user: {},
                        token: null,
                    };
                    dispatch(setStoreSession(userData));
                    window.location.href = '/student-login';
                    return null;
                }
                return res;
            });
    };
}

export function updatePassword(data) {
    return (dispatch, getState, api) => {
        const token = selectors.getUserToken(getState());
        return api
            .changePassword(data, token)
            .then((res) => {
                if (res.detail === 'Invalid token.') {
                    alert(tokenExpireMessage); // eslint-disable-line no-alert
                    localStorage.clear();
                    const userData = {
                        user: {},
                        token: null,
                    };
                    dispatch(setStoreSession(userData));
                    window.location.href = '/student-login';
                    return null;
                }
                return res;
            });
    };
}

export function verifyToken(token) {
    return (dispatch, getState, api) => api
        .verifyFPToken(token)
        .then(res => res);
}

export function resetPassword(data) {
    return (dispatch, getState, api) => api
        .changeResetPassword(data)
        .then(res => res);
}

export function setCatList(getData) {
    const fData = getData;
    return (dispatch, getState, api) => api
        .getCatList(getData)
        .then((res) => {
            if (fData.parent_id !== 'all') {
                if (res.data && res.data.status === 'success') {
                    const data = res.data.records;
                    dispatch(setCategorieList(data));
                }
            }
            return res;
        });
}

export function setCourseList(getData) {
    return (dispatch, getState, api) => {
        const userInfo = selectors.getUserInfo(getState());
        const userId = (userInfo && userInfo.id) ? userInfo.id : 0;
        const fdata = getData;
        fdata.userId = userId;
        return api
            .courseList(fdata)
            .then(res => res);
    };
}

export function setWishList(getData) {
    return (dispatch, getState, api) => {
        const userInfo = selectors.getUserInfo(getState());
        const userId = (userInfo && userInfo.id) ? userInfo.id : 0;
        const fdata = getData;
        fdata.userId = userId;
        return api
            .wishList(fdata)
            .then(res => res);
    };
}

export function setCourseReview(data) {
    return (dispatch, getState, api) => {
        const token = selectors.getUserToken(getState());
        return api
            .addCourseReview(data, token)
            .then((res) => {
                if (res.detail === 'Invalid token.') {
                    alert(tokenExpireMessage); // eslint-disable-line no-alert
                    localStorage.clear();
                    const userData = {
                        user: {},
                        token: null,
                    };
                    dispatch(setStoreSession(userData));
                    window.location.href = '/student-login';
                    return null;
                }
                return res;
            });
    };
}

export function courseDetails(slug) {
    return (dispatch, getState, api) => {
        const userInfo = selectors.getUserInfo(getState());
        const userId = (userInfo && userInfo.id) ? userInfo.id : 0;
        return api
            .getCourseDetails(slug, userId)
            .then(res => res);
    };
}

export function setEventDetails(slug) {
    return (dispatch, getState, api) => {
        const userInfo = selectors.getUserInfo(getState());
        const userId = (userInfo && userInfo.id) ? userInfo.id : 0;
        return api
            .eventDetails(slug, userId)
            .then(res => res);
    };
}

export function setCourseReviewList(data) {
    return (dispatch, getState, api) => api
        .courseReviewList(data)
        .then(res => res);
}

export function setBlockContentList(data) {
    return (dispatch, getState, api) => api
        .blockContentList(data)
        .then(res => res);
}

export function setTeamList(data) {
    return (dispatch, getState, api) => api
        .teamList(data)
        .then(res => res);
}

export function setEventList(data) {
    return (dispatch, getState, api) => api
        .eventList(data)
        .then(res => res);
}

export function setUserReviewList(data) {
    return (dispatch, getState, api) => api
        .userReviewList(data)
        .then(res => res);
}

export function setEnrollRequest(data) {
    return (dispatch, getState, api) => {
        const token = selectors.getUserToken(getState());
        return api
            .sendEnrollRequest(data, token)
            .then((res) => {
                if (res.detail === 'Invalid token.') {
                    alert(tokenExpireMessage); // eslint-disable-line no-alert
                    localStorage.clear();
                    const userData = {
                        user: {},
                        token: null,
                    };
                    dispatch(setStoreSession(userData));
                    window.location.href = '/student-login';
                    return null;
                }
                return res;
            });
    };
}

export function setToFavourite(data) {
    return (dispatch, getState, api) => {
        const token = selectors.getUserToken(getState());
        return api
            .addToFavourite(data, token)
            .then((res) => {
                if (res.detail === 'Invalid token.') {
                    alert(tokenExpireMessage); // eslint-disable-line no-alert
                    localStorage.clear();
                    const userData = {
                        user: {},
                        token: null,
                    };
                    dispatch(setStoreSession(userData));
                    window.location.href = '/student-login';
                    return null;
                }
                return res;
            });
    };
}

export function setContact(data) {
    return (dispatch, getState, api) => api
        .contact(data)
        .then(res => res);
}

export function setJoinUs(data) {
    return (dispatch, getState, api) => api
        .joinUs(data)
        .then(res => res);
}

export function setBlogList(data) {
    return (dispatch, getState, api) => api
        .blogList(data)
        .then(res => res);
}

export function setBlogDetails(slug) {
    return (dispatch, getState, api) => api
        .blogDetails(slug)
        .then(res => res);
}

export function setBlogCommentList(data) {
    return (dispatch, getState, api) => api
        .blogCommentList(data)
        .then(res => res);
}

export function setBlogComment(data) {
    return (dispatch, getState, api) => {
        const token = selectors.getUserToken(getState());
        return api
            .blogComment(data, token)
            .then((res) => {
                if (res.detail === 'Invalid token.') {
                    alert(tokenExpireMessage); // eslint-disable-line no-alert
                    localStorage.clear();
                    const userData = {
                        user: {},
                        token: null,
                    };
                    dispatch(setStoreSession(userData));
                    window.location.href = '/student-login';
                    return null;
                }
                return res;
            });
    };
}

export function setSliders(sliderId) {
    return (dispatch, getState, api) => api
        .getSliders(sliderId)
        .then(res => res);
}
