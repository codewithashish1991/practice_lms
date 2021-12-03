const axios = require('axios');
const config = require('./../../config.js');

const { apiUrl } = config;

function registerUser(data) {
    const url = `${apiUrl}accounts/register`;
    return axios.post(url, data).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function contact(data) {
    const url = `${apiUrl}crm/contact`;
    return axios.post(url, data).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function loginUser(data) {
    const url = `${apiUrl}accounts/login`;
    return axios.post(url, data).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function logoutUser(token) {
    const url = `${apiUrl}accounts/logout`;
    return axios.post(url, {}, {
        headers: { Authorization: `token ${token}` },
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function updateUserInfo(data, token) {
    const url = `${apiUrl}accounts/update`;
    return axios.put(url, data, {
        headers: {
            Authorization: `token ${token}`, 'content-type': 'multipart/form-data',
        },
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function changePassword(data, token) {
    const url = `${apiUrl}accounts/change_password`;
    return axios.post(url, data, {
        headers: {
            Authorization: `token ${token}`,
        },
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function userInfo(id) {
    const url = `${apiUrl}accounts/${id}`;
    return axios.post(url, {}).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function addUserReview(data, token) {
    const url = `${apiUrl}accounts/add_review`;
    return axios.post(url, data, {
        headers: {
            Authorization: `token ${token}`, 'content-type': 'application/json',
        },
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}


function forgotPassword(email) {
    const url = `${apiUrl}accounts/forgot_password`;
    return axios.post(url, { email }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function changeResetPassword(data) {
    const url = `${apiUrl}accounts/reset_password`;
    return axios.put(url, data).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function verifyFPToken(token) {
    const url = `${apiUrl}accounts/verify_token/${token}`;
    return axios.get(url).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function getCatList(getData) {
    const url = `${apiUrl}categories/`;
    return axios.get(url, {
        params: getData,
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function teamList(getData) {
    const url = `${apiUrl}accounts/list`;
    return axios.get(url, {
        params: getData,
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function blockContentList(getData) {
    const url = `${apiUrl}contents/`;
    return axios.get(url, {
        params: getData,
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function courseList(getData) {
    const url = `${apiUrl}courses/`;
    return axios.get(url, {
        params: getData,
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function wishList(getData) {
    const url = `${apiUrl}courses/wishlist`;
    return axios.get(url, {
        params: getData,
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function getCourseDetails(slug, userId) {
    const url = `${apiUrl}courses/${slug}`;
    return axios.get(url, {
        params: { userId },
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function addCourseReview(data, token) {
    const url = `${apiUrl}courses/add_review`;
    return axios.post(url, data, {
        headers: {
            Authorization: `token ${token}`, 'content-type': 'application/json',
        },
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function courseReviewList(data) {
    const url = `${apiUrl}courses/reviews`;
    return axios.get(url, {
        params: data,
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function userReviewList(data) {
    const url = `${apiUrl}accounts/reviews`;
    return axios.get(url, {
        params: data,
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function sendEnrollRequest(data, token) {
    const url = `${apiUrl}courses/add_enroll_user`;
    return axios.post(url, data, {
        headers: {
            Authorization: `token ${token}`, 'content-type': 'application/json',
        },
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function addToFavourite(data, token) {
    const url = `${apiUrl}courses/add_to_favourite`;
    return axios.post(url, data, {
        headers: {
            Authorization: `token ${token}`, 'content-type': 'application/json',
        },
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function joinUs(data) {
    const url = `${apiUrl}crm/carrer`;
    return axios.post(url, data).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function eventList(getData) {
    const url = `${apiUrl}events/list`;
    return axios.get(url, {
        params: getData,
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function eventDetails(slug, userId) {
    const url = `${apiUrl}events/${slug}`;
    return axios.get(url, {
        params: { userId },
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function eventRegister(data, token) {
    const url = `${apiUrl}events/book_seat`;
    return axios.post(url, data, {
        headers: {
            Authorization: `token ${token}`,
        },
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function blogList(getData) {
    const url = `${apiUrl}blogs/list`;
    return axios.get(url, {
        params: getData,
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function blogDetails(slug) {
    const url = `${apiUrl}blogs/${slug}`;
    return axios.get(url).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function blogCommentList(getData) {
    const url = `${apiUrl}blogs/comments`;
    return axios.get(url, {
        params: getData,
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function blogComment(data, token) {
    const url = `${apiUrl}blogs/comment/add`;
    return axios.post(url, data, {
        headers: {
            Authorization: `token ${token}`,
        },
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}

function getSliders(id) {
    const url = `${apiUrl}contents/sliders`;
    return axios.get(url, {
        params: {
            content_id: id,
        },
    }).then(res => res).catch((error) => {
        if (error.response) {
            return error.response.data;
        }
        return error;
    });
}


export default {
    addCourseReview,
    addToFavourite,
    addUserReview,
    blockContentList,
    blogComment,
    blogCommentList,
    blogDetails,
    blogList,
    changePassword,
    changeResetPassword,
    contact,
    courseList,
    courseReviewList,
    eventDetails,
    eventList,
    eventRegister,
    forgotPassword,
    getCatList,
    getCourseDetails,
    getSliders,
    joinUs,
    loginUser,
    logoutUser,
    registerUser,
    sendEnrollRequest,
    teamList,
    updateUserInfo,
    userInfo,
    userReviewList,
    verifyFPToken,
    wishList,
};
