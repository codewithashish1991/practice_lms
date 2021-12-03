import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Model from './../model/';
import { imageExists } from './../../helpers/';

const config = require('./../../../config.js');

const { mediaUrl } = config;

export default class Lactures extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            title: 'What is javascirpt',
        };
        this.openModel = this.openModel.bind(this);
    }
    openModel(lecture) {
        if (lecture.lacture_type === 'SAMPLE' || this.props.is_enrolled) {
            if (lecture && lecture.content_file) {
                const extension = lecture.content_file.substring(lecture.content_file.lastIndexOf('.') + 1);
                const vedioArray = ['mp4'];
                const fileUrl = mediaUrl + lecture.content_file;
                if (vedioArray.includes(extension)) {
                    if (imageExists(fileUrl)) {
                        this.setState({
                            title: lecture.title,
                            url: fileUrl,
                        });
                        $('#btnOpen').trigger('click');
                    }
                } else {
                    window.open(fileUrl, '_blank');
                }
            }
        } else {
            alert('You are not enrolled with this course.'); // eslint-disable-line no-alert
        }
    }
    render() {
        const { lactures } = this.props;
        return (
            <div className="accordion" id="accordionExample">
                <Model
                    contentType="course_media"
                    url={this.state.url}
                    title={this.state.title}
                />
                <button style={{ display: 'none' }} type="button" id="btnOpen" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                  Launch demo modal
                </button>
                {(lactures) ? (
                    <>{lactures.map((latcure, index) => (
                        <div className="card" key={`lacture-list-${latcure.leacture_id}`}>
                            <div className="card-header" id="headingOne">
                                <a href="/#" data-toggle="collapse" data-target={`#collapseOne-${latcure.leacture_id}`} aria-expanded="true" aria-controls={`collapseOne-${latcure.leacture_id}`}>
                                    <ul>
                                        <li><i className="fa fa-file-o"></i></li>
                                        <li><span className="lecture">Lecture {latcure.leacture_no}</span></li>
                                        <li>
                                            <span
                                                className="head"
                                                onClick = { () => this.openModel(latcure)}
                                            >
                                                {latcure.title}
                                            </span>
                                        </li>
                                        <li><span className="time d-none d-md-block"><i className="fa fa-clock-o"></i> <span> {latcure.durations_in_hours}.{latcure.durations_in_minutes}.00</span></span></li>
                                    </ul>
                                </a>
                            </div>

                            <div id={`collapseOne-${latcure.leacture_id}`} className={(index === 0) ? 'collapse show' : 'collapse' } aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div className="card-body">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: latcure.description,
                                        }}></div>
                                </div>
                            </div>
                        </div>
                    ))}</>
                ) : 'No lecture assign.' }


            </div>
        );
    }
}

Lactures.propTypes = {
    lactures: PropTypes.array,
    is_enrolled: PropTypes.bool,
};
