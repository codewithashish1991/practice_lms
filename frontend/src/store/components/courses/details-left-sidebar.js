import React from 'react';
import PropTypes from 'prop-types';
import AllCategoriesSidebar from './all-categories-sidebar';

export default class CourseDetailsSideBar extends React.Component {
    onSetEnrollUser = () => {
        this.props.toggleEnrolledUser();
    }

    render() {
        const { course } = this.props;
        return (
            <div className="col-lg-4">
                <div className="row">
                    <div className="col-lg-12 col-md-6">
                        <div className="course-features mt-30">
                            <h4>Course Features </h4>
                            <ul>
                                <li><i className="fa fa-clock-o"></i>Duaration : <span>{course.durations_in_hours} Hours {course.durations_in_minutes} Minutes</span></li>
                                <li><i className="fa fa-clone"></i>Leactures : <span>{(course.lactures) ? course.lactures.length : 0 }</span></li>
                                <li><i className="fa fa-heart"></i>Favorite :  <span>{course.fav_count}</span></li>
                                <li><i className="fa fa-user-o"></i>Students :  <span>{course.enroll_users}</span></li>
                            </ul>
                            <div className="price-button pt-10">
                                <span>Price : <b>${course.price}</b></span>
                                {(course.is_enrolled) ? null : (
                                    <button type="button" className="main-btn" onClick = {this.onSetEnrollUser}>Enroll Now</button>
                                )}
                            </div>
                        </div>
                    </div>
                    <AllCategoriesSidebar categories = {this.props.categories} />
                </div>
            </div>
        );
    }
}

CourseDetailsSideBar.propTypes = {
    categories: PropTypes.array.isRequired,
    course: PropTypes.object.isRequired,
    loggedinUser: PropTypes.object.isRequired,
    toggleEnrolledUser: PropTypes.func.isRequired,
};
