import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { imageExists } from './../../helpers/';
import defaultProfilePic from './../../../assets/images/all-icon/profile.jpeg';
import defaultCoursePic from './../../../assets/images/all-icon/default-course.png';

const config = require('./../../../config.js');

const { imageUrl } = config;

export default class FeaturedCourses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            itemsLenght: 5,
            courses: [],
            responsive: {
                1024: {
                    items: 3,
                },
            },
        };
        this.addToFavourite = this.addToFavourite.bind(this);
        this.slideNext = this.slideNext.bind(this);
        this.slidePrev = this.slidePrev.bind(this);
    }

    slidePrev = () => {
        const currentIndex = this.state.currentIndex - 1;
        if (currentIndex > -1) {
            this.setState({ currentIndex });
        }
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

    slideNext = () => {
        const currentIndex = this.state.currentIndex + 1;
        if (currentIndex < this.state.itemsLenght) {
            this.setState({ currentIndex });
        }
    }

    componentDidUpdate() {
        if (this.state.courses !== this.props.featuredCourses) {
            this.setState({ courses: this.props.featuredCourses });
        }
    }
    render() {
        return (
            <section id="course-part" className="pt-115 pb-120 gray-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="section-title pb-45">
                                <h5>Our course</h5>
                                <h2>Featured courses </h2>
                            </div>
                        </div>
                    </div>
                    {(this.state.courses.length > 0) ? (
                        <div className="row course-slied mt-30">
                            <div className="col-md-11"></div>
                            <div className="col-md-1">
                                <span
                                    className="prev btn btn-primary"
                                    onClick={() => this.slidePrev()}
                                >
                                    <i className="fa fa-angle-left"></i>
                                </span>
                            &nbsp;
                                <span
                                    className="next btn btn-primary"
                                    onClick={() => this.slideNext()}
                                >
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </div>
                            <AliceCarousel
                                autoPlay={true}
                                autoPlayInterval = {2500}
                                buttonsDisabled={true}
                                dotsDisabled={true}
                                infinite={true}
                                mouseTrackingEnabled
                                playButtonEnabled = {false}
                                responsive={this.state.responsive}
                                slideToIndex={this.state.currentIndex}
                                stopAutoPlayOnHover={true}
                            >
                                {this.state.courses.map((course, index) => (
                                    <div className="col-lg-12" key ={`fcourse-${course.course_id}-${index}`}>
                                        <div className="singel-course">
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
                                                    <span>&#x24;{course.price} </span>
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
                                                            <li
                                                                onClick = {
                                                                    () => this.addToFavourite(
                                                                        course.course_id,
                                                                    )
                                                                }
                                                            >
                                                                <i className={ (course.is_favourite) ? 'fa fa-heart' : 'fa fa-heart-o'}></i>
                                                                <span>{course.fav_count}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </AliceCarousel>
                        </div>
                    ) : (
                        <p className="text-left text-danger"> No featured course found.</p>
                    )}
                </div>
            </section>
        );
    }
}

FeaturedCourses.propTypes = {
    featuredCourses: PropTypes.array.isRequired,
    loggedinUser: PropTypes.object.isRequired,
    onSetToFavourite: PropTypes.func.isRequired,
};

