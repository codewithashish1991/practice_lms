import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LogoImg from './../../../assets/images/all-icon/logo.png';

export default class FooterComponent extends React.Component {
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
        return (
            <div className="footer-top pt-40 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-about mt-40">
                                <div className="logo">
                                    <Link to="/"><img src={LogoImg} alt="Logo" /></Link>
                                </div>
                                {(this.getBlocks('footer_about_us')) ? (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: this.getBlocks('footer_about_us'),
                                        }}>
                                    </div>

                                ) : ''}

                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="footer-link support mt-40">
                                <div className="footer-title pb-25">
                                    <h6>Categories</h6>
                                </div>

                                <ul>
                                    {(this.state.categories.length > 0) ? (
                                        <li className="nav-item">
                                            <ul className="sub-menu">
                                                {this.state.categories.map((cat, index) => (

                                                    <li key = {cat.category_id + index}><Link to={`/courses/${cat.slug}`}> <i className="fa fa-angle-right"></i>{cat.title}</Link></li>
                                                ))}
                                            </ul>
                                        </li>
                                    ) : null }
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-6 col-sm-6">
                            <div className="footer-link mt-40">
                                <div className="footer-title pb-25">
                                    <h6>Sitemap</h6>
                                </div>
                                <ul>
                                    <li><Link to ="/"><i className="fa fa-angle-right"></i>Home</Link></li>
                                    <li><Link to ="/courses"><i className="fa fa-angle-right"></i>Courses</Link></li>
                                    <li><Link to ="/our-team"><i className="fa fa-angle-right"></i>Our Team</Link></li>
                                    <li><Link to ="/events?type=all"><i className="fa fa-angle-right"></i>All Events</Link></li>
                                    <li><Link to="/events?type=past"> <i className="fa fa-angle-right"></i> Past Events</Link></li>
                                    <li><Link to="/events?type=upcomming"> <i className="fa fa-angle-right"></i> Upcomming Events</Link></li>
                                    <li><Link to ="/join-us"><i className="fa fa-angle-right"></i>Join Us</Link></li>
                                    <li><Link to ="/contact"><i className="fa fa-angle-right"></i>Contact</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="footer-address mt-40">
                                <div className="footer-title pb-25">
                                    <h6>Contact Us</h6>
                                </div>
                                <ul>
                                    <li>
                                        <div className="icon">
                                            <i className="fa fa-home"></i>
                                        </div>
                                        {(this.getBlocks('company_full_address')) ? (
                                            <div
                                                className="cont"
                                                dangerouslySetInnerHTML={{
                                                    __html: this.getBlocks('company_full_address'),
                                                }}>
                                            </div>
                                        ) : ''}
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="fa fa-phone"></i>
                                        </div>
                                        <div className="cont">
                                            {(this.getBlocks('company_contact_number')) ? (
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: this.getBlocks('company_contact_number'),
                                                    }}>
                                                </p>

                                            ) : ''}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="fa fa-envelope-o"></i>
                                        </div>
                                        <div className="cont">
                                            {(this.getBlocks('company_website')) ? (
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: this.getBlocks('company_website'),
                                                    }}>
                                                </p>

                                            ) : ''}
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

FooterComponent.propTypes = {
    categories: PropTypes.array.isRequired,
};
