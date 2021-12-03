import { connect } from 'react-redux';
import Blogs from './../components/blogs/';
import { getUserInfo } from './../selectors/';
import {
    setBlogComment,
    setBlogCommentList,
    setBlogDetails,
    setBlogList,
    setCatList,
} from './../middleware/thunks';

export function mapStateToProps(state, ownProps) {
    return {
        currentUser: getUserInfo(state),
        slug: (
            ownProps.match.params.slug
        ) ? ownProps.match.params.slug : '',
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        onSetAllCategories: data => dispatch(setCatList(data)),
        onSetBlogComment: data => dispatch(setBlogComment(data)),
        onSetBlogCommentList: data => dispatch(setBlogCommentList(data)),
        onSetBlogDetails: slug => dispatch(setBlogDetails(slug)),
        onSetBlogList: data => dispatch(setBlogList(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);
