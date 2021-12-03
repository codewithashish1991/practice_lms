import { CATEGORIE_LIST } from './../actions/';

const initialState = {
    categories: [],
};

export function categoryList(state = initialState, action) {
    switch (action.type) {
    case CATEGORIE_LIST:
        return {
            ...state,
            categories: action.value,
        };
    default:
        return state;
    }
}
