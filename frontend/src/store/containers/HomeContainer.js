import { connect } from 'react-redux';
import Home from './../components/home/';
import {
    register,
    setBlogList,
    setCourseList,
    setEventList,
    setSliders,
    setToFavourite,
} from './../middleware/thunks';
import { getBlocks, getCategories, getUserInfo } from './../selectors/';

export function mapStateToProps(state) {
    return {
        blocks: getBlocks(state),
        categories: getCategories(state),
        currentUser: getUserInfo(state),
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        onRegister: data => dispatch(register(data)),
        onSetBlogList: data => dispatch(setBlogList(data)),
        onSetSliders: sliderId => dispatch(setSliders(sliderId)),
        onSetCourseList: data => dispatch(setCourseList(data)),
        onSetEventList: data => dispatch(setEventList(data)),
        onSetToFavourite: data => dispatch(setToFavourite(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
