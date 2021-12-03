import React from 'react';
import Breadcrumbs from './header/breadcrumbs';
import PageNotFoundImg from './../../assets/images/all-icon/page-not-found.png';

export default class PageNotFound extends React.Component {
    render() {
        return (
            <div className="main">
                <Breadcrumbs pageName = "404" pageFullName = "Page not found" />
                <section id="contact-page" className="pt-90 pb-120">
                    <div className="container">
                        <div className="row text-center">
                            <img src = {PageNotFoundImg} alt = "oops" style = {{ margin: 'auto', clear: 'both' }} />

                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
