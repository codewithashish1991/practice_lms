import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Lactures from './lactures';
import Instructor from './instructure';
import CourseReviews from './reviews';
import EnrolledUser from './enrolled-user';
import { imageExists } from './../../helpers/';
import defaultProfilePic from './../../../assets/images/all-icon/profile.jpeg';
import defaultCoursePic from './../../../assets/images/all-icon/default-course.png';

const config = require('./../../../config.js');

const { imageUrl } = config;

export default class AllCategorySidbar extends React.Component {
    render() {
        const { course } = this.props;
        return (
            <div className="col-lg-8">
                <div className="corses-singel-left mt-30">
                    <div className="title">
                        <h3>{course.title}</h3>
                    </div>
                    <div className="course-terms">
                        <ul>
                            <li>
                                <div className="teacher-name">
                                    <div className="thum">
                                        <Link to = {`/user/${course.owner}`}>
                                            <img src={(course.profile_image && imageExists(`${imageUrl}/media/${course.profile_image}`)) ? `${imageUrl}/media/${course.profile_image}` : defaultProfilePic} alt="teacher" width="50" />
                                        </Link>
                                    </div>
                                    <div className="name">
                                        <span>Created by</span>
                                        <h6><Link to = {`/user/${course.owner}`}>{`${course.first_name} ${course.last_name}`}</Link></h6>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="course-category">
                                    <span>Category</span>
                                    <h6><Link to = {`/courses/${course.category_slug}`}>{course.category_name} </Link></h6>
                                </div>
                            </li>
                            <li>
                                <div className="review">
                                    <span>Review</span>
                                    <ul>
                                        {Array.apply(0, Array(5)).map((x, i) => <li key = {`star-${i}-${course.course_id}`}><i className= {(course.avg_review && course.avg_review.rating__avg > i) ? 'fa fa-star' : 'fa fa-star-o'}></i>{x}</li>)}
                                        <li className="rating">( {course.review_count} Reviws)</li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="corses-singel-image pt-50">
                        <img
                            src={
                                (
                                    course.image
                                &&
                                imageExists(imageUrl + course.image)
                                ) ?
                                    imageUrl + course.image :
                                    defaultCoursePic}
                            alt={(course.title) ? `${course.title.substring(0, 10)}...` : course.title}
                        />
                    </div>

                    {(this.props.enrolledUser) ? (
                        <EnrolledUser
                            course_id = { (course && course.course_id) ? course.course_id : 0 }
                            enrolledUser = {this.props.enrolledUser}
                            loggedinUser = {this.props.loggedinUser}
                            onSetEnrollRequest = {this.props.onSetEnrollRequest}
                            toggleEnrolledUser = {this.props.toggleEnrolledUser}
                        />
                    ) : (
                        <div className="corses-tab mt-30">
                            <ul className="nav nav-justified" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="active" id="overview-tab" data-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true">Overview</a>
                                </li>
                                <li className="nav-item">
                                    <a id="curriculam-tab" data-toggle="tab" href="#curriculam" role="tab" aria-controls="curriculam" aria-selected="false">Curriculam</a>
                                </li>
                                <li className="nav-item">
                                    <a id="instructor-tab" data-toggle="tab" href="#instructor" role="tab" aria-controls="instructor" aria-selected="false">Instructor</a>
                                </li>
                                <li className="nav-item">
                                    <a id="reviews-tab" data-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false">Reviews</a>
                                </li>
                            </ul>

                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                                    <div className="overview-description">
                                        <div className="singel-description pt-40">
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: course.description,
                                                }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="curriculam" role="tabpanel" aria-labelledby="curriculam-tab">
                                    <div className="curriculam-cont">
                                        <Lactures
                                            lactures = {course.lactures}
                                            is_enrolled = {course.is_enrolled}
                                        />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="instructor" role="tabpanel" aria-labelledby="instructor-tab">
                                    <Instructor course = {(course) || {} } />
                                </div>
                                <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                                    <CourseReviews
                                        loggedinUser = {this.props.loggedinUser}
                                        course_id = { (
                                            course && course.course_id
                                        ) ? course.course_id : 0 }
                                        onSetCourseReview = { this.props.onSetCourseReview }
                                        reviews = {this.props.reviews}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

AllCategorySidbar.propTypes = {
    course: PropTypes.object.isRequired,
    enrolledUser: PropTypes.bool.isRequired,
    loggedinUser: PropTypes.object.isRequired,
    onSetCourseReview: PropTypes.func.isRequired,
    onSetEnrollRequest: PropTypes.func.isRequired,
    reviews: PropTypes.array.isRequired,
    toggleEnrolledUser: PropTypes.func.isRequired,
};
