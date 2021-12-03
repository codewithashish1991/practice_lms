import React from 'react';
import PropTypes from 'prop-types';
import ChangePassword from './change-password';
import { imageExists } from './../../helpers/';
import defaultProfilePic from './../../../assets/images/all-icon/profile.jpeg';

const config = require('./../../../config.js');

const { imageUrl } = config;

export default class LeftSidebar extends React.Component {
    render() {
        const profile = this.props.account;
        const { currentUser } = this.props;
        let profilePicture = defaultProfilePic;
        if (profile.profile_img && imageExists(imageUrl + profile.profile_img)) {
            profilePicture = imageUrl + profile.profile_img;
        }
        const role = profile.groups_names;
        return (
            <div className="col-lg-4 col-md-8">
                <div className="teachers-left mt-50">
                    <div className="hero">
                        <img src={profilePicture} alt="UserPicture" />
                    </div>
                    <div className="name">
                        <h6>{profile.first_name} {profile.last_name}</h6>
                        {role && role.map((roleName, index) => (
                            <span key = {`role-${index}`}>{roleName} {(index + 1 === role.length) ? '' : ','} &nbsp; </span>
                        ))}
                    </div>
                    {(role && !role.includes('Student')) ? (
                        <div className = "singel-reviews">
                            {Array.apply(0, Array(5)).map((x, i) => <span key = {`star-${i}-${profile.users_id}`}><i className= {(profile.user_rating && Math.round(profile.user_rating.rating__avg) > i) ? 'fa fa-star' : 'fa fa-star-o'}></i>{x}</span>)}
                            <span className="rating">( {profile.user_rating_count} Reviews)</span>
                        </div>
                    ) : null}
                    <div className="social">
                        <ul>
                            {(profile.fb_link) ? (
                                <li><a href={profile.fb_link} target="_blank" rel='noopener noreferrer' ><i className="fa fa-facebook-square"></i></a></li>
                            ) : null }
                            {(profile.tw_link) ? (
                                <li><a href={profile.tw_link} target="_blank" rel='noopener noreferrer' ><i className="fa fa-twitter-square"></i></a></li>
                            ) : null }
                            {(profile.gplus_link) ? (
                                <li><a href={profile.gplus_link} target="_blank" rel='noopener noreferrer' ><i className="fa fa-google-plus-square"></i></a></li>
                            ) : null }

                            {(profile.linkdin_link) ? (
                                <li><a href={profile.linkdin_link} target="_blank" rel='noopener noreferrer' ><i className="fa fa-linkedin-square"></i></a></li>
                            ) : null }
                        </ul>
                    </div>
                    <div className="description">
                        <p>{profile.short_description}</p>
                    </div>
                    <div className="text-center">
                        <br />
                        {(currentUser.id === profile.users_id) ? (
                            <div>
                                {(profile.is_staff) ? (
                                    <p class="mb-10"><a className="btn btn-primary" href = {`${imageUrl}/myadmin`} target="_blank" rel="noopener noreferrer">Staff Admin Pannel</a><br /></p>
                                ) : null}
                                <button className="btn btn-primary" onClick={this.props.toggleProfileUpdate}>Edit Profile</button> &nbsp;&nbsp;
                                <button className="btn btn-primary" data-toggle="modal" data-target="#changePassword">Change Password</button>
                            </div>
                        ) : null}
                    </div>
                    <div className="modal fade" id="changePassword" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <ChangePassword onUpdatePassword={this.props.onUpdatePassword} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LeftSidebar.propTypes = {
    account: PropTypes.object.isRequired,
    onUpdatePassword: PropTypes.func.isRequired,
    toggleProfileUpdate: PropTypes.func.isRequired,
};

