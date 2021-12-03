import React from 'react';
import PropTypes from 'prop-types';
import Footer from './footer';
import Copyright from './copyright';

export default class Footer1 extends React.Component {
    render() {
        return (
            <footer id="footer-part">
                <Footer blocks = {this.props.blocks} categories = {this.props.categories} />
                <Copyright />
            </footer>
        );
    }
}

Footer1.propTypes = {
    categories: PropTypes.array.isRequired,
};
