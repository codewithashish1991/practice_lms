import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ReviewForm from './profile-review-form';
import { imageExists } from './../../helpers/';
import defaultProfilePic from './../../../assets/images/all-icon/profile.jpeg';

const config = require('./../../../config.js');

const { imageUrl } = config;

export default class LeftSidebar extends React.Component {
    render() {
        const { reviews } = this.props;
        return (
            <div className="reviews-cont">
                <div className="title">
                    <h6>Student Reviews</h6>
                </div>
                {(reviews.length > 0) ? (
                    <ul>
                        {reviews.map((review, index) => (
                            <li key = {`review-list-${index}`}>
                                <div className="singel-reviews">
                                    <div className="reviews-author">
                                        <div className="author-thum">
                                            <Link to = {`/user/${review.reviewers}`}>
                                                <img src={(review.profile_image && imageExists(`${imageUrl}/media/${review.profile_image}`)) ? `${imageUrl}/media/${review.profile_image}` : defaultProfilePic} alt="Reviews" width="50" />
                                            </Link>
                                        </div>
                                        <div className="author-name">
                                            <h6><Link to = {`/user/${review.reviewers}`}> {`${review.first_name} ${review.last_name}`}</Link></h6>
                                            <span>{moment(review.created_at).format('LLL')}</span>
                                        </div>
                                    </div>
                                    <div className="reviews-description pt-20">
                                        <p>
                                            {review.review}
                                        </p>
                                        <div className="rating">
                                            <ul>
                                                {Array.apply(0, Array(5)).map((x, i) => <li key = {`review-star-${i}-${review.review_id}`}><i className= {(review.rating > i) ? 'fa fa-star' : 'fa fa-star-o'}></i>{x}</li>)}
                                            </ul>
                                            <span>/ 5 Star</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-danger">No review found.</p>
                )}
                {(
                    this.props.currentUser.id &&
                    this.props.currentUser.id !== this.props.profile.users_id
                ) ? (
                        <ReviewForm
                            reviewerId = {this.props.currentUser.id}
                            usersId = {(
                                this.props.profile.users_id
                            ) ? this.props.profile.users_id : 0}
                            onSetUserReview = {this.props.onSetUserReview}
                        />
                    ) : null}
            </div>
        );
    }
}

LeftSidebar.propTypes = {
    currentUser: PropTypes.object.isRequired,
    onSetUserReview: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    reviews: PropTypes.array.isRequired,
};
