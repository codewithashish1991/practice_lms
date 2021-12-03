import { connect } from 'react-redux';
import Course from './../components/courses/';
import {
    courseDetails,
    setCatList,
    setCourseList,
    setCourseReview,
    setCourseReviewList,
    setEnrollRequest,
    setToFavourite,
} from './../middleware/thunks';
import { getUserInfo } from './../selectors/';

export function mapStateToProps(state, ownProps) {
    return {
        slug: (
            ownProps.match.params.slug
        ) ? ownProps.match.params.slug : '',
        categorySlug: (
            ownProps.match.params.category_slug
        ) ? ownProps.match.params.category_slug : '',
        currentUser: getUserInfo(state),
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        onSetAllCategories: data => dispatch(setCatList(data)),
        onSetCourseDetails: slug => dispatch(courseDetails(slug)),
        onSetCourseList: data => dispatch(setCourseList(data)),
        onSetCourseReview: data => dispatch(setCourseReview(data)),
        onSetCourseReviewList: data => dispatch(setCourseReviewList(data)),
        onSetEnrollRequest: data => dispatch(setEnrollRequest(data)),
        onSetToFavourite: data => dispatch(setToFavourite(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Course);
