import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { imageExists } from './../../helpers/';
import defaultBlogPic from './../../../assets/images/all-icon/default-blog.png';

const config = require('./../../../config.js');

const { imageUrl } = config;
export default class BlogList extends React.Component {
    render() {
        const {
            activePage,
            blogs,
            limit,
            totalRecords,
        } = this.props;
        const totalPage = Math.ceil(totalRecords / limit);
        return (
            <div className="bloglist">
                {(this.props.pageType) ? (
                    <p><br /></p>
                ) : null}
                {(blogs.length > 0) ? (
                    <div className="blog-list-inner">
                        {blogs.map((blog, index) => (
                            <div className="singel-blog mt-30" key ={`blog-list-${blog.blog_id}-${index}`}>
                                <div className="blog-thum">

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
                                <div className="blog-cont">
                                    <Link to={`/blog/${blog.slug}`}><h3>{blog.title}</h3></Link>
                                    <ul>
                                        <li><span><i className="fa fa-calendar" style = {{ color: '#0062cc' }}></i> {moment(blog.added_at).format('DD MMM YYYY')}</span></li>
                                        <li><span><Link style = {{ color: '#000' }} to = {`/user/${blog.owner}`}> <i className="fa fa-user"></i> {`${blog.first_name} ${blog.last_name}`}</Link></span></li>
                                        <li onClick = {() => this.props.handlePageChange(1, blog.category)} style={{ cursor: 'pointer' }}><span><i className="fa fa-tags" style = {{ color: '#0062cc' }}></i> {blog.category_name}</span></li>
                                        <li><span><i className="fa fa-eye" aria-hidden="true"></i> {blog.no_of_views}</span></li>
                                    </ul>
                                </div>
                            </div>
                        ))}

                        {(totalPage > 1) ? (

                            <div className="col-md-12">
                                <div className="test">
                                    <nav className="courses-pagination mt-50">
                                        <ul className="pagination justify-content-center text-center">
                                            {(activePage !== 1) ? (
                                                <li className="page-item">
                                                    <button aria-label="Previous" onClick = {() => this.props.handlePageChange(activePage - 1)}>
                                                        <i className="fa fa-angle-left"></i>
                                                    </button>
                                                </li>
                                            ) : null}
                                            {Array.apply(0, Array(totalPage)).map((x, i) => <li className="page-item" key = {`event-page${i}`}><button className={(activePage === i + 1) ? 'active' : ''} onClick = {() => this.props.handlePageChange(i + 1)}>{i + 1}</button></li>)}
                                            {(activePage !== totalPage) ? (
                                                <li className="page-item">
                                                    <button aria-label="Next" onClick = {() => this.props.handlePageChange(activePage + 1)}>
                                                        <i className="fa fa-angle-right"></i>
                                                    </button>
                                                </li>
                                            ) : null}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        ) : null}

                    </div>
                ) : (
                    <p className="text-left text-danger"> No blogs Found!!!</p>
                )}


            </div>
        );
    }
}

BlogList.propTypes = {
    activePage: PropTypes.number.isRequired,
    blogs: PropTypes.array.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    limit: PropTypes.number.isRequired,
    totalRecords: PropTypes.number.isRequired,
};
