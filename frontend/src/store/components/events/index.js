import React from 'react';
import PropTypes from 'prop-types';

import Breadcrumbs from './../header/breadcrumbs';
import EventList from './event-list';
import EventDetails from './event-details';

export default class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {},
            eventPage: 1,
            events: [],
            eventType: (
                this.props.location.search
            ) ? this.props.location.search.split('=')[1] : 'all',
            limit: 8,
            slug: (this.props.slug) ? this.props.slug : '',
            totalRecords: 0,
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.state.slug) {
            this.getEventDetails(this.state.slug);
        } else {
            const data = {
                limit: this.state.limit,
                page: this.state.eventPage,
                type: this.state.eventType,
            };
            this.getEventList(data);
        }
    }

    handlePageChange = (pageNo) => {
        const data = {
            limit: this.state.limit,
            page: pageNo,
            type: this.state.eventType,
            user_id: (this.props.currentUser.id) ? parseInt(this.props.currentUser.id, 10) : 0,
        };
        this.getEventList(data);
        this.setState({ eventPage: pageNo });
    }

    getEventList(data) {
        const this1 = this;
        const result = this.props.onSetEventList(data);
        result.then((res) => {
            if (res.data && res.data.status === 'success') {
                const { records } = res.data;
                const totalRecords = res.data.total_records;
                this1.setState({
                    events: records,
                    totalRecords,
                });
            }
        });
    }

    getEventDetails = (slug) => {
        const this1 = this;
        const result = this.props.onSetEventDetails(slug);
        result.then((res) => {
            if (res.data && res.data.status === 'success') {
                const { records } = res.data;
                this1.setState({ event: records });
            }
        });
    }

    componentDidUpdate() {
        if (this.props.location.search && this.state.eventType !== this.props.location.search.split('=')[1]) {
            const eventType = this.props.location.search.split('=')[1];
            this.setState({ eventType });
            const data = {
                limit: this.state.limit,
                page: 1,
                type: eventType,
                user_id: (this.props.currentUser.id) ? parseInt(this.props.currentUser.id, 10) : 0,
            };
            this.getEventList(data);
        }
    }

    render() {
        let currBreadcrumbs;
        let pageName;
        let pageFullName;
        const { eventType } = this.state;
        if (this.state.slug) {
            pageName = 'Event Details';
            pageFullName = (this.state.event && this.state.event.title) ? this.state.event.title : 'Course Details';
            currBreadcrumbs = [
                {
                    pageName: 'Events',
                    pageUrl: '/events?type=all',
                },
                {
                    pageName: (this.state.event) ? this.state.event.title : 'Course Details',
                    pageUrl: '#',
                },
            ];
        } else {
            if (eventType === 'past') {
                pageName = 'Past Events';
                pageFullName = 'Past Events';
            } else if (eventType === 'upcomming') {
                pageName = 'Upcomming Events';
                pageFullName = 'Upcomming Events';
            } else if (eventType === 'myevents') {
                pageName = 'My Events';
                pageFullName = 'My Events';
            } else {
                pageName = 'Events';
                pageFullName = 'Our Events';
            }
            currBreadcrumbs = [
                {
                    pageName,
                    pageUrl: '#',
                },
            ];
        }
        let showEvent = true;
        if (
            this.state.eventType === 'myevents' &&
            !this.props.currentUser.id
        ) {
            showEvent = false;
        }
        return (
            <div className="main">
                <Breadcrumbs
                    multiBreadcrumbs = {currBreadcrumbs}
                    pageName = {pageName}
                    pageFullName = { pageFullName }
                />
                <section id="event-page" className="pt-90 pb-120 gray-bg">
                    <div className="container">
                        {(this.state.slug) ? (
                            <EventDetails
                                currentUser={this.props.currentUser}
                                event={this.state.event}
                                onSetEventRegistration={this.props.onSetEventRegistration}
                            />
                        ) : (
                        <>{(showEvent) ? (
                            <EventList
                                activePage = {this.state.eventPage}
                                currentUser={this.props.currentUser}
                                events = {this.state.events}
                                handlePageChange = {this.handlePageChange}
                                limit = {this.state.limit}
                                pageName = {pageName}
                                totalRecords = {this.state.totalRecords}
                            />
                        ) : (
                            <p className="text-danger">Please login to see my events page.</p>
                        )}</>
                        )}
                    </div>
                </section>
            </div>
        );
    }
}

Events.propTypes = {
    currentUser: PropTypes.object.isRequired,
    onSetEventDetails: PropTypes.func.isRequired,
    onSetEventList: PropTypes.func.isRequired,
    slug: PropTypes.string,
};
