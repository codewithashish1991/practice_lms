import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from './../header/breadcrumbs';
import JoinUs from './join-us';

export default class JoinWithUs extends React.Component {
    render() {
        return (
            <div className="main">
                <Breadcrumbs pageName = "Join Us" pageFullName = "Join Us Now" />
                <section id="contact-page" className="pt-90 pb-120 gray-bg">
                    <div className="container">
                        <div className="row">
                            <JoinUs onSetJoinUs = {this.props.onSetJoinUs} />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

JoinWithUs.propTypes = {
    onSetJoinUs: PropTypes.func.isRequired,
};
