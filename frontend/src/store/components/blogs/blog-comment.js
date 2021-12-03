import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import { imageExists } from './../../helpers/';
import Model from './../model/';
import defaultProfilePic from './../../../assets/images/all-icon/profile.jpeg';

const config = require('./../../../config.js');

const { imageUrl } = config;

export default class BlogComments extends React.Component {
    getReplies = (commentId, level) => {
        const this1 = this;
        const nextLevel = level + 1;
        const replies = this.props.comments.filter(comment => comment.parent === commentId);
        if (replies && replies.length > 0) {
            return (
                <ul className="replay">
                    { replies.map(comment => (
                        <li key = {`comment-list-${comment.comment_id}`} style = {{ width: '100%' }}>
                            <div className="comment">
                                <div className="comment-author">
                                    <div className="author-thum">
                                        <Link to = {`/user/${comment.user}`}>
                                            <img src={(comment.profile_image && imageExists(`${imageUrl}/media/${comment.profile_image}`)) ? `${imageUrl}/media/${comment.profile_image}` : defaultProfilePic} alt="Reviews" width="50" />
                                        </Link>
                                    </div>
                                    <div className="comment-name">
                                        <h6><Link to = {`/user/${comment.user}`}> {`${comment.first_name} ${comment.last_name}`}</Link></h6>
                                        <span> {moment(comment.created_at).format('MMMM DD,  YYYY')}</span>
                                    </div>
                                </div>
                                <div className="comment-description pt-20">
                                    <p>{comment.comment}</p>
                                </div>
                                {(level < 2) ? (
                                    <div className="comment-replay">
                                        <a
                                            href = "true"
                                            data-toggle="modal"
                                            data-target={`#myCommentModal${comment.comment_id}`}
                                        >
                                        Reply
                                        </a>
                                        <Model
                                            contentType="comment_replay"
                                            title="Reply"
                                            user_id = {(
                                                this.props.user_id
                                            ) ? this.props.user_id : 0 }
                                            blog_id = {
                                                (
                                                    this.props.blog_id
                                                ) ? this.props.blog_id : 0
                                            }
                                            comment_id = {comment.comment_id}
                                            onSetBlogComment = {this.props.onSetBlogComment}
                                            updateCommentList = {this.props.updateCommentList}
                                        />
                                    </div>
                                ) : null}
                            </div>
                            {this1.getReplies(comment.comment_id, nextLevel)}
                        </li>
                    ))}
                </ul>
            );
        }
        return true;
    }

    render() {
        const { comments } = this.props;
        return (
            <InfiniteScroll
                pageStart={0}
                loadMore={this.props.loadMoreComments}
                hasMore={this.props.hasMoreComments}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
                {(comments.length > 0) ? (
                    <ul>
                        {comments.filter(comment => !comment.parent).map((comment, index) => (
                            <li key = {`comment-list-${index}`} style = {{ width: '100%' }}>
                                <div className="comment" >
                                    <div className="comment-author">
                                        <div className="author-thum">
                                            <Link to = {`/user/${comment.user}`}>
                                                <img src={(comment.profile_image && imageExists(`${imageUrl}/media/${comment.profile_image}`)) ? `${imageUrl}/media/${comment.profile_image}` : defaultProfilePic} alt="Reviews" width="50" />
                                            </Link>
                                        </div>
                                        <div className="comment-name">
                                            <h6><Link to = {`/user/${comment.user}`}> {`${comment.first_name} ${comment.last_name}`}</Link></h6>
                                            <span> {moment(comment.created_at).format('MMMM DD,  YYYY')}</span>
                                        </div>
                                    </div>
                                    <div className="comment-description pt-20">
                                        <p>{comment.comment}</p>
                                    </div>
                                    <div className="comment-replay">
                                        <a
                                            href = "true"
                                            data-toggle="modal"
                                            data-target={`#myCommentModal${comment.comment_id}`}
                                        >
                                        Reply
                                        </a>
                                        <Model
                                            contentType="comment_replay"
                                            title="Reply"
                                            user_id = {(
                                                this.props.user_id
                                            ) ? this.props.user_id : 0 }
                                            blog_id = {
                                                (
                                                    this.props.blog_id
                                                ) ? this.props.blog_id : 0
                                            }
                                            comment_id = {comment.comment_id}
                                            onSetBlogComment = {this.props.onSetBlogComment}
                                            updateCommentList = {this.props.updateCommentList}

                                        />
                                    </div>
                                </div>
                                {this.getReplies(comment.comment_id, 1)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-left text-danger"> No comments Found!!!</p>
                )}
            </InfiniteScroll>
        );
    }
}

BlogComments.propTypes = {
    blog_id: PropTypes.number.isRequired,
    comments: PropTypes.array.isRequired,
    hasMoreComments: PropTypes.bool.isRequired,
    loadMoreComments: PropTypes.func.isRequired,
    onSetBlogComment: PropTypes.func.isRequired,
    updateCommentList: PropTypes.func.isRequired,
    user_id: PropTypes.number.isRequired,
};
