import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { imageExists } from './../../helpers/';
import defaultProfilePic from './../../../assets/images/all-icon/profile.jpeg';
import defaultCoursePic from './../../../assets/images/all-icon/default-course.png';

const config = require('./../../../config.js');

const { imageUrl } = config;


export default class MyCourse extends React.Component {
    render() {
        const { courses } = this.props;
        const activePage = this.props.coursesPage;
        const totalPage = Math.ceil(this.props.totalRecords / this.props.limit);
        return (
            <div className="courses-cont pt-20">
                {(courses.length > 0) ? (
                    <div className="row">
                        {courses.map((course, index) => (
                            <div className="col-md-6" key ={`mycourse-${course.course_id}-${index}`}>
                                <div className="singel-course mt-30">
                                    <div className="thum">
                                        <div className="image">
                                            <img
                                                src={
                                                    (
                                                        course.image
                                                    &&
                                                    imageExists(imageUrl + course.image)
                                                    ) ?
                                                        imageUrl + course.image :
                                                        defaultCoursePic}
                                                alt={(course.title.length > 10) ? `${course.title.substring(0, 10)}...` : course.title}
                                            />
                                        </div>
                                        <div className="price">
                                            <span>&#x24; {course.price.split('.')[0]}</span>
                                        </div>
                                    </div>
                                    <div className="cont border">
                                        <ul>
                                            {Array.apply(0, Array(5)).map((x, i) => <li key = {`star-${i}-${course.course_id}`}><i className= {(course.avg_review && course.avg_review.rating__avg > i) ? 'fa fa-star' : 'fa fa-star-o'}></i>{x}</li>)}
                                        </ul>
                                        <span>( {course.review_count} Reviws)</span>
                                        <Link to={`/course/${course.slug}`}><h4>{(course.title.length > 25) ? `${course.title.substring(0, 25)}...` : course.title}</h4></Link>
                                        <div className="course-teacher">
                                            <div className="thum">
                                                <Link to={`/user/${course.owner}`}><img src={(course.profile_image && imageExists(`${imageUrl}/media/${course.profile_image}`)) ? `${imageUrl}/media/${course.profile_image}` : defaultProfilePic} alt="teacher" /> </Link>
                                            </div>
                                            <div className="name">
                                                <Link to={`/user/${course.owner}`}><h6>{`${course.first_name} ${course.last_name}`}</h6></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {(totalPage > 1) ? (

                            <div className="col-md-12">
                                <div className="test">
                                    <nav className="courses-pagination mt-50">
                                        <ul className="pagination justify-content-center text-center">
                                            {(activePage !== 1) ? (
                                                <li className="page-item">
                                                    <button aria-label="Previous" onClick = {() => this.props.handlePageChange(activePage - 1)}>
                                                        <i className="fa fa-angle-left"></i>
                                                    </button>
                                                </li>
                                            ) : null}
                                            {Array.apply(0, Array(totalPage)).map((x, i) => <li className="page-item" key = {`course-page${i}`}><button className={(activePage === i + 1) ? 'active' : ''} onClick = {() => this.props.handlePageChange(i + 1)}>{i + 1}</button></li>)}
                                            {(activePage !== totalPage) ? (
                                                <li className="page-item">
                                                    <button aria-label="Next" onClick = {() => this.props.handlePageChange(activePage + 1)}>
                                                        <i className="fa fa-angle-right"></i>
                                                    </button>
                                                </li>
                                            ) : null}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        ) : null}

                    </div>
                ) : (
                    <p className="text-left text-danger"> No course found.</p>
                )}
            </div>
        );
    }
}

MyCourse.propTypes = {
    courses: PropTypes.array.isRequired,
    coursesPage: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    limit: PropTypes.number.isRequired,
    totalRecords: PropTypes.number.isRequired,
};
