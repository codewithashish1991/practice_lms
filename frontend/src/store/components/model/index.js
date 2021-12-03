import React from 'react';
import PropTypes from 'prop-types';

import BookMySeat from './book-event-seat';
import CommentReply from './comment-reply';
import FileModel from './media';
import ForgotPassword from './forgot-password';

export default class Model extends React.Component {
    render() {
        const modelType = this.props.contentType;
        let modelId = 'myModal';
        if (this.props.comment_id && this.props.comment_id > 0) {
            modelId = `myCommentModal${this.props.comment_id}`;
        }
        return (
            <div id={modelId} className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{(this.props.title) ? this.props.title : 'Forgot Password'}</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        {(modelType === 'forgot_password') ? (
                            <ForgotPassword
                                onForgotPassword = {this.props.onForgotPassword}
                            />
                        ) : null}
                        {(modelType === 'book_myseat') ? (
                            <BookMySeat
                                event_id = {this.props.event_id}
                                user_id = {this.props.user_id}
                                onEventRegistration = {this.props.onEventRegistration}
                            />
                        ) : null}
                        {(modelType === 'course_media') ? (
                            <FileModel title = {this.props.title} url = {this.props.url} />
                        ) : null}
                        {(modelType === 'comment_replay') ? (
                            <CommentReply
                                blog_id = {this.props.blog_id}
                                comment_id = {this.props.comment_id}
                                onSetBlogComment = {this.props.onSetBlogComment}
                                updateCommentList = {this.props.updateCommentList}
                                user_id = {this.props.user_id}
                            />
                        ) : null}
                    </div>

                </div>
            </div>
        );
    }
}

Model.propTypes = {
    blog_id: PropTypes.number,
    comment_id: PropTypes.number,
    contentType: PropTypes.string.isRequired,
    event_id: PropTypes.number,
    onEventRegistration: PropTypes.func,
    onForgotPassword: PropTypes.func,
    onSetBlogComment: PropTypes.func,
    title: PropTypes.string,
    updateCommentList: PropTypes.func,
    url: PropTypes.string,
    user_id: PropTypes.number,
};
