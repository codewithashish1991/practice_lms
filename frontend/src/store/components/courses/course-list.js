import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { imageExists } from './../../helpers/';
import defaultProfilePic from './../../../assets/images/all-icon/profile.jpeg';
import defaultCoursePic from './../../../assets/images/all-icon/default-course.png';

const config = require('./../../../config.js');

const { imageUrl } = config;

export default class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            search_text: '',
        };
        this.addToFavourite = this.addToFavourite.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    addToFavourite = (courseId) => {
        const data = {};
        const this1 = this;
        const userId = (
            this.props.loggedinUser && this.props.loggedinUser.id
        ) ? this.props.loggedinUser.id : '0';
        const { courses } = this.state;
        const index = courses.findIndex(x => x.course_id === parseInt(courseId, 10));
        let msg = '';
        if (parseInt(userId, 10) > 0) {
            data.user = userId;
            data.course = courseId;
            const result = this.props.onSetToFavourite(data);
            result.then((res) => {
                if (res.data && res.data.status === 'success') {
                    msg = res.data.message;
                    const fcourse = courses;
                    let count = fcourse[index].fav_count;
                    let isFavourite = false;
                    if (msg.includes('added') === true) {
                        isFavourite = true;
                        count += 1;
                    } else {
                        count -= 1;
                    }
                    fcourse[index].is_favourite = isFavourite;
                    fcourse[index].fav_count = count;
                    this1.setState({ courses: [] });
                } else {
                    msg = 'Something went wrong. Please try again after sometime.';
                }
                alert(msg); // eslint-disable-line no-alert
            });
        } else {
            alert('Please login to add this course in your favourite list.'); // eslint-disable-line no-alert
        }
    }

    handleChange = (event) => {
        this.setState({
            search_text: event.target.value,
        });
    }

    handleSearch = () => {
        const search = this.state.search_text;
        if (search !== '') {
            this.props.handleSearch(search);
        } else {
            alert('Please type something on search box.'); // eslint-disable-line no-alert
        }
    }

    componentDidUpdate() {
        if (this.state.courses !== this.props.courses) {
            this.setState({ courses: this.props.courses });
        }
    }

    render() {
        const activePage = this.props.coursesPage;
        const { limit } = this.props;
        const totalPage = Math.ceil(this.props.totalRecords / this.props.limit);
        return (
            <div className="my-container">
                {(this.state.courses.length > 0) ? (
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="courses-top-search">
                                <ul className="nav float-left" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="active" id="courses-grid-tab" data-toggle="tab" href="#courses-grid" role="tab" aria-controls="courses-grid" aria-selected="true"><i className="fa fa-th-large"></i></a>
                                    </li>
                                    <li className="nav-item">
                                        <a id="courses-list-tab" data-toggle="tab" href="#courses-list" role="tab" aria-controls="courses-list" aria-selected="false"><i className="fa fa-th-list"></i></a>
                                    </li>
                                    <li className="nav-item">Showning {limit} 0f {this.props.totalRecords} Results</li>
                                </ul>

                                <div className="courses-search float-right">
                                    <form action="#">
                                        <input type="text" onChange = {this.handleChange} value = {this.state.search_text} placeholder="Search" />
                                        <button type="button" onClick = {this.handleSearch} ><i className="fa fa-search"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}

                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="courses-grid" role="tabpanel" aria-labelledby="courses-grid-tab">
                        {(this.state.courses.length > 0) ? (
                            <div className="row">
                                {this.state.courses.map((course, index) => (
                                    <div className="col-lg-4 col-md-6" key ={`grid-${course.course_id}-${index}`}>
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
                                                    <span>&#x24;{course.price.split('.')[0]} </span>
                                                </div>
                                            </div>
                                            <div className="cont">
                                                <ul>
                                                    {Array.apply(0, Array(5)).map((x, i) => <li key = {`star-${i}-${course.course_id}`}><i className= {(course.avg_review && course.avg_review.rating__avg > i) ? 'fa fa-star' : 'fa fa-star-o'}></i>{x}</li>)}
                                                </ul>
                                                <span>( {course.review_count} Reviews)</span>
                                                <Link to={`/course/${course.slug}`}><h4>{(course.title.length > 36) ? `${course.title.substring(0, 36)}...` : course.title}</h4></Link>
                                                <div className="course-teacher">
                                                    <div className="thum">
                                                        <Link to={`/user/${course.owner}`}><img src={(course.profile_image && imageExists(`${imageUrl}/media/${course.profile_image}`)) ? `${imageUrl}/media/${course.profile_image}` : defaultProfilePic} alt="teacher" /> </Link>
                                                    </div>
                                                    <div className="name">
                                                        <Link to={`/user/${course.owner}`}><h6>{`${course.first_name} ${course.last_name}`}</h6></Link>
                                                    </div>
                                                    <div className="admin">
                                                        <ul>
                                                            <li><i className={course.is_enrolled ? 'fa fa-user' : 'fa fa-user-o'}></i><span>{course.enroll_users}</span></li>
                                                            <li onClick = {
                                                                () => this.addToFavourite(
                                                                    course.course_id,
                                                                )
                                                            } >
                                                                <i className={ (course.is_favourite) ? 'fa fa-heart' : 'fa fa-heart-o'}></i><span>{course.fav_count}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        ) : (
                            <p className="text-left text-danger"> No course found.</p>
                        )}

                    </div>
                    <div className="tab-pane fade" id="courses-list" role="tabpanel" aria-labelledby="courses-list-tab">
                        <div className="row">
                            {this.state.courses.map((course, index) => (
                                <div className="col-lg-12" key ={`list-${course.course_id}-${index}`}>
                                    <div className="singel-course mt-30">
                                        <div className="row no-gutters">
                                            <div className="col-md-6">
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
                                                        <span>&#x24;{course.price.split('.')[0]} </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="cont">
                                                    <ul>
                                                        {Array.apply(0, Array(5)).map((x, i) => <li key = {`star-${i}-${course.course_id}`}><i className= {(course.avg_review && course.avg_review.rating__avg > i) ? 'fa fa-star' : 'fa fa-star-o'}></i>{x}</li>)}
                                                    </ul>
                                                    <span>( {course.review_count} Reviews)</span>
                                                    <Link to={`/course/${course.slug}`}><h4>{course.title}</h4></Link>
                                                    <div className="course-teacher">
                                                        <div className="thum">
                                                            <Link to={`/user/${course.owner}`}><img src={(course.profile_image && imageExists(`${imageUrl}/media/${course.profile_image}`)) ? `${imageUrl}/media/${course.profile_image}` : defaultProfilePic} alt="teacher" /> </Link>
                                                        </div>
                                                        <div className="name">
                                                            <Link to={`/user/${course.owner}`}><h6>{`${course.first_name} ${course.last_name}`}</h6></Link>
                                                        </div>
                                                        <div className="admin">
                                                            <ul>
                                                                <li><i className={course.is_enrolled ? 'fa fa-user' : 'fa fa-user-o'}></i><span>{course.enroll_users}</span></li>
                                                                <li onClick = {
                                                                    () => this.addToFavourite(
                                                                        course.course_id,
                                                                    )
                                                                }>
                                                                    <i className={ (course.is_favourite) ? 'fa fa-heart' : 'fa fa-heart-o'}></i><span>{course.fav_count}</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {(totalPage > 1) ? (

                    <div className="col-md-12">
                        <div className="test">
                            <nav className="courses-pagination mt-50">
                                <ul className="pagination justify-content-center text-center">
                                    {(activePage !== 1) ? (
                                        <li className="page-item">
                                            <button aria-label="Previous" onClick = {() => this.props.handlePageChange(activePage - 1, this.state.search_text)}>
                                                <i className="fa fa-angle-left"></i>
                                            </button>
                                        </li>
                                    ) : null}
                                    {Array.apply(0, Array(totalPage)).map((x, i) => <li className="page-item" key = {`course-page${i}`}><button className={(activePage === i + 1) ? 'active' : ''} onClick = {() => this.props.handlePageChange(i + 1, this.state.search_text)}>{i + 1}</button></li>)}
                                    {(activePage !== totalPage) ? (
                                        <li className="page-item">
                                            <button aria-label="Next" onClick = {() => this.props.handlePageChange(activePage + 1, this.state.search_text)}>
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
        );
    }
}

CourseList.propTypes = {
    courses: PropTypes.array.isRequired,
    coursesPage: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    limit: PropTypes.number.isRequired,
    loggedinUser: PropTypes.object.isRequired,
    totalRecords: PropTypes.number.isRequired,
};
