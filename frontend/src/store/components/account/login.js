import React from 'react';
import SimpleReactValidator from 'simple-react-validator';
import PropTypes from 'prop-types';
import Breadcrumbs from './../header/breadcrumbs';
import Model from './../model/';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        if (props.userInfo && props.userInfo.id) {
            this.props.history.push('/my-account');
        }
        this.state = {
            data: {
                password: '',
                username: '',
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
            const data = {
                username: this.state.data.username,
                password: this.state.data.password,
            };
            const result = this.props.onLogin(data);
            result.then((res) => {
                if (res.data && res.data.status === 'success') {
                    const userData = {
                        user: res.data.user,
                        token: res.data.token,
                    };
                    localStorage.setItem('session_data', JSON.stringify(userData));
                    this.props.onSetStoreSession(userData);
                    this.props.history.push('/my-account');
                } else {
                    const msg = res.message.non_field_errors[0];
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
                <Breadcrumbs pageName = "Login" pageFullName = "Student Login" />
                <div className="col-lg-6">
                    <div className="contact-from">
                        <div className="section-title">
                            <h5>Student Login</h5>
                        </div>
                        <div className="main-form pt-45">
                            <form id="contact-form" action="/student-login" method="post" data-toggle="validator">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="singel-form form-group">
                                            <input
                                                name="username"
                                                onChange={this.handleChange}
                                                placeholder="Username or email"
                                                type="text"
                                                value={this.state.data.username}
                                            />

                                            <span className="form-error">
                                                {this.validator.message('Username or email', this.state.data.username, 'required')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="singel-form form-group">
                                            <input
                                                name="password"
                                                onChange={this.handleChange}
                                                placeholder="Password"
                                                type="password"
                                                value={this.state.data.password}
                                            />

                                            <span className="form-error">
                                                {this.validator.message('Password', this.state.data.password, 'required')}
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
                                                Login
                                            </button>

                                            <button
                                                className="btn btn-link"
                                                type="button"
                                                data-toggle="modal"
                                                data-target="#myModal"
                                            >
                                            Forgot Password
                                            </button>
                                            <Model
                                                contentType="forgot_password"
                                                onForgotPassword={this.props.onForgotPassword}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    onForgotPassword: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onSetStoreSession: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
};
