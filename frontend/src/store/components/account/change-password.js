import React from 'react';
import PropTypes from 'prop-types';

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                old_password: '',
                new_password: '',
                conf_password: '',
            },
            errors: {},
            errorsMsg: '',
            successMsg: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const inputValue = (event && event.target.value);
        const inputName = (event && event.target.name);
        const { data } = this.state;
        if (event.target.files) {
            const file = (event && event.target.files[0]);
            data[inputName] = file;
        } else {
            data[inputName] = inputValue;
        }
        this.setState({ data });
        this.validatePassword();
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.validatePassword() === true) {
            const this1 = this;
            this.setState({ errorsMsg: '', successMsg: '' });
            const result = this.props.onUpdatePassword(this.state.data);
            result.then((res) => {
                if (res.data && res.data.status === 'success') {
                    const formData = {
                        old_password: '',
                        new_password: '',
                        conf_password: '',
                    };
                    const msg = res.data.message;
                    this1.setState({ data: formData, successMsg: msg });
                } else {
                    const msg = res.message;
                    this1.setState({ errorsMsg: msg });
                }
            });
        }
    }

    validatePassword() {
        let result = true;
        const errors = {};
        const oldPassword = this.state.data.old_password;
        const newPassword = this.state.data.new_password;
        const confPassword = this.state.data.conf_password;
        const invalidMsg = 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.';
        const lowerCaseLetters = /[a-z]/g;
        const upperLetters = /[A-Z]/g;
        const numbers = /[0-9]/g;

        if (!oldPassword) {
            errors.old_password = 'Old password required.';
            result = false;
        } else if (oldPassword.length < 8) {
            errors.old_password = 'Old password shoud be greater then or equal to 8.';
            result = false;
        }

        if (!newPassword) {
            errors.new_password = 'New password required.';
            result = false;
        } else if (!newPassword.match(lowerCaseLetters)) {
            errors.new_password = invalidMsg;
            result = false;
        } else if (!newPassword.match(upperLetters)) {
            errors.new_password = invalidMsg;
            result = false;
        } else if (!newPassword.match(numbers)) {
            errors.new_password = invalidMsg;
            result = false;
        } else if (newPassword.length < 8) {
            errors.new_password = invalidMsg;
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

    render() {
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title" id="exampleModalLabel">Change Password</h3>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body contact-form">
                    <div className="row main-form">
                        <form>
                            <div className="col-md-12">
                                <div className="singel-form form-group">
                                    <label>Old Password:</label>
                                    <input
                                        name="old_password"
                                        onChange={this.handleChange}
                                        type="password"
                                        value={this.state.data.old_password}
                                    />
                                    <span className="form-error">
                                        { this.state.errors.old_password }
                                    </span>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="singel-form form-group">
                                    <label>New Password:</label>
                                    <input
                                        name="new_password"
                                        onChange={this.handleChange}
                                        type="password"
                                        value={this.state.data.new_password}
                                    />
                                    <span className="form-error">
                                        { this.state.errors.new_password }
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="singel-form form-group">
                                    <label>Confirm Password:</label>
                                    <input
                                        name="conf_password"
                                        onChange={this.handleChange}
                                        type="password"
                                        value={this.state.data.conf_password}
                                    />
                                    <span className="form-error">
                                        { this.state.errors.conf_password }
                                    </span>
                                    <span className="form-error">
                                        {this.state.errorsMsg}
                                    </span>
                                    <span className="text-success">
                                        {this.state.successMsg}
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Update Password</button>
                </div>
            </div>
        );
    }
}

ChangePassword.propTypes = {
    onUpdatePassword: PropTypes.func.isRequired,
};
