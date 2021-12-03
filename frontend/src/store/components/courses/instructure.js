import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { imageExists } from './../../helpers/';
import defaultProfilePic from './../../../assets/images/all-icon/profile.jpeg';

const config = require('./../../../config.js');

const { imageUrl } = config;

export default class Instructor extends React.Component {
    render() {
        const { course } = this.props;
        const role = course.user_roles;
        return (
            <div className="instructor-cont">
                <div className="instructor-author">
                    <div className="author-thum">
                        <Link to={`/user/${course.owner}`}>
                            <img src={(course.profile_image && imageExists(`${imageUrl}/media/${course.profile_image}`)) ? `${imageUrl}/media/${course.profile_image}` : defaultProfilePic} alt="Instructor" width="50" />
                        </Link>
                    </div>
                    <div className="author-name">
                        <Link to={`/user/${course.owner}`}><h5>{`${course.first_name} ${course.last_name}`}</h5></Link>
                        {role && role.map((roleName, index) => (
                            <span key = {`role-${index}`}>{roleName} {(index + 1 === role.length) ? '' : ','} &nbsp; </span>
                        ))}
                        <ul className="social">
                            {(course.social_links && course.social_links.fb_link) ? (
                                <li><a href={course.social_links.fb_link} target="_blank" rel='noopener noreferrer'><i className="fa fa-facebook-f"></i></a></li>
                            ) : null}
                            {(course.social_links && course.social_links.tw_link) ? (
                                <li><a href={course.social_links.tw_link} target="_blank" rel='noopener noreferrer'><i className="fa fa-twitter"></i></a></li>
                            ) : null}
                            {(course.social_links && course.social_links.gplus_link) ? (
                                <li><a href={course.social_links.gplus_link} target="_blank" rel='noopener noreferrer'><i className="fa fa-google-plus"></i></a></li>
                            ) : null}
                            {(course.social_links && course.social_links.linkdin_link) ? (
                                <li><a href={course.social_links.linkdin_link} target="_blank" rel='noopener noreferrer'><i className="fa fa-linkedin"></i></a></li>
                            ) : null}
                        </ul>
                    </div>
                </div>
                <div className="instructor-description pt-25">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: course.profile_desc,
                        }}></div>
                </div>
            </div>
        );
    }
}

Instructor.propTypes = {
    course: PropTypes.object.isRequired,
};
