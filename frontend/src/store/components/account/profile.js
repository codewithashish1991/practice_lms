import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from './../header/breadcrumbs';
import LeftSidebar from './left-sidebar';
import MyCourses from './my-courses';
import MyWishlist from './my-wishlist';
import StudentReview from './student-reviews';
import ProfileForm from './profile-update';
import EventList from './../events/event-list';
import BlogList from './../blogs/blog-list';

export default class MyAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            blogsPage: 1,
            courses: [],
            coursesPage: 1,
            eventPage: 1,
            events: [],
            limit: 4,
            profile: {},
            reviews: [],
            totalBlogsRecords: 0,
            totalEventsRecords: 0,
            totalRecords: 0,
            totalWishlistRecords: 0,
            updateProfile: false,
            userId: 0,
            wishlist: [],
            wishlistPage: 1,
        };
        this.handleBlogsPageChange = this.handleBlogsPageChange.bind(this);
        this.handleEventPageChange = this.handleEventPageChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleWlPageChange = this.handleWlPageChange.bind(this);
        this.showProfileForm = this.showProfileForm.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }

    updateProfile(data, delay) {
        const this1 = this;
        this.setState({ profile: data });
        if (delay === true) {
            setTimeout(() => {
                this1.setState({ updateProfile: false });
            }, 2000);
        } else {
            this.setState({ updateProfile: false });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.userInfo !== prevProps.userInfo) {
            this.props.history.push('/student-login');
        }
        if (this.props.userId && this.props.userId !== this.state.userId) {
            this.componentDidMount();
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const elmnt = document.getElementById('dashboard-tab');
        elmnt.click();

        if ((this.props.userInfo && this.props.userInfo.id) || this.props.userId) {
            const userId = (this.props.userId) ? this.props.userId : this.props.userInfo.id;
            this.getUserDetails(userId);
            this.getMyCourses(userId);
            this.getMyReviews(userId);
            this.getMyWishlist(userId);
            this.getMyEvents(userId);
            this.getBlogList(userId);
        }
    }

    getUserDetails(userId) {
        const this1 = this;
        const userDetails = this.props.getUserDetails(userId);

        userDetails.then((res) => {
            if (res.data && res.data.status === 'success') {
                const result = res.data.records;
                this1.setState({ profile: result, userId });
            } else {
                alert('No user found.'); // eslint-disable-line no-alert
                this1.props.history.push('/');
            }
        });
    }

    getBlogList = (userId, page = 1) => {
        const this1 = this;
        const data = {
            limit: this.state.limit,
            user_id: userId,
            page,
        };
        const result = this.props.onSetBlogList(data);
        result.then((res) => {
            if (res.data && res.data.status === 'success') {
                const { records } = res.data;
                const totalRecords = res.data.total_records;
                this1.setState({
                    blogs: records,
                    blogsPage: page,
                    totalBlogsRecords: totalRecords,
                });
            }
        });
    }

    getMyCourses = (userId, page = 1) => {
        const data = {
            user_id: userId,
            my_course: true,
            page,
            limit: this.state.limit,
        };
        const this1 = this;
        const mycourses = this.props.onSetCourseList(data);
        mycourses.then((res) => {
            if (res.data && res.data.status === 'success') {
                const { records } = res.data;
                const totalRecords = res.data.total_records;
                this1.setState({
                    courses: records,
                    coursesPage: page,
                    totalRecords,
                });
            }
        });
    }

    getMyEvents = (userId, page = 1) => {
        const this1 = this;
        const data = {
            limit: this.state.limit,
            type: 'all',
            page,
            ownerId: userId,
        };
        const result = this.props.onSetEventList(data);
        result.then((res) => {
            if (res.data && res.data.status === 'success') {
                const { records } = res.data;
                const totalEventsRecords = res.data.total_records;
                this1.setState({
                    eventPage: page,
                    events: records,
                    totalEventsRecords,
                });
            }
        });
    }

    getMyWishlist = (userId, page = 1) => {
        const data = {
            user_id: userId,
            wishlist: true,
            page,
            limit: this.state.limit,
        };
        const this1 = this;
        const wishlist = this.props.onSetWishList(data);
        wishlist.then((res) => {
            if (res.data && res.data.status === 'success') {
                const { records } = res.data;
                const totalRecords = res.data.total_records;
                this1.setState({
                    wishlist: records,
                    wishlistPage: page,
                    totalWishlistRecords: totalRecords,
                });
            }
        });
    }

    getMyReviews(userId) {
        const this1 = this;
        const reviewData = { users: userId };
        const reviews = this1.props.onSetUserReviewList(reviewData);
        reviews.then((res) => {
            if (res.data && res.data.status === 'success') {
                const { records } = res.data;
                this1.setState({ reviews: records });
            }
        });
    }

    showProfileForm() {
        this.setState({ updateProfile: true });
    }

    handlePageChange = (pageNo) => {
        const userId = (this.props.userId) ? this.props.userId : this.props.userInfo.id;
        this.getMyCourses(userId, pageNo);
    }

    handleWlPageChange = (pageNo) => {
        const userId = (this.props.userId) ? this.props.userId : this.props.userInfo.id;
        this.getMyWishlist(userId, pageNo);
    }

    handleBlogsPageChange = (pageNo) => {
        const userId = (this.props.userId) ? this.props.userId : this.props.userInfo.id;
        this.getBlogList(userId, pageNo);
    }

    handleEventPageChange = (pageNo) => {
        const userId = (this.props.userId) ? this.props.userId : this.props.userInfo.id;
        this.getMyEvents(userId, pageNo);
    }

    render() {
        const pdesc = this.state.profile.profile_description;
        let uname = (this.state.profile.username) ? this.state.profile.username : 'My Account';
        if (this.state.profile.first_name) {
            uname = `${this.state.profile.first_name}${this.state.profile.last_name}`;
        }
        return (
            <div className="main">
                <Breadcrumbs
                    pageName = {(this.props.userId) ?
                        uname :
                        'My Account'}
                    pageFullName = {(this.props.userId) ?
                        uname :
                        'My Account'}
                />
                <section id="teachers-singel" className="pt-70 pb-120 gray-bg">
                    <div className="container">
                        <div className="row justify-content-center">
                            <LeftSidebar
                                account = {this.state.profile}
                                currentUser = {this.props.currentUser}
                                onUpdatePassword = {this.props.onUpdatePassword}
                                toggleProfileUpdate = {this.showProfileForm}
                            />
                            <div className="col-lg-8">
                                {(this.state.updateProfile === true) ? (
                                    <div className="teachers-right mt-50">
                                        <div className="tab-content container">
                                            <ProfileForm
                                                account = {this.state.profile}
                                                onProfileUpdate = {this.props.onProfileUpdate}
                                                updateProfile = {this.updateProfile}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="teachers-right mt-50">
                                        <ul className="nav nav-justified" id="myTab" role="tablist">
                                            <li className="nav-item">
                                                <a className="active" id="dashboard-tab" data-toggle="tab" href="#dashboard" role="tab" aria-controls="dashboard" aria-selected="true">About Me</a>
                                            </li>
                                            <li className="nav-item">
                                                <a id="courses-tab" data-toggle="tab" href="#courses" role="tab" aria-controls="courses" aria-selected="false">
                                                    {
                                                        (
                                                            this.props.currentUser.id ===
                                                            this.state.profile.users_id
                                                        ) ? 'My Courses' :
                                                            `${this.state.profile.first_name}'s Courses`
                                                    }
                                                </a>
                                            </li>
                                            {(this.state.profile.groups_names && !this.state.profile.groups_names.includes('Student')) ? (
                                                <li className="nav-item">
                                                    <a id="reviews-tab" data-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false">Reviews</a>
                                                </li>
                                            ) : null}
                                            {
                                                (
                                                    this.props.currentUser.id ===
                                                    this.state.profile.users_id
                                                ) ? (
                                                        <li className="nav-item">
                                                            <a id="wishlist-tab" data-toggle="tab" href="#wishlist" role="tab" aria-controls="wishlist" aria-selected="false">Wishlist</a>
                                                        </li>
                                                    ) : null
                                            }

                                            {
                                                (
                                                    this.state.profile.groups_names &&
                                                    this.state.profile.groups_names.includes('Event Organiser')
                                                ) ? (
                                                        <li className="nav-item">
                                                            <a id="event-tab" data-toggle="tab" href="#event" role="tab" aria-controls="event" aria-selected="false">Events</a>
                                                        </li>
                                                    ) : null
                                            }

                                            {
                                                (
                                                    this.state.profile.groups_names &&
                                                    this.state.profile.groups_names.includes('Blogger')
                                                ) ? (
                                                        <li className="nav-item">
                                                            <a id="blog-tab" data-toggle="tab" href="#blog" role="tab" aria-controls="blog" aria-selected="false">Blogs</a>
                                                        </li>
                                                    ) : null
                                            }
                                        </ul>
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                                                <div className="dashboard-cont">
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: pdesc,
                                                        }}></div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="courses" role="tabpanel" aria-labelledby="courses-tab">
                                                <MyCourses
                                                    courses = {this.state.courses}
                                                    coursesPage = {this.state.coursesPage}
                                                    handlePageChange = {this.handlePageChange}
                                                    limit = {this.state.limit}
                                                    totalRecords = {this.state.totalRecords}
                                                />
                                            </div>
                                            <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                                                <StudentReview
                                                    currentUser = {this.props.currentUser}
                                                    onSetUserReview = {this.props.onSetUserReview}
                                                    profile = {this.state.profile}
                                                    reviews = {this.state.reviews}
                                                />
                                            </div>

                                            <div className="tab-pane fade" id="wishlist" role="tabpanel" aria-labelledby="wishlist-tab">
                                                <MyWishlist
                                                    wishlist = {this.state.wishlist}
                                                    wishlistPage = {this.state.wishlistPage}
                                                    handlePageChange = {this.handleWlPageChange}
                                                    limit = {this.state.limit}
                                                    totalRecords = {this.state.totalWishlistRecords}
                                                />
                                            </div>

                                            <div className="tab-pane fade" id="event" role="tabpanel" aria-labelledby="event-tab">
                                                <EventList
                                                    activePage = {this.state.eventPage}
                                                    currentUser={this.props.currentUser}
                                                    events={this.state.events}
                                                    handlePageChange = {this.handleEventPageChange}
                                                    limit = {this.state.limit}
                                                    pageName = "Events"
                                                    pageType = "full"
                                                    totalRecords = {this.state.totalEventsRecords}
                                                />
                                            </div>
                                            <div className="tab-pane fade" id="blog" role="tabpanel" aria-labelledby="blog-tab">
                                                <BlogList
                                                    activePage = {this.state.blogsPage }
                                                    blogs = {this.state.blogs}
                                                    handlePageChange = {this.handleBlogsPageChange}
                                                    limit = {this.state.limit}
                                                    pageType = "full"
                                                    totalRecords = {this.state.totalBlogsRecords }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

MyAccount.propTypes = {
    currentUser: PropTypes.object.isRequired,
    getUserDetails: PropTypes.func.isRequired,
    onProfileUpdate: PropTypes.func.isRequired,
    onSetBlogList: PropTypes.func.isRequired,
    onSetCourseList: PropTypes.func.isRequired,
    onSetEventList: PropTypes.func.isRequired,
    onSetUserReview: PropTypes.func.isRequired,
    onSetUserReviewList: PropTypes.func.isRequired,
    onSetWishList: PropTypes.func.isRequired,
    onUpdatePassword: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
};
