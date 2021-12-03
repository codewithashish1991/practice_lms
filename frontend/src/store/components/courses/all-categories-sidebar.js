import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class AllCategorySidbar extends React.Component {
    getAllSubCat(categoryId) {
        const this1 = this;
        return this.props.categories.filter(cat => cat.parent === categoryId).map(cat => (
            <ul className ='sub-cat' key = {`cat-list-${cat.category_id}`}>
                <li>
                    <Link to = {`/courses/${cat.slug}`} className={(
                        this1.props.categorySlug &&
                        this1.props.categorySlug === cat.slug
                    ) ? 'color-orange' : ''}>
                        &rarr; {cat.title}
                    </Link>
                    {this1.getAllSubCat(cat.category_id)}
                </li>
            </ul>
        ));
    }
    render() {
        const { categories } = this.props;
        return (
            <div className="col-lg-12 col-md-6">
                <div className="You-makelike mt-30">
                    <h4>All Categories </h4>
                    <div className="singel-makelikee">
                        <div className="cont">
                            <ul>
                                { categories.filter(cat => !cat.parent).map(cat =>
                                    <li key = {`cat-list-${cat.category_id}`} >
                                        <Link to = {`/courses/${cat.slug}`} className={(
                                            this.props.categorySlug &&
                                        this.props.categorySlug === cat.slug
                                        ) ? 'color-orange' : ''}>
                                            {cat.title}
                                        </Link>
                                        {this.getAllSubCat(cat.category_id)}
                                    </li>)}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

AllCategorySidbar.propTypes = {
    categories: PropTypes.array.isRequired,
    categorySlug: PropTypes.string,
};
