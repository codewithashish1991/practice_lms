import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SignUp from './register';

const config = require('./../../../config.js');

const { imageUrl } = config;

export default class Categories extends React.Component {
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
        return (
            <section id="category-2-part " className="pt-115 pb-120 gray-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="category-2-items pt-10">
                                {(this.state.categories.length > 0) ? (
                                    <div className="row">
                                        {this.state.categories.map((cat, index) => (
                                            <div className="col-md-6" key = {cat.category_id + index}>
                                                <div className="singel-items text-center mt-30">
                                                    <div className="items-image">
                                                        <img
                                                            src={imageUrl + cat.image}
                                                            alt={cat.title}
                                                        />
                                                    </div>
                                                    <div className="items-cont">
                                                        <Link to={`courses/${cat.slug}`}>
                                                            <h5>{cat.title}</h5>
                                                            <span>{cat.course_count} courses</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-danger"> No Course category found.</p>
                                )}
                            </div>
                        </div>
                        <SignUp onRegister = {this.props.onRegister} />
                    </div>
                </div>
            </section>
        );
    }
}

Categories.propTypes = {
    categories: PropTypes.array.isRequired,
    onRegister: PropTypes.func.isRequired,
};
