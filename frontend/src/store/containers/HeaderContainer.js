import { connect } from 'react-redux';
import Header from './../components/header/';
import {
    getCategories,
    getUserInfo,
    getBlocks,
} from './../selectors/';
import {
    logout,
    setBlockContentList,
    setCatList,
} from './../middleware/thunks';

export function mapStateToProps(state) {
    return {
        staticBlocks: getBlocks(state),
        userInfo: getUserInfo(state),
        categories: getCategories(state),
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        onLogout: () => dispatch(logout()),
        onSetBlockContentList: data => dispatch(setBlockContentList(data)),
        onSetCatList: data => dispatch(setCatList(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
