import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
    FacebookIcon,
    LinkedinIcon,
    PinterestIcon,
    TwitterIcon,
    WhatsappIcon,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from 'react-share';


import { imageExists } from './../../helpers/';
import defaultBlogPic from './../../../assets/images/all-icon/default-blog.png';
import BlogComment from './blog-comment';
import BlogCommentAdd from './blog-comment-add';

const config = require('./../../../config.js');

const { imageUrl } = config;
export default class BlogDetails extends React.Component {
    render() {
        const { blog, currentUser, comments } = this.props;
        const blogUrl = `https://localhost:3001/blog/${blog.slug}`;
        return (
            <div className="blog-details mt-30">
                <div className="thum">
                    <img
                        src={
                            (
                                blog.image
                            &&
                            imageExists(imageUrl + blog.image)
                            ) ?
                                imageUrl + blog.image :
                                defaultBlogPic}
                        alt={(blog.title && blog.title.length > 10) ? `${blog.title.substring(0, 10)}...` : blog.title}
                        style = {{ width: '100%' }}
                    />
                </div>
                <div className="cont">
                    <h3>{blog.title}</h3>
                    <ul>
                        <li><span><i className="fa fa-calendar" style = {{ color: '#0062cc' }}></i> {moment(blog.added_at).format('DD MMM YYYY')}</span></li>
                        <li><span><Link style = {{ color: '#000' }} to = {`/user/${blog.owner}`}> <i className="fa fa-user"></i> {`${blog.first_name} ${blog.last_name}`}</Link></span></li>
                        <li><span><i className="fa fa-tags" style = {{ color: '#0062cc' }}></i> {blog.category_name}</span></li>
                        <li><span><i className="fa fa-eye" aria-hidden="true"></i> {blog.no_of_views}</span></li>
                    </ul>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: blog.description,
                        }}></div>

                    <ul className="share">
                        <li className="title">Share :</li>
                        <FacebookShareButton url={ blogUrl } >
                            <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                        <li>
                        </li>
                        <li>
                            <TwitterShareButton title={blog.title} url={ blogUrl } >
                                <TwitterIcon size={32} round={true} />
                            </TwitterShareButton>
                        </li>
                        <li>
                            <WhatsappShareButton url={ blogUrl } >
                                <WhatsappIcon size={32} round={true} />
                            </WhatsappShareButton>
                        </li>
                        <li>
                            <PinterestShareButton url={ blogUrl } media="https://localhost:3001/blog/india-china-stand-off-doklam-ladakh-border-" >
                                <PinterestIcon size={32} round={true} />
                            </PinterestShareButton>
                        </li>
                        <li>
                            <LinkedinShareButton url={ blogUrl } >
                                <LinkedinIcon size={32} round={true} />
                            </LinkedinShareButton>
                        </li>
                    </ul>
                    <div className="blog-comment pt-45">
                        <div className="title pb-15">
                            <h3>Comment ( {this.props.totalComments} )</h3>
                        </div>
                        <BlogComment
                            blog_id = {(blog.blog_id) ? blog.blog_id : 0}
                            comments = {comments}
                            hasMoreComments = {this.props.hasMoreComments}
                            loadMoreComments = {this.props.loadMoreComments}
                            onSetBlogComment = {this.props.onSetBlogComment}
                            updateCommentList = {this.props.updateCommentList}
                            user_id = {currentUser.id}
                        />
                        {(currentUser.id) ? (
                            <div>
                                <div className="title pt-45 pb-25">
                                    <h3>Leave a comment</h3>
                                </div>
                                <BlogCommentAdd
                                    blog_id = {(blog.blog_id) ? blog.blog_id : 0}
                                    user_id = {currentUser.id}
                                    onSetBlogComment = {this.props.onSetBlogComment}
                                    updateCommentList = {this.props.updateCommentList}
                                />
                            </div>
                        ) : null }
                    </div>
                </div>
            </div>
        );
    }
}

BlogDetails.propTypes = {
    blog: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    currentUser: PropTypes.object.isRequired,
    hasMoreComments: PropTypes.bool.isRequired,
    loadMoreComments: PropTypes.func.isRequired,
    onSetBlogComment: PropTypes.func.isRequired,
    totalComments: PropTypes.number.isRequired,
    updateCommentList: PropTypes.func.isRequired,
};
