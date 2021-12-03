import React from 'react';
import PropTypes from 'prop-types';
import SimpleReactValidator from 'simple-react-validator';

export default class CommentReply extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: '',
            errorsMsg: '',
            successMsg: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validator = new SimpleReactValidator();
    }

    handleChange(event) {
        const comment = (event && event.target.value);
        this.setState({ comment });
    }

    handleSubmit(event) {
        event.preventDefault();
        const this1 = this;
        if (this.props.user_id === 0) {
            alert('Please login to replay this comment.');// eslint-disable-line no-alert
            return false;
        }
        if (this.validator.allValid()) {
            const data = {};
            data.user = this.props.user_id;
            data.blog = this.props.blog_id;
            data.comment = this.state.comment;
            data.parent = this.props.comment_id;
            data.status = true;
            const result = this.props.onSetBlogComment(data);
            result.then((res) => {
                if (res.data && res.data.status === 'success') {
                    const msg = res.data.message;
                    this1.setState({
                        comment: '',
                        successMsg: msg,
                    });
                    const newcomment = res.data.records;
                    this.props.updateCommentList(newcomment);
                    this.validator.hideMessages();
                } else {
                    const msg = res.message;
                    this1.setState({ errorsMsg: msg });
                }
            });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
        return true;
    }
    render() {
        return (
            <div id="contact-form">
                <div className="modal-body">
                    <div className="row main-form">
                        <div className="col-md-12">
                            <div className="singel-form form-group">
                                <textarea
                                    placeholder="Comment"
                                    onChange = {this.handleChange}
                                    value = {this.state.comment}
                                    style = {{
                                        border: '1px solid #b8b8b8',
                                        borderRadius: '5px',
                                        padding: '20px',
                                        width: '100%',
                                    }}
                                ></textarea>
                                <span className="form-error">
                                    {this.validator.message('Reply', this.state.comment, 'required')}
                                    <span className="form-error">
                                        {this.state.errorsMsg}
                                    </span>
                                    <span className="text-success">
                                        {this.state.successMsg}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick = { this.handleSubmit }>Submit</button>
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        );
    }
}

CommentReply.propTypes = {
    blog_id: PropTypes.number.isRequired,
    comment_id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    onSetBlogComment: PropTypes.func.isRequired,
    updateCommentList: PropTypes.func.isRequired,
};
