import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';

import { imageExists } from './../../helpers/';
import defaultBlogPic from './../../../assets/images/all-icon/default-blog.png';

const config = require('./../../../config.js');

const { imageUrl } = config;

export default class BlogGridList extends React.Component {
    render() {
        const { blogs } = this.props;
        return (
            <div className="col-lg-6">
                {blogs.map((blog, index) => (
                    <div className="singel-news news-list" key ={`blog-list-${blog.blog_id}-${index}`}>
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="news-thum mt-30">
                                    <img
                                        src={
                                            (
                                                blog.image
                                            &&
                                            imageExists(imageUrl + blog.image)
                                            ) ?
                                                imageUrl + blog.image :
                                                defaultBlogPic}
                                        alt={(blog.title.length > 10) ? `${blog.title.substring(0, 10)}...` : blog.title}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <div className="news-cont mt-30">
                                    <ul>
                                        <li><span><i className="fa fa-calendar" style = {{ color: '#0062cc' }}></i> {moment(blog.added_at).format('DD MMM YYYY')}</span></li>
                                        <li><span><Link style = {{ color: '#000' }} to = {`/user/${blog.owner}`}> <i className="fa fa-user"></i> {`${blog.first_name} ${blog.last_name}`}</Link></span></li>
                                    </ul>
                                    <Link to={`/blog/${blog.slug}`}><h3>{(blog.title.length > 20) ? `${blog.title.substring(0, 20)}...` : blog.title}</h3></Link>
                                    <p>{
                                        (
                                            blog.description
                                            && blog.description.replace(/(<([^>]+)>)/gi, '').length > 100
                                        ) ? `${blog.description.replace(/(<([^>]+)>)/gi, '').substring(0, 100)}...` :
                                            blog.description.replace(/(<([^>]+)>)/gi, '')
                                    }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

BlogGridList.propTypes = {
    blogs: PropTypes.array.isRequired,
};
