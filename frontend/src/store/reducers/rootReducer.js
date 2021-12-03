import { combineReducers } from 'redux';

import { staticBlocks } from './blocks';
import { categoryList } from './categories';
import { userInfo } from './accounts';

export default combineReducers({
    categoryList,
    userInfo,
    staticBlocks,
});
