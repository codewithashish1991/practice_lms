import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { imageExists } from './../../helpers/';
import defaultBlogPic from './../../../assets/images/all-icon/default-blog.png';


import BlogGridList from './blog-grid-list';

const config = require('./../../../config.js');

const { imageUrl } = config;

export default class LatestNews extends React.Component {
    render() {
        const { blogs } = this.props;
        return (
            <section id="news-part" className="pt-115 pb-110">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="section-title pb-50">
                                <h5>Latest Blogs</h5>
                                <h2>From the blogs</h2>
                            </div>
                        </div>
                    </div>
                    {(blogs.length > 0) ? (
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="singel-news mt-30">
                                    <div className="news-thum pb-25">
                                        <img
                                            src={
                                                (
                                                    blogs[0] &&
                                                    blogs[0].image &&
                                                    imageExists(imageUrl + blogs[0].image)
                                                ) ?
                                                    imageUrl + blogs[0].image :
                                                    defaultBlogPic}
                                            alt={(blogs[0] && blogs[0].title.length > 10) ? `${blogs[0].title.substring(0, 10)}...` : 'blogs'}
                                        />
                                    </div>
                                    <div className="news-cont">
                                        <ul>
                                            <li><span><i className="fa fa-calendar" style = {{ color: '#0062cc' }}></i> {moment(blogs[0].added_at).format('DD MMM YYYY')}</span></li>
                                            <li><span><Link style = {{ color: '#000' }} to = {`/user/${blogs[0].owner}`}> <i className="fa fa-user"></i> {`${blogs[0].first_name} ${blogs[0].last_name}`}</Link></span></li>
                                        </ul>
                                        <Link to={`/blog/${blogs[0].slug}`}><h3>{blogs[0].title}</h3></Link>
                                        <p>{
                                            (
                                                blogs[0]
                                                && blogs[0].description
                                                && blogs[0].description.replace(/(<([^>]+)>)/gi, '').length > 230
                                            ) ? `${blogs[0].description.replace(/(<([^>]+)>)/gi, '').substring(0, 230)}...` :
                                                blogs[0].description.replace(/(<([^>]+)>)/gi, '')
                                        }</p>
                                    </div>
                                </div>
                            </div>
                            <BlogGridList blogs = {blogs.slice(1)} />
                        </div>
                    ) : (
                        <p className="text-left text-danger"> No blogs Found!!!</p>
                    )}
                </div>
            </section>
        );
    }
}

LatestNews.propTypes = {
    blogs: PropTypes.array.isRequired,
};
