import React from 'react';
import PropTypes from 'prop-types';
import SimpleReactValidator from 'simple-react-validator';

export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            errorsMsg: '',
            successMsg: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validator = new SimpleReactValidator();
    }

    handleChange(event) {
        const emailAddress = (event && event.target.value);
        this.setState({ email: emailAddress });
    }

    handleSubmit(event) {
        event.preventDefault();
        const this1 = this;
        if (this.validator.allValid()) {
            const result = this.props.onForgotPassword(this.state.email);
            result.then((res) => {
                if (res.data && res.data.status === 'success') {
                    const msg = res.data.message;
                    this1.setState({
                        email: '',
                        successMsg: msg,
                    });
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
    }
    render() {
        return (
            <div id="contact-form">
                <div className="modal-body">
                    <div className="row main-form">
                        <div className="col-md-12">
                            <div className="singel-form form-group">
                                <label>Email Address:</label>
                                <input
                                    name="email"
                                    onChange={this.handleChange}
                                    type="text"
                                    value={this.state.email}
                                />
                                <span className="form-error">
                                    {this.validator.message('Email Address', this.state.email, 'required|email')}
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

ForgotPassword.propTypes = {
    onForgotPassword: PropTypes.func.isRequired,
};
