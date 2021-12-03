import React from 'react';
import SimpleReactValidator from 'simple-react-validator';
import PropTypes from 'prop-types';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: '',
                name: '',
                password: '',
                username: '',
            },
            showPassword: false,
            validPassErrorMsg: '',
            successMsg: '',
            errorsMsg: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePassword = this.togglePassword.bind(this);
        this.validator = new SimpleReactValidator();
    }

    handleChange(event) {
        const inputValue = (event && event.target.value);
        const inputName = (event && event.target.name);
        const { data } = this.state;
        data[inputName] = inputValue;
        this.setState({ data });
        if (inputName === 'password') {
            this.validatePass();
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const this1 = this;
        const isPassValid = this.validatePass();
        if (this.validator.allValid() && isPassValid === true) {
            const data = {
                first_name: this.state.data.name,
                last_name: '',
                email: this.state.data.email,
                username: this.state.data.username,
                password: this.state.data.password,
            };
            const result = this.props.onRegister(data);
            result.then((res) => {
                if (res.data && res.data.status === 'success') {
                    const formData = {
                        email: '',
                        name: '',
                        password: '',
                        username: '',
                    };
                    const msg = 'Student registerd successfully.';
                    this1.setState({ data: formData, successMsg: msg });
                } else {
                    const msg = res.message;
                    this1.setState({ errorsMsg: msg });
                }
                this.validator.hideMessages();
            });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    validatePass() {
        const password = (this.state.data.password) ? this.state.data.password : '';
        const invalidMsg = 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.';
        const lowerCaseLetters = /[a-z]/g;
        const upperLetters = /[A-Z]/g;
        const numbers = /[0-9]/g;
        this.setState({ validPassErrorMsg: '' });
        if (password === '' || password === undefined) {
            const message = 'The password field is required.';
            this.setState({ validPassErrorMsg: message });
            return false;
        }

        if (!password.match(lowerCaseLetters)) {
            this.setState({ validPassErrorMsg: invalidMsg });
            return false;
        }

        if (!password.match(upperLetters)) {
            this.setState({ validPassErrorMsg: invalidMsg });
            return false;
        }

        if (!password.match(numbers)) {
            this.setState({ validPassErrorMsg: invalidMsg });
            return false;
        }

        if (password.length < 8) {
            this.setState({ validPassErrorMsg: invalidMsg });
            return false;
        }

        return true;
    }

    togglePassword() {
        const passwordVisibility = this.state.showPassword;
        this.setState({ showPassword: !passwordVisibility });
    }

    render() {
        return (
            <div className="col-lg-5 offset-lg-1">
                <div className="category-form">
                    <div className="form-title text-center">
                        <h3><br />Get 50+ courses!</h3>
                        <span>Sign up now </span>
                    </div>
                    <div className="main-form">
                        <form action="#">
                            <div className='singel-form'>
                                <input
                                    className="form-control"
                                    name= "name"
                                    onChange={this.handleChange}
                                    placeholder = "Name"
                                    type="text"
                                    value={this.state.data.name}
                                />
                                <span className="form-error">
                                    {this.validator.message('Name', this.state.data.name, 'required|alpha')}
                                </span>
                            </div>

                            <div className='singel-form'>
                                <input
                                    className="form-control"
                                    name= "email"
                                    onChange={this.handleChange}
                                    placeholder = "Email"
                                    type="text"
                                    value={this.state.data.email}
                                />
                                <span className="form-error">
                                    {this.validator.message('Email', this.state.data.email, 'required|email')}
                                </span>
                            </div>

                            <div className='singel-form'>
                                <input
                                    className="form-control"
                                    name= "username"
                                    onChange={this.handleChange}
                                    placeholder = "Username"
                                    type="text"
                                    value={this.state.data.username}
                                />
                                <span className="form-error">
                                    {this.validator.message('Username', this.state.data.username, 'required|min:6|max:16')}
                                </span>
                            </div>

                            <div className='singel-form'>
                                <input
                                    className="form-control"
                                    name = "password"
                                    onChange={this.handleChange}
                                    placeholder = "Password"
                                    type = {(this.state.showPassword) ? 'text' : 'password'}
                                    value={this.state.data.password}
                                />
                                <span className="form-error">
                                    {this.state.validPassErrorMsg}
                                </span>
                                <label className="show_pass_label">
                                    <input
                                        className="show_pass"
                                        type="checkbox"
                                        onChange={this.togglePassword}
                                        checked={(this.state.showPassword) ? 'checked' : ''}
                                    />
                                    &nbsp; Show Password
                                </label>
                            </div>
                            <div className="singel-form">
                                <span className="form-error">
                                    {this.state.errorsMsg}
                                </span>
                                <span className="text-success">
                                    {this.state.successMsg}
                                </span>
                                <button
                                    className="main-btn"
                                    onClick={this.handleSubmit}
                                    type="button"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    onRegister: PropTypes.func.isRequired,
};
