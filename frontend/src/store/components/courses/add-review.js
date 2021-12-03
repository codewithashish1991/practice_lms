import React from 'react';
import PropTypes from 'prop-types';

export default class AddCourseReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 1,
            review: '',
            successMsg: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleRating = (rating) => {
        this.setState({ rating });
    }

    handleChange = (event) => {
        const review = event.target.value;
        this.setState({ review });
    }

    handleSubmit = () => {
        const { rating } = this.state;
        const this1 = this;
        if (rating === 0) {
            alert('Please give rating this course.'); // eslint-disable-line no-alert
            return false;
        }
        const data = {};
        data.user = this.props.users_id;
        data.course = this.props.course_id;
        data.review = this.state.review;
        data.rating = rating;
        data.status = false;
        const reviews = this.props.onSetCourseReview(data);
        reviews.then((res) => {
            if (res.data && res.data.status === 'success') {
                this1.setState({
                    rating: 1,
                    review: '',
                    successMsg: res.data.message,
                });
                setTimeout(() => {
                    this1.setState({
                        successMsg: '',
                    });
                }, 8000);
            }
            return res.data;
        });
        return true;
    }

    render() {
        return (
            <form action="#">
                <div className="row">

                    <div className="col-lg-12">
                        <div className="form-singel">
                            <div className="rate-wrapper">
                                <div className="rate-label">Your Rating:</div>
                                <div className="rate selected">
                                    {Array.apply(0, Array(5)).map((x, i) => <div className={(this.state.rating === i + 1) ? 'rate-item active' : 'rate-item' } onClick = {() => this.handleRating(i + 1)} key = {`add-rating${i}`} ><i className="fa fa-star" aria-hidden="true"></i></div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-singel">
                            <textarea placeholder="Comment" onChange = {this.handleChange} value = {this.state.review}></textarea>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-singel">
                            <p className="text-success">{this.state.successMsg}</p>
                            <button type="button" className="main-btn" onClick = {this.handleSubmit}>Post Comment</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

AddCourseReview.propTypes = {
    course_id: PropTypes.number.isRequired,
    onSetCourseReview: PropTypes.func.isRequired,
    users_id: PropTypes.number.isRequired,
};
