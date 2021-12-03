import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BreadcrumbImg from './../../../assets/images/page-banner-6.jpg';

export default class Breadcrumbs extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (e, pageUrl) => {
        if (pageUrl === '#') {
            e.preventDefault();
        }
        return true;
    }

    render() {
        return (
            <section id="page-banner" className="pt-30 pb-30 bg_cover" data-overlay="8" style={{ backgroundImage: `url(${BreadcrumbImg})` }} >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="page-banner-cont">
                                <h2>{this.props.pageFullName}</h2>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                        {(!this.props.multiBreadcrumbs) ? (
                                            <li className="breadcrumb-item active" aria-current="page">{this.props.pageName}</li>
                                        ) : (
                                            <>{this.props.multiBreadcrumbs.map((bred, index) => (
                                                <li
                                                    key = {`breadcrumb-${index}`}
                                                    className={`breadcrumb-item ${(bred.pageUrl) ? '' : 'active'}`}
                                                    aria-current={(bred.pageUrl) ? '' : 'page'}
                                                >
                                                    <Link
                                                        to={bred.pageUrl}
                                                        onClick = {e => this.handleClick(
                                                            e, bred.pageUrl,
                                                        )}
                                                    >{bred.pageName}</Link>
                                                </li>
                                            ))}</>
                                        )}
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Breadcrumbs.propTypes = {
    multiBreadcrumbs: PropTypes.array,
    pageFullName: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
};

