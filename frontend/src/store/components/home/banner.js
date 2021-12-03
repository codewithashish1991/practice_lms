import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Zoom } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';

import { imageExists } from './../../helpers/';


import defaultSlideImg from './../../../assets/images/slider/s-1.jpg';

const config = require('./../../../config.js');

const { imageUrl } = config;


export default class Banner extends React.Component {
    render() {
        const { sliders } = this.props;
        return (
            <section id="slider-part" className="slider-active">
                <Zoom autoplay={true} duration="5000">
                    { sliders.map((slider, index) => (
                        <div className="single-slider bg_cover pt-150" style={{
                            backgroundImage: `url(${(
                                slider.image
                                            &&
                                            imageExists(imageUrl + slider.image)
                            ) ?
                                imageUrl + slider.image :
                                defaultSlideImg})`,
                        }} data-overlay="4" key = {slider.slider_id + index} >
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-7 col-lg-9">
                                        <div className="slider-cont">
                                            <h1 data-animation="bounceInLeft" data-delay="1s">{slider.title}</h1>
                                            <p data-animation="fadeInUp" data-delay="1.3s">{slider.small_description}</p>
                                            <ul>
                                                {(slider.read_more_url) ? (
                                                    <li><Link data-animation="fadeInUp" data-delay="1.6s" className="main-btn" to={slider.read_more_url}>Read More</Link></li>
                                                ) : null}
                                                {(slider.get_started_url) ? (
                                                    <li><Link data-animation="fadeInUp" data-delay="1.9s" className="main-btn main-btn-2" to={slider.get_started_url}>Get Started</Link></li>
                                                ) : null}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </Zoom>
            </section>
        );
    }
}

Banner.propTypes = {
    sliders: PropTypes.array.isRequired,
};
