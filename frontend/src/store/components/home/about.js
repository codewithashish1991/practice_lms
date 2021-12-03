import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import aboutImg from './../../../assets/images/about/bg-1.png';

export default class About extends React.Component {
    getBlocks = (varName) => {
        const { blocks } = this.props;
        if (blocks) {
            const content = blocks.filter(block => block.var_name === varName);
            if (content[0]) {
                return content[0].description;
            }
        }
        return '';
    }

    render() {
        const { events } = this.props;
        return (
            <section id="about-part" className="pt-65">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="section-title mt-50">
                                <h5>About us</h5>
                            </div>
                            {(this.getBlocks('home_about_us_block')) ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: this.getBlocks('home_about_us_block'),
                                    }}>
                                </div>

                            ) : ''}
                            <Link className="main-btn mt-55" to="/about_us">Learn More</Link>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <div className="about-event mt-50">
                                <div className="event-title">
                                    <h3>Upcoming events</h3>
                                </div>
                                {(events.length > 0) ? (
                                    <ul>
                                        {events.map((event, index) => (
                                            <li key ={`event-list-${event.event_id}-${index}`}>
                                                <div className="singel-event">
                                                    <span><i className="fa fa-calendar"></i>{moment(event.event_date).format('DD MMMM YYYY')}</span>
                                                    <Link to={`/event/${event.slug}`}><h4>{(event.title.length > 50) ? `${event.title.substring(0, 50)}...` : event.title}</h4></Link>
                                                    <span><i className="fa fa-clock-o"></i> {moment(event.start_at, 'HH:mm:ss').format('hh:mm A')} - {moment(event.end_at, 'HH:mm:ss').format('hh:mm A')}</span>
                                                    <span><i className="fa fa-map-marker"></i> {event.venue}, {event.city}</span>
                                                    <span><Link style = {{ color: '#8a8a8a' }} to = {`/user/${event.owner}`}> <i className="fa fa-user"></i> {`${event.first_name} ${event.last_name}`}</Link></span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-left text-danger"> No Upcoming events Found!!!</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about-bg">
                    <img src={aboutImg} alt="About" />
                </div>
            </section>
        );
    }
}

About.propTypes = {
    events: PropTypes.array.isRequired,
    blocks: PropTypes.array.isRequired,
};
