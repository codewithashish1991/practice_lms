import React from 'react';
import PropTypes from 'prop-types';

import AllCategoriesSidebar from './all-categories-sidebar';
import Breadcrumbs from './../header/breadcrumbs';
import CourseDetails from './details';
import CourseDetailsLeftSidebar from './details-left-sidebar';
import CourseList from './course-list';

export default class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            catName: '',
            categories: [],
            categorySlug: (this.props.categorySlug) ? this.props.categorySlug : '',
            course: {},
            courses: [],
            coursesPage: 1,
            enrolledUser: false,
            limit: 9,
            reviews: [],
            slug: (this.props.slug) ? this.props.slug : '',
            totalRecords: 0,
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.toggleEnrolledUser = this.toggleEnrolledUser.bind(this);
    }

    componentDidUpdate(nextProps) {
        if (this.props.categorySlug && this.props.categorySlug !== this.state.categorySlug) {
            const { categorySlug } = nextProps;
            this.setState({ categorySlug });
            this.componentDidMount(this.props.categorySlug);
        }
    }

    componentDidMount(categorySlug = '') {
        window.scrollTo(0, 0);
        const this1 = this;
        const data = { parent_id: 'all', cat_type: 'COURSE' };
        const categories = this.props.onSetAllCategories(data);
        categories.then((res) => {
            if (res.data && res.data.status === 'success') {
                const { records } = res.data;
                this1.setState({ categories: records });
            }
        });
        if (this.state.slug) {
            const result = this.props.onSetCourseDetails(this.state.slug);
            result.then((res) => {
                if (res.data && res.data.status === 'success') {
                    const { records } = res.data;
                    this1.setState({ course: records });
                }
            });
        } else {
            const cdata = {
                category_slug: (categorySlug) || this.state.categorySlug,
                limit: this.state.limit,
                page: this.state.coursesPage,
            };
            const result = this.props.onSetCourseList(cdata);
            result.then((res) => {
                if (res.data && res.data.status === 'success') {
                    const { records } = res.data;
                    const catName = res.data.category_name;
                    const totalRecords = res.data.total_records;
                    this1.setState({
                        catName,
                        courses: records,
                        totalRecords,
                    });
                }
            });
        }
        setTimeout(() => {
            const reviewData = { course_id: this1.state.course.course_id };
            const reviews = this1.props.onSetCourseReviewList(reviewData);
            reviews.then((res) => {
                if (res.data && res.data.status === 'success') {
                    const { records } = res.data;
                    this1.setState({ reviews: records });
                }
            });
        }, 2000);
    }

    handlePageChange = (pageNo, text) => {
        const this1 = this;
        const data = {
            category_slug: this.state.categorySlug,
            limit: this.state.limit,
            page: pageNo,
            query: text,
        };
        const mycourses = this.props.onSetCourseList(data);
        mycourses.then((res) => {
            if (res.data && res.data.status === 'success') {
                const { records } = res.data;
                const totalRecords = res.data.total_records;
                this1.setState({
                    courses: records,
                    totalRecords,
                    coursesPage: pageNo,
                });
            }
        });
    }

    handleSearch = (text) => {
        const this1 = this;
        const data = {
            category_slug: this.state.categorySlug,
            limit: this.state.limit,
            page: 1,
            query: text,
        };
        const mycourses = this.props.onSetCourseList(data);
        mycourses.then((res) => {
            if (res.data && res.data.status === 'success') {
                const { records } = res.data;
                const totalRecords = res.data.total_records;
                this1.setState({
                    courses: records,
                    totalRecords,
                    coursesPage: 1,
                });
            }
        });
    }

    toggleEnrolledUser = () => {
        const { currentUser } = this.props;
        if (currentUser.id) {
            const { enrolledUser } = this.state;
            this.setState({ enrolledUser: !enrolledUser });
        } else {
            const msg = 'Please login to enroll yourself.';
            alert(msg); // eslint-disable-line no-alert
        }
    }

    render() {
        let currBreadcrumbs;
        let pageName;
        let pageFullName;
        if (this.state.slug) {
            pageName = 'Course Details';
            pageFullName = (this.state.course && this.state.course.title) ? this.state.course.title : 'Course Details';
            currBreadcrumbs = [
                {
                    pageName: 'Courses',
                    pageUrl: '/courses',
                },
                {
                    pageName: (this.state.course) ? this.state.course.title : 'Course Details',
                    pageUrl: '#',
                },
            ];
        } else if (this.state.categorySlug) {
            pageFullName = (this.state.catName) ? this.state.catName : 'Our Courses';
            pageName = 'Courses';
            currBreadcrumbs = [
                {
                    pageName: 'Courses',
                    pageUrl: '/courses',
                },
                {
                    pageName: (this.state.catName) ? this.state.catName : this.state.categorySlug,
                    pageUrl: '#',
                },
            ];
        } else {
            pageName = 'Courses';
            pageFullName = 'Our Courses';
            currBreadcrumbs = [
                {
                    pageName: 'Courses',
                    pageUrl: '#',
                },
            ];
        }
        return (
            <div className="main">
                <Breadcrumbs
                    multiBreadcrumbs = {currBreadcrumbs}
                    pageName = {pageName}
                    pageFullName = { pageFullName }
                />
                <section id="contact-page" className="pt-90 pb-120 gray-bg">
                    <div className="container">
                        {(this.state.slug) ? (
                            <div className="row">
                                <CourseDetails
                                    course = {this.state.course}
                                    enrolledUser = {this.state.enrolledUser}
                                    loggedinUser = {this.props.currentUser}
                                    onSetCourseReview = {this.props.onSetCourseReview}
                                    onSetEnrollRequest = {this.props.onSetEnrollRequest}
                                    reviews = {this.state.reviews}
                                    toggleEnrolledUser = {this.toggleEnrolledUser}
                                />
                                <CourseDetailsLeftSidebar
                                    categories = {this.state.categories}
                                    course = {this.state.course}
                                    loggedinUser = {this.props.currentUser}
                                    toggleEnrolledUser = {this.toggleEnrolledUser}
                                />
                            </div>
                        ) : (
                            <div className="row">
                                <div className="col-lg-9">
                                    <CourseList
                                        courses = {this.state.courses}
                                        coursesPage = {this.state.coursesPage}
                                        handlePageChange = {this.handlePageChange}
                                        handleSearch = {this.handleSearch}
                                        limit = {this.state.limit}
                                        loggedinUser = {this.props.currentUser}
                                        onSetToFavourite = {this.props.onSetToFavourite}
                                        totalRecords = {this.state.totalRecords}
                                    />
                                </div>
                                <div className="col-lg-3">
                                    <AllCategoriesSidebar
                                        categories = {this.state.categories}
                                        categorySlug = {this.state.categorySlug}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        );
    }
}

Course.propTypes = {
    currentUser: PropTypes.object.isRequired,
    onSetAllCategories: PropTypes.func.isRequired,
    onSetCourseDetails: PropTypes.func.isRequired,
    onSetCourseList: PropTypes.func.isRequired,
    onSetCourseReview: PropTypes.func.isRequired,
    onSetCourseReviewList: PropTypes.func.isRequired,
    onSetEnrollRequest: PropTypes.func.isRequired,
    onSetToFavourite: PropTypes.func.isRequired,
    slug: PropTypes.string.isRequired,
};
