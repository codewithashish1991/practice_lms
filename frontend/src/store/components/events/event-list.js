import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { imageExists } from './../../helpers/';
import defaultEventPic from './../../../assets/images/all-icon/default-events.jpeg';

const config = require('./../../../config.js');

const { imageUrl } = config;

export default class EventList extends React.Component {
    render() {
        const {
            activePage,
            events,
            limit,
            totalRecords,
        } = this.props;
        const totalPage = Math.ceil(totalRecords / limit);
        const today = new Date();
        return (
            <div className="row">
                {(events.length > 0) ? (
                    <>{events.map((event, index) => (
                        <div className={(this.props.pageType) ? 'col-lg-12' : 'col-lg-6'} key ={`event-list-${event.event_id}-${index}`}>
                            <div className="singel-event-list mt-30">
                                <div className="event-thum">
                                    <img
                                        src={
                                            (
                                                event.event_picture
                                            &&
                                            imageExists(imageUrl + event.event_picture)
                                            ) ?
                                                imageUrl + event.event_picture :
                                                defaultEventPic}
                                        alt={(event.title.length > 10) ? `${event.title.substring(0, 10)}...` : event.title}
                                    />
                                </div>
                                <div className="event-cont">
                                    <span><i className={(new Date(event.event_date) < today) ? 'fa fa-calendar-check-o' : 'fa fa-calendar' }></i>{moment(event.event_date).format('DD MMMM YYYY')}</span>
                                    <Link to={`/event/${event.slug}`}><h4>{(event.title.length > 50) ? `${event.title.substring(0, 50)}...` : event.title}</h4></Link>
                                    <span><i className="fa fa-clock-o"></i> {moment(event.start_at, 'HH:mm:ss').format('hh:mm A')} - {moment(event.end_at, 'HH:mm:ss').format('hh:mm A')}</span>
                                    <span><i className="fa fa-map-marker"></i> {event.venue}</span>
                                    <span><Link style = {{ color: '#8a8a8a' }} to = {`/user/${event.owner}`}> <i className="fa fa-user"></i> {`${event.first_name} ${event.last_name}`}</Link></span>
                                    {(event.booked_seat > 0) ? (
                                        <span> <i className="fa fa-users" title="Booked Seat"></i> {event.booked_seat}</span>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ))}'                   '{(totalPage > 1) ? (

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
                                        {Array.apply(0, Array(totalPage)).map((x, i) => <li className="page-item" key = {`event-page${i}`}><button className={(activePage === i + 1) ? 'active' : ''} onClick = {() => this.props.handlePageChange(i + 1)}>{i + 1}</button></li>)}
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
                    ) : null}</>
                ) : (
                    <p className="text-left text-danger"> No {this.props.pageName} Found!!!</p>
                )}
            </div>
        );
    }
}

EventList.propTypes = {
    activePage: PropTypes.number.isRequired,
    events: PropTypes.array.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    limit: PropTypes.number.isRequired,
    pageName: PropTypes.string.isRequired,
    totalRecords: PropTypes.number.isRequired,
};
