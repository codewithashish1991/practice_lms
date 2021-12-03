import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import AddReview from './add-review';
import { imageExists } from './../../helpers/';
import defaultProfilePic from './../../../assets/images/all-icon/profile.jpeg';

const config = require('./../../../config.js');

const { imageUrl } = config;

export default class CourseReviews extends React.Component {
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
                                            <Link to = {`/user/${review.user}`}>
                                                <img src={(review.profile_image && imageExists(`${imageUrl}/media/${review.profile_image}`)) ? `${imageUrl}/media/${review.profile_image}` : defaultProfilePic} alt="Reviews" width="50" />
                                            </Link>
                                        </div>
                                        <div className="author-name">
                                            <h6><Link to = {`/user/${review.user}`}> {`${review.first_name} ${review.last_name}`}</Link></h6>
                                            <span>{moment(review.created_at).format('LLL')}</span>
                                        </div>
                                    </div>
                                    <div className="reviews-description pt-20">
                                        {review.review}
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
                {(this.props.loggedinUser.first_name) ? (
                <><div className="title pt-15">
                    <h6>Leave A Comment</h6>
                </div>'               '<div className="reviews-form">
                    <AddReview
                        users_id = {this.props.loggedinUser.id}
                        course_id = {this.props.course_id}
                        onSetCourseReview = {this.props.onSetCourseReview}
                    />
                </div></>
                ) : null }
            </div>
        );
    }
}

CourseReviews.propTypes = {
    course_id: PropTypes.number.isRequired,
    loggedinUser: PropTypes.object.isRequired,
    onSetCourseReview: PropTypes.func.isRequired,
    reviews: PropTypes.array.isRequired,
};
