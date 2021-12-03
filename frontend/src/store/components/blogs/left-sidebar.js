import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { imageExists } from './../../helpers/';
import defaultBlogPic from './../../../assets/images/all-icon/default-blog.png';

const config = require('./../../../config.js');

const { imageUrl } = config;

export default class LeftBlogSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_text: (props.search_text) ? props.search_text : '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            search_text: event.target.value,
        });
    }

    handleSearch = () => {
        const search = this.state.search_text;
        this.props.handleSearch(search);
    }

    render() {
        const { categories, relatedBlogs } = this.props;
        return (
            <div className="saidbar">
                <div className="row">
                    <div className="col-lg-12 col-md-6">
                        <div className="saidbar-search mt-30">
                            <form action="#">
                                <input type="text" onChange = {this.handleChange} value = {this.state.search_text} placeholder="Search" />
                                <button type="button" onClick = {this.handleSearch} ><i className="fa fa-search"></i></button>
                            </form>
                        </div>
                        <div className="categories mt-30">
                            <h4>Categories</h4>
                            {(categories.length > 0) ? (
                                <ul>
                                    <li
                                        className = {(this.props.category_id === 0) ? 'blog_category_list active' : 'blog_category_list'}
                                        onClick = {() => this.props.handlePageChange(
                                            1, 0,
                                        )}
                                    >All</li>
                                    { categories.map(cat => (
                                        <li
                                            className = {(this.props.category_id === cat.category_id) ? 'blog_category_list active' : 'blog_category_list'}
                                            key = {`cat-list-${cat.category_id}`}
                                            onClick = {() => this.props.handlePageChange(
                                                1, cat.category_id,
                                            )}
                                        > {cat.title}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-left text-danger"> No categories Found!!!</p>
                            )}
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-6">
                        <div className="saidbar-post mt-30">
                            <h4> Popular Blogs</h4>
                            {(relatedBlogs.length > 0) ? (
                                <ul>
                                    {relatedBlogs.map((blog, index) => (
                                        <li key ={`blog-list-${blog.blog_id}-${index}`}>
                                            <Link to={`/blog/${blog.slug}`}>
                                                <div className="singel-post">
                                                    <div className="thum">
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
                                                            width = "80"
                                                        />
                                                    </div>
                                                    <div className="cont">
                                                        <h6>{(blog.title.length > 20) ? `${blog.title.substring(0, 20)}...` : blog.title}</h6>
                                                        <span>{moment(blog.added_at).format('DD MMM YYYY')}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-left text-danger"> No blogs Found!!!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LeftBlogSidebar.propTypes = {
    categories: PropTypes.array.isRequired,
    category_id: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    relatedBlogs: PropTypes.array.isRequired,
    search_text: PropTypes.string.isRequired,
};
