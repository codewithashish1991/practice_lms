import { connect } from 'react-redux';
import MyAccount from './../components/account/profile';
import { getUserInfo } from './../selectors/';
import {
    profileUpdate,
    setBlogList,
    setCourseList,
    setEventList,
    setUserReview,
    setUserReviewList,
    setWishList,
    updatePassword,
    userDetails,
} from './../middleware/thunks';

export function mapStateToProps(state, ownProps) {
    return {
        currentUser: getUserInfo(state),
        userId: (
            ownProps.match.params.id
        ) ? ownProps.match.params.id : 0,
        userInfo: getUserInfo(state),
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        getUserDetails: id => dispatch(userDetails(id)),
        onProfileUpdate: data => dispatch(profileUpdate(data)),
        onSetBlogList: data => dispatch(setBlogList(data)),
        onSetCourseList: data => dispatch(setCourseList(data)),
        onSetEventList: data => dispatch(setEventList(data)),
        onSetUserReview: data => dispatch(setUserReview(data)),
        onSetUserReviewList: data => dispatch(setUserReviewList(data)),
        onSetWishList: data => dispatch(setWishList(data)),
        onUpdatePassword: data => dispatch(updatePassword(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
