import React from 'react';
import PropTypes from 'prop-types';

export default class MediaModel extends React.Component {
    render() {
        const { url } = this.props;
        return (
            <div id="contact-form">
                <div className="modal-body">
                    <div className="embed-responsive embed-responsive-16by9">
                        {(url) ? (
                            <video src={url} width="500" type="video/3gp" controls autoPlay = {true} >
                               Your browser does not support the video tag.
                            </video>
                        ) : null}
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        );
    }
}

MediaModel.propTypes = {
    url: PropTypes.string.isRequired,
};
