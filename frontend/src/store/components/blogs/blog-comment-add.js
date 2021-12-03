import React from 'react';
import PropTypes from 'prop-types';

export default class BlogCommentsAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            errorsMsg: '',
            successMsg: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        const comment = event.target.value;
        this.setState({ comment });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { comment } = this.state;
        const this1 = this;
        if (comment === '') {
            alert('Please give comment to this blog.'); // eslint-disable-line no-alert
            return false;
        }
        const data = {};
        data.user = this.props.user_id;
        data.blog = this.props.blog_id;
        data.comment = comment;
        data.parent = '';
        data.status = true;
        const addComment = this.props.onSetBlogComment(data);
        addComment.then((res) => {
            if (res.data && res.data.status === 'success') {
                this1.setState({
                    comment: '',
                    successMsg: res.data.message,
                });
                const newcomment = res.data.records;
                setTimeout(() => {
                    this1.setState({
                        successMsg: '',
                    });
                }, 8000);
                this1.props.updateCommentList(newcomment);
            } else {
                const msg = 'Something went wrong.';
                this1.setState({ errorsMsg: msg });
            }
            return res.data;
        });
        return true;
    }

    render() {
        return (
            <div className="comment-form">
                <form>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-singel">
                                <textarea placeholder="Comment" onChange = {this.handleChange} value = {this.state.comment}></textarea>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-singel">
                                <span className="form-error">
                                    {this.state.errorsMsg}
                                </span>
                                <span className="text-success">
                                    {this.state.successMsg}
                                </span>
                                <button className="main-btn" onClick = {this.handleSubmit} type = "submit">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

BlogCommentsAdd.propTypes = {
    blog_id: PropTypes.number.isRequired,
    onSetBlogComment: PropTypes.func.isRequired,
    updateCommentList: PropTypes.func.isRequired,
    user_id: PropTypes.number.isRequired,
};
