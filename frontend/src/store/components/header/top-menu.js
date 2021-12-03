import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class TopMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: props.categories,
        };
    }

    componentDidUpdate() {
        if (this.state.categories !== this.props.categories) {
            this.setState({ categories: this.props.categories });
        }
    }

    render() {
        const { pages } = this.props;
        return (
            <div className="navigation">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-md-10 col-sm-9 col-8">
                            <nav className="navbar navbar-expand-lg">
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>

                                <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <Link className="active" to="/">Home</Link>
                                        </li>

                                        {(pages.length > 0) ? (
                                            <li className="nav-item">
                                                <Link to="/" onClick={ event => event.preventDefault() }>Our Pages</Link>
                                                <ul className="sub-menu">
                                                    {pages.map((page, index) => (

                                                        <li key = {page.content_id + index}>
                                                            <Link to={page.url}>{page.title}</Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ) : null}
                                        {(this.state.categories.length > 0) ? (
                                            <li className="nav-item">
                                                <Link to="/" onClick={ event => event.preventDefault() }>Categories</Link>
                                                <ul className="sub-menu">
                                                    {this.state.categories.map((cat, index) => (

                                                        <li key = {cat.category_id + index}><Link to={`/courses/${cat.slug}`}>{cat.title}</Link></li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ) : null }
                                        <li className="nav-item">
                                            <Link to="/courses">Courses</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/our-team">Our team</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/" onClick={ event => event.preventDefault() }>Events</Link>
                                            <ul className="sub-menu">
                                                <li><Link to="/events?type=all">All Events</Link></li>
                                                <li><Link to="/events?type=myevents">My Events</Link></li>
                                                <li><Link to="/events?type=past">Past Events</Link></li>
                                                <li><Link to="/events?type=upcomming">Upcomming Events</Link></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/blogs">Blogs</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/join-us">Join Us</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/contact">Contact</Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TopMenu.propTypes = {
    categories: PropTypes.array.isRequired,
    pages: PropTypes.array.isRequired,
};
