export function getCategories(state) {
    return state.categoryList.categories;
}

export function getUserInfo(state) {
    return state.userInfo.account.user;
}

export function getUserToken(state) {
    return state.userInfo.account.token;
}

export function getBlocks(state) {
    return state.staticBlocks;
}
