import React from 'react';
import PropTypes from 'prop-types';

import BlogDetails from './blog-details';
import BlogList from './blog-list';
import Breadcrumbs from './../header/breadcrumbs';
import LeftSidebar from './left-sidebar';

export default class Blogs extends React.Component {
    constructor(props) {
        super(props);
        const categoryId = new URLSearchParams(this.props.location.search).get('category');
        const searchText = new URLSearchParams(this.props.location.search).get('search_text');
        this.state = {
            blog: {},
            blogs: [],
            categories: [],
            category_id: (categoryId) ? parseInt(categoryId, 10) : 0,
            comments: [],
            comentCurrentPage: 1,
            limit: 5,
            moreComment: false,
            page: 1,
            related_blogs: [],
            search_text: (searchText) || '',
            slug: (this.props.slug) ? this.props.slug : '',
            totalComments: 0,
            totalRecords: 0,
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount(slug = '') {
        window.scrollTo(0, 0);
        const cslug = (slug) || this.state.slug;
        if (cslug) {
            this.getBlogDetails(cslug);
        } else {
            const data = {
                limit: this.state.limit,
                category_id: this.state.category_id,
                search_text: this.state.search_text,
                page: this.state.page,
            };
            this.getBlogList(data);
        }
        this.getPopularBlog();
        this.getCategoryList();
    }

    handlePageChange = (pageNo, categoryId = this.state.category_id) => {
        if (this.props.slug) {
            this.props.history.push(`/blogs?category=${categoryId}`);
        } else {
            window.scrollTo(0, 0);
            const data = {
                limit: this.state.limit,
                category_id: categoryId,
                search_text: this.state.search_text,
                page: pageNo,
            };
            this.getBlogList(data);
            this.setState({ page: pageNo, category_id: categoryId });
        }
    }

    getPopularBlog = () => {
        const data = {
            limit: 5,
            page: 1,
            most_viewed: true,
        };
        this.getBlogList(data, true);
    }

    handleSearch = (searchText, categoryId = this.state.category_id) => {
        if (this.props.slug) {
            this.props.history.push(`/blogs?search_text=${searchText}`);
        } else {
            window.scrollTo(0, 0);
            const data = {
                limit: this.state.limit,
                category_id: categoryId,
                search_text: searchText,
                page: 1,
            };
            this.getBlogList(data);
            this.setState({ page: 1, search_text: searchText });
        }
    }
    getBlogList(data, mostPopular = false) {
        const this1 = this;
        const result = this.props.onSetBlogList(data);
        result.then((res) => {
            if (res.data && res.data.status === 'success') {
                const { records } = res.data;
                const totalRecords = res.data.total_records;
                if (mostPopular) {
                    this1.setState({
                        related_blogs: records,
                    });
                } else {
                    this1.setState({
                        blogs: records,
                        totalRecords,
                    });
                }
            }
        });
    }

    getBlogDetails = (slug) => {
        const this1 = this;
        const result = this.props.onSetBlogDetails(slug);
        result.then((res) => {
            if (res.data && res.data.status === 'success') {
                const { records } = res.data;
                this1.setState({ blog: records });
            }
        });

        setTimeout(() => {
            const data = {
                blog_id: this1.state.blog.blog_id,
                limit: 5,
                page: this1.state.comentCurrentPage,
            };
            this.getComments(data);
        }, 2000);
    }

    getComments = (data) => {
        const this1 = this;
        const comments = this1.props.onSetBlogCommentList(data);
        comments.then((res) => {
            if (res.data && res.data.status === 'success') {
                const {
                    records,
                } = res.data;
                const totalRecords = res.data.total_records;
                let { moreComment } = false;

                if (records.length !== totalRecords) {
                    moreComment = true;
                }
                const oldComments = this1.state.comments;
                const newRecord = oldComments.concat(records);
                this1.setState({
                    comments: newRecord,
                    moreComment,
                    totalComments: totalRecords,
                });
            }
        });
    }

    loadMoreComments = () => {
        const {
            comentCurrentPage,
            totalComments,
        } = this.state;
        const newPage = parseInt(comentCurrentPage, 10) + 1;
        const totalPage = Math.ceil(totalComments / 5);
        if (newPage < (totalPage + 1)) {
            const data = {
                blog_id: this.state.blog.blog_id,
                limit: 5,
                page: newPage,
            };
            this.getComments(data);
            this.setState({ comentCurrentPage: newPage });
        } else {
            this.setState({ moreComment: false });
        }
    }

    getCategoryList = () => {
        const this1 = this;
        const data = { parent_id: 'all', cat_type: 'BLOG' };
        const categories = this.props.onSetAllCategories(data);
        categories.then((res) => {
            if (res.data && res.data.status === 'success') {
                const { records } = res.data;
                this1.setState({ categories: records });
            }
        });
    }

    componentDidUpdate(nextProps) {
        if (this.props.slug && this.props.slug !== this.state.slug) {
            const { slug } = nextProps;
            this.setState({ slug });
            this.componentDidMount(slug);
        }
    }

    getCatName = () => {
        const categoryId = this.state.category_id;
        const { categories } = this.state;
        const category = categories.filter(cat => cat.category_id === categoryId);
        return (category[0]) ? category[0].title : 'Blogs';
    }

    updateCommentList = (comment) => {
        const { comments } = this.state;
        comments.push(comment);
        this.setState({ comments });
    }

    render() {
        let currBreadcrumbs;
        let pageName;
        let pageFullName;
        if (this.state.slug) {
            pageName = 'Blog Details';
            pageFullName = (this.state.blog && this.state.blog.title) ? this.state.blog.title : 'Course Details';
            currBreadcrumbs = [
                {
                    pageName: 'Blogs',
                    pageUrl: '/blogs',
                },
                {
                    pageName: (this.state.blog) ? this.state.blog.title : 'Course Details',
                    pageUrl: '#',
                },
            ];
        } else {
            if (this.state.category_id > 0) {
                pageName = 'Blogs';
                pageFullName = (
                    this.state.categories
                ) ? this.getCatName() : 'Our Blogs';
            } else {
                pageName = 'Blogs';
                pageFullName = 'Our Blogs';
            }
            currBreadcrumbs = [
                {
                    pageName,
                    pageUrl: '#',
                },
            ];
        }

        return (
            <div className="main">
                <Breadcrumbs
                    multiBreadcrumbs = {currBreadcrumbs}
                    pageName = {pageName}
                    pageFullName = { pageFullName }
                />
                {(this.state.slug) ? (
                    <section id="blog-singel" className="pt-90 pb-120 gray-bg">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8">
                                    <BlogDetails
                                        blog = {this.state.blog}
                                        comments={this.state.comments}
                                        currentUser={this.props.currentUser}
                                        hasMoreComments = {this.state.moreComment}
                                        loadMoreComments = {this.loadMoreComments}
                                        onSetBlogComment={this.props.onSetBlogComment}
                                        totalComments = {this.state.totalComments}
                                        updateCommentList={this.updateCommentList}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <LeftSidebar
                                        categories = {this.state.categories}
                                        category_id = {this.state.category_id}
                                        search_text = {this.state.search_text}
                                        handlePageChange = {this.handlePageChange}
                                        handleSearch = {this.handleSearch}
                                        relatedBlogs = {this.state.related_blogs}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <section id="blog-page" className="pt-90 pb-120 gray-bg">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8">
                                    <BlogList
                                        activePage = {this.state.page}
                                        blogs = {this.state.blogs}
                                        handlePageChange = {this.handlePageChange}
                                        limit = {this.state.limit}
                                        totalRecords = {this.state.totalRecords}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <LeftSidebar
                                        categories = {this.state.categories}
                                        category_id = {this.state.category_id}
                                        search_text = {this.state.search_text}
                                        handlePageChange = {this.handlePageChange}
                                        handleSearch = {this.handleSearch}
                                        relatedBlogs = {this.state.related_blogs}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        );
    }
}

Blogs.propTypes = {
    currentUser: PropTypes.object.isRequired,
    onSetAllCategories: PropTypes.func.isRequired,
    onSetBlogComment: PropTypes.func.isRequired,
    onSetBlogCommentList: PropTypes.func.isRequired,
    onSetBlogDetails: PropTypes.func.isRequired,
    onSetBlogList: PropTypes.func.isRequired,
    slug: PropTypes.string,
};
