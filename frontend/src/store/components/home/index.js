import React from 'react';
import PropTypes from 'prop-types';
import About from './about';
import Banner from './banner';
import Categories from './categories';
import FeaturedCourses from './featured-courses';
import BlogList from './latest-blogs';
import Search from './search';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            courses: [],
            events: [],
            sliders: [],
        };
    }

    componentDidMount() {
        const data = {
            featured: true,
        };

        const eventData = {
            limit: 3,
            page: 1,
            type: 'upcomming',
        };

        const blogData = {
            limit: 4,
            most_viewed: true,
            page: 1,
        };
        const sliderId = this.getSliderId();

        this.getBlogList(blogData);
        this.getCourseList(data);
        this.getEventList(eventData);
        this.getSlider(sliderId);
    }

    getBlogList(data) {
        const this1 = this;
        const result = this.props.onSetBlogList(data);
        result.then((res) => {
            if (res.data && res.data.status === 'success') {
                const { records } = res.data;
                this1.setState({
                    blogs: records,
                });
            }
        });
    }

    getEventList(data) {
        const this1 = this;
        const result = this.props.onSetEventList(data);
        result.then((res) => {
            if (res.data && res.data.status === 'success') {
                const { records } = res.data;
                this1.setState({
                    events: records,
                });
            }
        });
    }

    getCourseList(data) {
        const this1 = this;
        const result = this.props.onSetCourseList(data);
        result.then((res) => {
            if (res.data && res.data.status === 'success') {
                const { records } = res.data;
                this1.setState({ courses: records });
            }
        });
    }

    getSliderId = () => {
        const { blocks } = this.props;
        if (blocks) {
            const content = blocks.filter(block => block.var_name === 'home_slider');
            if (content[0]) {
                return content[0].content_id;
            }
        }
        return '';
    }

    getSlider(contentId) {
        const this1 = this;
        const result = this.props.onSetSliders(contentId);
        result.then((res) => {
            if (res.data && res.data.status === 'success') {
                const { records } = res.data;
                this1.setState({ sliders: records });
            }
        });
    }


    render() {
        return (
            <div className="main">
                {(this.state.sliders.length > 0) ? (
                    <Banner sliders = {this.state.sliders} />
                ) : null}
                <Categories
                    onRegister = {this.props.onRegister}
                    categories = {this.props.categories}
                />
                <Search />
                <About blocks = {this.props.blocks} events = {this.state.events} />
                <FeaturedCourses
                    featuredCourses = {this.state.courses}
                    history = {this.props.history}
                    loggedinUser = {this.props.currentUser}
                    onSetToFavourite = {this.props.onSetToFavourite}
                />
                <BlogList blogs = {this.state.blogs} />
            </div>
        );
    }
}

Home.propTypes = {
    categories: PropTypes.array.isRequired,
    currentUser: PropTypes.object.isRequired,
    onRegister: PropTypes.func.isRequired,
    onSetBlogList: PropTypes.func.isRequired,
    onSetCourseList: PropTypes.func.isRequired,
    onSetEventList: PropTypes.func.isRequired,
    onSetSliders: PropTypes.func.isRequired,
    onSetToFavourite: PropTypes.func.isRequired,
};
