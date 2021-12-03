import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { imageExists } from './../../helpers/';
import defaultEventPic from './../../../assets/images/all-icon/default-events.jpeg';
import eventFinished from './../../../assets/images/all-icon/checked.png';
import countDownPic from './../../../assets/images/event/singel-event/coundown.jpg';
import Model from './../model/';

const config = require('./../../../config.js');

const { imageUrl } = config;

export default class EventDetails extends React.Component {
    render() {
        const { event } = this.props;
        const eventDate = (event.event_date) ? event.event_date : '';
        const startDate = (event.start_at) ? event.start_at : '';
        let custDate = '';
        if (eventDate) {
            custDate = `${eventDate.replace(/-/g, '/')} ${startDate}`;
        }
        let canBook = true;
        const d1 = new Date();
        const d2 = new Date(event.event_date);
        if (d2 < d1) {
            canBook = false;
        }
        return (
            <div className="events-area">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="events-left">
                            <h3>{event.title} </h3>
                            <span><i className={(d2 < d1) ? 'fa fa-calendar-check-o' : 'fa fa-calendar' }></i>{moment(event.event_date).format('DD MMMM YYYY')}</span>
                            <span><i className="fa fa-clock-o"></i> {moment(event.start_at, 'HH:mm:ss').format('hh:mm A')} - {moment(event.end_at, 'HH:mm:ss').format('hh:mm A')}</span>
                            <span><i className="fa fa-map-marker"></i> {event.venue}</span>
                            <span><Link style = {{ color: '#8a8a8a' }} to = {`/user/${event.owner}`}> <i className="fa fa-user"></i> {`${event.first_name} ${event.last_name}`}</Link></span>
                            {(event.booked_seat > 0) ? (
                                <span> <i className="fa fa-users" title="Booked Seat"></i> {event.booked_seat}</span>
                            ) : null}
                            <img
                                src={
                                    (
                                        event.event_picture
                                    &&
                                    imageExists(imageUrl + event.event_picture)
                                    ) ?
                                        imageUrl + event.event_picture :
                                        defaultEventPic}
                                alt={(event.title && event.title.length > 10) ? `${event.title.substring(0, 10)}...` : event.title}
                            />
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: event.description,
                                }}></div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="events-right">
                            {(canBook) ? (
                                <div className="events-coundwon bg_cover" data-overlay="8" style={{ backgroundImage: `url(${countDownPic})` }}>
                                    <div data-countdown={custDate}><div className="count-down-time"><div className="singel-count"><span className="number">00 :</span><span className="title">Days</span></div><div className="singel-count"><span className="number">00 :</span><span className="title">Hours</span></div><div className="singel-count"><span className="number">00 :</span><span className="title">Minuits</span></div><div className="singel-count"><span className="number">00</span><span className="title">Seconds</span></div></div></div>
                                    <div className="events-coundwon-btn pt-30">
                                        {(event.no_of_seats > 0) ? (
                                            <div>
                                                <button
                                                    className="main-btn"
                                                    onClick = {this.toggleSeatBooking}
                                                    data-toggle="modal"
                                                    data-target="#myModal"
                                                >
                                                Book Your Seat
                                                </button>
                                                <Model
                                                    contentType="book_myseat"
                                                    title={event.title}
                                                    user_id = {(
                                                        this.props.currentUser &&
                                                    this.props.currentUser.id
                                                    ) ? this.props.currentUser.id : 0 }
                                                    event_id = {event.event_id}
                                                    onEventRegistration={
                                                        this.props.onSetEventRegistration
                                                    }
                                                /></div>
                                        ) : (
                                            <span className="main-btn">All seat has been booked.</span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className='text-success'><img src={eventFinished} width = "20" title = "Event Completed" alt="Event Finished" /> Event Completed!!!</p>
                            ) }
                            <div className="events-address mt-30">
                                <ul>
                                    <li>
                                        <div className="singel-address">
                                            <div className="icon">
                                                <i className="fa fa-clock-o"></i>
                                            </div>
                                            <div className="cont">
                                                <h6>Start Time</h6>
                                                <span>{moment(event.start_at, 'HH:mm:ss').format('hh:mm A')}</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="singel-address">
                                            <div className="icon">
                                                <i className="fa fa-bell-slash"></i>
                                            </div>
                                            <div className="cont">
                                                <h6>Finish Time</h6>
                                                <span>{moment(event.end_at, 'HH:mm:ss').format('hh:mm A')}</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="singel-address">
                                            <div className="icon">
                                                <i className="fa fa-map"></i>
                                            </div>
                                            <div className="cont">
                                                <h6>Address</h6>
                                                <span>{`${event.venue},`}</span><br/>
                                                <span>{`${event.city}, ${event.state} ,`}</span><br/>
                                                <span>{event.country}</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EventDetails.propTypes = {
    event: PropTypes.object.isRequired,
};
