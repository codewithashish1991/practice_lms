import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Breadcrumbs from './../header/breadcrumbs';
import { imageExists } from './../../helpers/';
import defaultProfilePic from './../../../assets/images/all-icon/profile.jpeg';

const config = require('./../../../config.js');

const { imageUrl } = config;

export default class OurTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            limit: 8,
            teams: [],
            totalRecords: 0,
        };
    }

    componentDidMount() {
        const this1 = this;
        const data = {
            ourTeam: true,
        };
        const ourteam = this.props.onSetTeamList(data);
        ourteam.then((res) => {
            if (res.data && res.data.status === 'success') {
                const { records } = res.data;
                const totalRecords = res.data.total_records;
                this1.setState({
                    teams: records,
                    totalRecords,

                });
            }
        });
    }

    render() {
        const { teams } = this.state;
        return (
            <><Breadcrumbs
                pageName = 'Our Team'
                pageFullName = 'Our Team'
            />'           '<section id="teachers-page" className="pt-90 pb-120 gray-bg">
                <div className="container">
                    <div >
                        <div className="title">
                            <h2>Our Team</h2>
                        </div>

                        {(teams.length > 0) ? (
                            <div className="row">
                                {teams.map((user, index) => (
                                    <div className="col-lg-3 col-sm-6" key = {`team-list-${index}`}>
                                        <div className="singel-teachers mt-30 text-center">
                                            <div className="image">
                                                <img src={
                                                    (
                                                        user.profile_img &&
                                                        imageExists(`${imageUrl}${user.profile_img}`)
                                                    ) ? `${imageUrl}${user.profile_img}` : defaultProfilePic
                                                } alt="teacher" height="280" />
                                            </div>
                                            <div className="cont">
                                                <Link to={`/user/${user.users_id}`}><h6>{`${user.first_name} ${user.last_name}`}</h6></Link>
                                                { user.groups_names.map((roleName, roleIndex) => (
                                                    <span key = {`role-${roleIndex}`}>{roleName} {(roleIndex + 1 === user.groups_names.length) ? '' : ','} &nbsp; </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        ) : (
                            <p className="text-danger">No member found.</p>
                        )}
                    </div>
                </div>
            </section></>
        );
    }
}

OurTeam.propTypes = {
    onSetTeamList: PropTypes.func.isRequired,
};
