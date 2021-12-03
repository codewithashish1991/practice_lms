import React from 'react';
import SimpleReactValidator from 'simple-react-validator';
import PropTypes from 'prop-types';
import Breadcrumbs from './../header/breadcrumbs';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        if (props.userInfo && props.userInfo.id) {
            this.props.history.push('/my-account');
        }
        this.state = {
            data: {
                password: '',
                conf_password: '',
            },
            errors: '',
            errorsMsg: '',
            successMsg: '',
            token: '',
            tokenValid: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validator = new SimpleReactValidator();
    }

    componentDidMount() {
        const url = window.location.href;
        const params = url.split('?');
        const token = params[1];

        if (token && token !== '') {
            const this1 = this;
            const result = this.props.verifyToken(token);
            result.then((res) => {
                if (res.data && res.data.status === 'success') {
                    this1.setState({ tokenValid: true, token });
                }
            });
        }
    }

    handleChange(event) {
        const inputValue = (event && event.target.value);
        const inputName = (event && event.target.name);
        const { data } = this.state;
        data[inputName] = inputValue;
        this.setState({ data });
        this.validatePass();
    }

    validatePass() {
        let result = true;
        const newPassword = this.state.data.password;
        const confPassword = this.state.data.conf_password;
        const errors = {};
        const invalidMsg = 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.';
        const lowerCaseLetters = /[a-z]/g;
        const upperLetters = /[A-Z]/g;
        const numbers = /[0-9]/g;

        if (!newPassword.match(lowerCaseLetters)) {
            errors.password = invalidMsg;
            result = false;
        } else if (!newPassword.match(upperLetters)) {
            errors.password = invalidMsg;
            result = false;
        } else if (!newPassword.match(numbers)) {
            errors.password = invalidMsg;
            result = false;
        } else if (newPassword.length < 8) {
            errors.password = invalidMsg;
            result = false;
        }

        if (!confPassword) {
            errors.conf_password = 'Confirm password required.';
            result = false;
        } else if (newPassword !== confPassword) {
            errors.conf_password = 'Password does not match.';
            result = false;
        }

        this.setState({ errors });
        return result;
    }

    handleSubmit(event) {
        event.preventDefault();
        const this1 = this;
        if (this.validator.allValid() && this.validatePass() === true) {
            const data = {
                password: this.state.data.password,
                token: this.state.token,
            };
            const result = this.props.onResetPassword(data);
            result.then((res) => {
                if (res.data && res.data.status === 'success') {
                    const msg = 'Password changed successfully.';
                    const formData = {
                        password: '',
                        conf_password: '',
                    };
                    this1.setState({ successMsg: msg, data: formData });
                } else {
                    const msg = 'Something went wrong';
                    this1.setState({ errorsMsg: msg });
                }
            });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }


    render() {
        return (
            <div className="main">
                <Breadcrumbs pageName = "Reset Password" pageFullName = "Reset Password" />
                {(this.state.tokenValid === false) ? (
                    <h1 className="text-danger text-center" style={{ lineHeight: '300px' }}>Invalid or expired token.</h1>
                ) : (
                    <div className="col-lg-6">
                        <div className="contact-from">
                            <div className="section-title">
                                <h5>Reset Password</h5>
                            </div>
                            <div className="main-form pt-45">
                                <form id="contact-form" method="post">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="singel-form form-group">
                                                <label>New Password:</label>
                                                <input
                                                    name="password"
                                                    onChange={this.handleChange}
                                                    type="password"
                                                    value={this.state.data.password}
                                                />

                                                <span className="form-error">
                                                    {this.validator.message('Password', this.state.data.password, 'required')}
                                                    { this.state.errors.password}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="singel-form form-group">
                                                <label>Re-enter New Password:</label>
                                                <input
                                                    name="conf_password"
                                                    onChange={this.handleChange}
                                                    type="password"
                                                    value={this.state.data.conf_password}
                                                />

                                                <span className="form-error">
                                                    {this.validator.message('Password', this.state.data.conf_password, 'required')}
                                                    { this.state.errors.conf_password}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="form-message"></p>
                                        <div className="col-md-12">
                                            <span className="form-error">
                                                {this.state.errorsMsg}
                                            </span>
                                            <span className="text-success">
                                                {this.state.successMsg}
                                            </span>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="singel-form">
                                                <button
                                                    className="main-btn"
                                                    onClick={this.handleSubmit}
                                                    type="submit"
                                                >
                                                Change Password
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        );
    }
}

Login.propTypes = {
    onResetPassword: PropTypes.func.isRequired,
    verifyToken: PropTypes.func.isRequired,
};
