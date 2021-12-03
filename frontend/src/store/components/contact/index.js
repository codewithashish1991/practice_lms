import React from 'react';
import Breadcrumbs from './../header/breadcrumbs';
import KeetInTouch from './contact';
import Address from './address';

export default class ContactUs extends React.Component {
    render() {
        return (
            <div className="main">
                <Breadcrumbs pageName = "Contact" pageFullName = "Contact Us" />
                <section id="contact-page" className="pt-90 pb-120 gray-bg">
                    <div className="container">
                        <div className="row">
                            <KeetInTouch onSetContact = {this.props.onSetContact} />
                            <Address blocks = {this.props.blocks} />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
