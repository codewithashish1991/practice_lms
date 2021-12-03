import React from 'react';
import PropTypes from 'prop-types';
import SimpleReactValidator from 'simple-react-validator';

export default class EnrolledUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                first_name: props.loggedinUser.first_name,
                last_name: props.loggedinUser.last_name,
                email: props.loggedinUser.email,
                phone: (props.loggedinUser.phone) ? props.loggedinUser.phone : '',
                address: (props.loggedinUser.address) ? props.loggedinUser.address : '',
                status: false,
            },
            errorsMsg: '',
            successMsg: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validator = new SimpleReactValidator();
    }

    handleChange(event) {
        const inputValue = (event && event.target.value);
        const inputName = (event && event.target.name);
        const { data } = this.state;
        data[inputName] = inputValue;
        this.setState({ data });
    }

    handleSubmit(event) {
        event.preventDefault();
        const this1 = this;
        if (this.validator.allValid()) {
            const { data } = this.state;
            data.course = this.props.course_id;
            data.users = this.props.loggedinUser.id;
            const result = this.props.onSetEnrollRequest(data);
            this.setState({ errorsMsg: '', successMsg: '' });
            result.then((res) => {
                if (res.data && res.data.status === 'success') {
                    const msg = res.data.message;
                    const fdata = {
                        first_name: '',
                        last_name: '',
                        email: '',
                        phone: '',
                        address: '',
                        status: false,
                    };
                    this1.setState({
                        data: fdata,
                        successMsg: msg,
                    });
                    setTimeout(() => {
                        this1.setState({
                            successMsg: '',
                        });
                        this1.props.toggleEnrolledUser();
                    }, 5000);
                } else {
                    const msg = 'Something went wrong. Please try again after sometime.';
                    this1.setState({ errorsMsg: msg });
                }
            });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    componentDidMount() {
        const elmnt = document.getElementById('enroll_user');
        elmnt.scrollIntoView();
    }

    render() {
        return (
            <div className="reviews-form contact-from" id = "enroll_user">
                <div className="section-title">
                    <h5>Enroll Now</h5>
                </div>
                <div className="main-form pt-45">
                    <form id="contact-form" method="post">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="singel-form form-group">
                                    <label>First Name:</label>
                                    <input
                                        name="first_name"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.data.first_name}
                                    />
                                    <span className="form-error">
                                        {this.validator.message('First name', this.state.data.first_name, 'required|alpha|max:120')}
                                    </span>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="singel-form form-group">
                                    <label>Last Name:</label>
                                    <input
                                        name="last_name"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.data.last_name}
                                    />
                                    <span className="form-error">
                                        {this.validator.message('Last name', this.state.data.last_name, 'required|alpha|max:120')}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="singel-form form-group">
                                    <label>Email:</label>
                                    <input
                                        className="form-control"
                                        name= "email"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.data.email}
                                    />
                                    <span className="form-error">
                                        {this.validator.message('Email', this.state.data.email, 'required|email')}
                                    </span>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="singel-form form-group">
                                    <label>Mobile Number:</label>
                                    <input
                                        className="form-control"
                                        name= "phone"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.data.phone}
                                    />
                                    <span className="form-error">
                                        {this.validator.message('Mobile Number', this.state.data.phone, 'required|numeric|min:10|max:12')}
                                    </span>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="singel-form form-group">
                                    <label>Address:</label>
                                    <textarea
                                        name="address"
                                        onChange={this.handleChange}
                                        defaultValue={this.state.data.address}
                                    ></textarea>
                                </div>
                            </div>

                            <p className="form-message"></p>
                            <div className="col-md-12">
                                <div className="singel-form">
                                    <span className="form-error">
                                        {this.state.errorsMsg}
                                    </span>
                                    <span className="text-success">
                                        {this.state.successMsg}
                                    </span><br /><br />
                                    <button type="submit" className="main-btn" onClick={this.props.toggleEnrolledUser}>Cancel</button>&nbsp; &nbsp;
                                    <button type="submit" className="main-btn" onClick={this.handleSubmit}>Enroll Now</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

EnrolledUser.propTypes = {
    course_id: PropTypes.number.isRequired,
    enrolledUser: PropTypes.bool.isRequired,
    loggedinUser: PropTypes.object.isRequired,
    onSetEnrollRequest: PropTypes.func.isRequired,
    toggleEnrolledUser: PropTypes.func.isRequired,
};

