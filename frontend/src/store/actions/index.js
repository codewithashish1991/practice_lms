export const CATEGORIE_LIST = 'CATEGORIE_LIST';
export const USER_INFO = 'USER_INFO';

export function setStoreSession(data) {
    return { type: USER_INFO, value: data };
}

export function setCategorieList(data) {
    return { type: CATEGORIE_LIST, value: data };
}
