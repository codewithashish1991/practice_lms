import React from 'react';
import PropTypes from 'prop-types';
import SimpleReactValidator from 'simple-react-validator';

export default class KeepInTouch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: '',
                email: '',
                subject: '',
                phone: '',
                message: '',
            },
            successMsg: '',
            errorsMsg: '',
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
            const result = this.props.onSetContact(this.state.data);
            this.setState({ errorsMsg: '', successMsg: '' });
            result.then((res) => {
                if (res.data && res.data.status === 'success') {
                    const msg = 'Contact submitted successfully.';
                    const formData = {
                        name: '',
                        email: '',
                        subject: '',
                        phone: '',
                        message: '',
                    };
                    this1.setState({
                        successMsg: msg,
                        data: formData,
                    });
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

    render() {
        return (
            <div className="col-lg-8">
                <div className="contact-from">
                    <div className="section-title">
                        <h5>Contact Us</h5>
                        <h2>Keep in touch</h2>
                    </div>
                    <div className="main-form pt-45">
                        <form id="contact-form" method="post" data-toggle="validator">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="singel-form form-group">
                                        <input
                                            name="name"
                                            onChange={this.handleChange}
                                            placeholder="Your name"
                                            type="text"
                                            value={this.state.data.name}
                                        />
                                        <span className="form-error">
                                            {this.validator.message('Your name', this.state.data.name, 'required|max:120')}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="singel-form form-group">
                                        <input
                                            name="email"
                                            onChange={this.handleChange}
                                            placeholder="Your email"
                                            type="text"
                                            value={this.state.data.email}
                                        />
                                        <span className="form-error">
                                            {this.validator.message('Your email', this.state.data.email, 'required|email')}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="singel-form form-group">
                                        <input
                                            name="subject"
                                            onChange={this.handleChange}
                                            placeholder="Subject"
                                            type="text"
                                            value={this.state.data.subject}
                                        />
                                        <span className="form-error">
                                            {this.validator.message('Subject', this.state.data.subject, 'required')}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="singel-form form-group">
                                        <input
                                            name="phone"
                                            onChange={this.handleChange}
                                            placeholder="Phone"
                                            type="text"
                                            value={this.state.data.phone}
                                        />
                                        <span className="form-error">
                                            {this.validator.message('Phone', this.state.data.phone, 'required|numeric|min:10|max:12')}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="singel-form form-group">
                                        <textarea
                                            name="message"
                                            onChange={this.handleChange}
                                            placeholder="Messege"
                                            value={this.state.data.message}
                                        ></textarea>
                                        <span className="form-error">
                                            {this.validator.message('Messege', this.state.data.message, 'required|min:10|max:250')}
                                        </span>
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
                                        <button
                                            className="main-btn"
                                            onClick={this.handleSubmit}
                                            type="submit"
                                        >Send</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

KeepInTouch.propTypes = {
    onSetContact: PropTypes.func.isRequired,
};
